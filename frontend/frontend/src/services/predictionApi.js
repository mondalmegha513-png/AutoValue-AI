// The Vite proxy serves /api locally; deployments may set VITE_API_BASE_URL.
export function createApiClient({ baseUrl = '', fetchImpl = globalThis.fetch, timeoutMs = 15000 } = {}) {
  async function request(path, options = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(`${baseUrl.replace(/\/$/, '')}${path}`, {
        ...options, signal: controller.signal,
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        if (response.status === 503 || response.status === 502 || response.status === 504 || (response.status === 500 && !body)) {
          throw new Error('Prediction backend is unavailable. Please start the backend and try again.');
        }
        const details = Array.isArray(body?.details) ? body.details.filter(value => typeof value === 'string').join(' ') : '';
        throw new Error([body?.error || `Request failed (${response.status}).`, details].filter(Boolean).join(' '));
      }
      if (!body) throw new Error('The backend returned an invalid response. Please try again.');
      return body;
    } catch (error) {
      if (error.name === 'AbortError') throw new Error('The backend took too long to respond. Please try again.');
      if (error instanceof TypeError) throw new Error('Cannot reach the prediction backend. Please start the backend and try again.');
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
  return {
    async getModelInfo() {
      const info = await request('/api/model-info');
      if (!info.model_ready || !info.brand_models || !info.supported_categories) {
        throw new Error('The prediction model is unavailable. Please check the backend and try again.');
      }
      return info;
    },
    async predict(payload) {
      const result = await request('/api/predict', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      if (!isPredictionResult(result)) throw new Error('The backend returned an invalid prediction. Please try again.');
      return result;
    },
  };
}

export const predictionApi = createApiClient({ baseUrl: import.meta.env?.VITE_API_BASE_URL || '' });

export function buildPredictionPayload(form) {
  return {
    brand: form.brand === 'Maruti Suzuki' ? 'Maruti' : form.brand.trim(),
    model: form.model.trim(), year: Number(form.year), mileage: Number(form.mileage),
    fuelType: form.fuelType, transmission: form.transmission, owner: form.owner,
  };
}

export function validatePredictionForm(form, info) {
  const errors = {};
  for (const key of ['brand', 'model', 'fuelType', 'transmission', 'owner']) {
    if (typeof form[key] !== 'string' || !form[key].trim()) errors[key] = 'Please select a value.';
  }
  const year = Number(form.year);
  if (!String(form.year).trim() || !Number.isInteger(year) || year < 1995 || year > new Date().getFullYear()) {
    errors.year = 'Select a valid manufacturing year.';
  }
  const distance = Number(form.mileage);
  if (!String(form.mileage).trim() || !Number.isFinite(distance) || distance < 0 || distance > 499999) {
    errors.mileage = 'Enter kilometres driven between 0 and 499,999.';
  }
  if (info) {
    const brand = form.brand === 'Maruti Suzuki' ? 'Maruti' : form.brand;
    if (!info.brand_models[brand]) errors.brand = 'Select a brand represented in the dataset.';
    else if (!info.brand_models[brand].includes(form.model)) errors.model = 'Select a model for this brand.';
    for (const key of ['fuelType', 'transmission']) {
      if (!info.supported_categories[key]?.includes(form[key])) errors[key] = 'This option is not represented in the dataset.';
    }
  }
  return errors;
}

export function isPredictionResult(result) {
  return !!result && Number.isFinite(result.predicted_price_inr) && result.predicted_price_inr > 0 &&
    result.currency === 'INR' && !!result.input_received &&
    ['brand', 'model', 'fuelType', 'transmission', 'owner'].every(key => typeof result.input_received[key] === 'string') &&
    Number.isFinite(result.input_received.year) && Number.isFinite(result.input_received.mileage) &&
    Array.isArray(result.warnings) && result.warnings.every(warning => typeof warning === 'string');
}

export const formatInr = value => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(value);
