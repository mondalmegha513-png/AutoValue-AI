import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPredictionPayload, validatePredictionForm, createApiClient, formatInr } from '../src/services/predictionApi.js';

const form = { brand: 'Maruti Suzuki', model: 'Swift', year: '2017', mileage: '45000', fuelType: 'Petrol', transmission: 'Manual', owner: '1st Owner', variant: 'Luxury', condition: 'Good', city: 'Mumbai' };
const payload = buildPredictionPayload(form);
const prediction = { predicted_price_inr: 497352, currency: 'INR', input_received: payload, model: 'Gradient Boosting Regressor', warnings: [] };
const info = { model_ready: true, brand_models: { Maruti: ['Swift'] }, supported_categories: { fuelType: ['Petrol'], transmission: ['Manual'] } };

test('send only the seven schema fields, with numeric inputs and Maruti mapping', () => {
  assert.deepEqual(payload, { brand: 'Maruti', model: 'Swift', year: 2017, mileage: 45000, fuelType: 'Petrol', transmission: 'Manual', owner: '1st Owner' });
});
test('validate distance boundaries and reject empty/nonfinite/negative values', () => {
  for (const mileage of ['', ' ', '-1', 'NaN', 'Infinity', '500000']) assert.ok(validatePredictionForm({ ...form, mileage }).mileage);
  for (const mileage of ['0', '499999']) assert.equal(validatePredictionForm({ ...form, mileage }).mileage, undefined);
});
test('validate year and supported brand/model combinations', () => {
  for (const year of ['', '1990', '2020.5', '9999']) assert.ok(validatePredictionForm({ ...form, year }).year);
  assert.deepEqual(validatePredictionForm(form, info), {});
  assert.ok(validatePredictionForm({ ...form, model: '3 Series' }, info).model);
  assert.ok(validatePredictionForm({ ...form, fuelType: 'Electric' }, info).fuelType);
});
test('format actual prediction using Indian currency grouping', () => {
  assert.equal(formatInr(497352), '\u20b94,97,352');
});
test('POST prediction and GET metadata use configured base URL', async () => {
  const calls = [];
  const api = createApiClient({ baseUrl: 'http://example.test/', fetchImpl: async (url, options) => {
    calls.push({ url, options });
    return Response.json(url.endsWith('model-info') ? info : prediction);
  } });
  assert.equal((await api.getModelInfo()).model_ready, true);
  assert.deepEqual(await api.predict(payload), prediction);
  assert.equal(calls[1].url, 'http://example.test/api/predict');
  assert.equal(calls[1].options.method, 'POST');
  assert.deepEqual(JSON.parse(calls[1].options.body), payload);
});
test('preserve API validation details for correction', async () => {
  const api = createApiClient({ fetchImpl: async () => Response.json({ error: 'Unsupported vehicle.', details: ['Select a supported model.'] }, { status: 422 }) });
  await assert.rejects(api.predict(payload), /Unsupported vehicle.*Select a supported model/);
});
test('show backend unavailable state for network and proxy failures', async () => {
  for (const status of [500, 502, 503, 504]) {
    const api = createApiClient({ fetchImpl: async () => new Response('', { status }) });
    await assert.rejects(api.predict(payload), /backend is unavailable/);
  }
  const api = createApiClient({ fetchImpl: async () => { throw new TypeError('fetch failed'); } });
  await assert.rejects(api.predict(payload), /Cannot reach/);
});
test('handle inference errors, invalid responses and absent model', async () => {
  const api = createApiClient({ fetchImpl: async () => Response.json({ error: 'Prediction failed internally.' }, { status: 500 }) });
  await assert.rejects(api.predict(payload), /Prediction failed internally/);
  const invalid = createApiClient({ fetchImpl: async () => Response.json({ predicted_price_inr: '497352' }) });
  await assert.rejects(invalid.predict(payload), /invalid prediction/);
  const missing = createApiClient({ fetchImpl: async () => Response.json({ model_ready: false }) });
  await assert.rejects(missing.getModelInfo(), /model is unavailable/);
});
test('timeout requests so the form can retry', async () => {
  const api = createApiClient({ timeoutMs: 5, fetchImpl: (url, options) => new Promise((resolve, reject) => {
    options.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
  }) });
  await assert.rejects(api.predict(payload), /too long to respond/);
});
