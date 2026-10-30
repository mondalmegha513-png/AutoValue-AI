// Integration test: real frontend client -> Vite proxy -> existing Flask model -> rendered result page.
// Start Flask and Vite before running: node --test tests/predictionFlow.integration.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { createApiClient, buildPredictionPayload, formatInr } from '../src/services/predictionApi.js';

const origin = process.env.AUTOVALUE_TEST_ORIGIN || 'http://localhost:3000';
test('real prediction is rendered in INR with correct details and newer-car warning', async () => {
  const api = createApiClient({ baseUrl: origin });
  const info = await api.getModelInfo();
  assert.equal(info.selected_model, 'Gradient Boosting Regressor');
  const form = { brand: 'Maruti Suzuki', model: 'Swift', year: '2017', mileage: '45000', fuelType: 'Petrol', transmission: 'Manual', owner: '1st Owner' };
  const prediction = await api.predict(buildPredictionPayload(form));
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    // Vite resolves JSX and the same React instances as the actual application.
    const { renderResult } = await server.ssrLoadModule('/tests/renderResult.jsx');
    const html = renderResult(prediction);
    assert.ok(html.includes(formatInr(prediction.predicted_price_inr)));
    assert.ok(html.includes('Maruti Suzuki Swift'));
    assert.ok(html.includes('45,000 km'));
    assert.ok(html.includes('Gradient Boosting Regressor'));
    assert.ok(!html.includes('87% Confidence'));
    assert.ok(!html.includes('8,42,000'));
    assert.ok(!html.includes('Estimates for newer cars may be unreliable.'));
    const newer = await api.predict(buildPredictionPayload({ ...form, year: '2022' }));
    assert.ok(newer.warnings.length > 0);
    const newerHtml = renderResult(newer);
    assert.ok(newerHtml.includes('Training data ends in 2020.'));
    assert.ok(newerHtml.includes(newer.warnings[0]));
    assert.ok(renderResult(null).includes('No prediction yet'));
    console.log(JSON.stringify({ origin, price_inr: prediction.predicted_price_inr, formatted: formatInr(prediction.predicted_price_inr), newer_car_warnings: newer.warnings }));
  } finally {
    await server.close();
  }
});

test('a stopped backend through the real Vite proxy gives a retryable unavailable error', async () => {
  const proxy = await createServer({ configFile: false, server: { host: '127.0.0.1', port: 0, proxy: { '/api': { target: 'http://127.0.0.1:1' } } } });
  try {
    await proxy.listen();
    const address = proxy.httpServer.address();
    const api = createApiClient({ baseUrl: `http://127.0.0.1:${address.port}` });
    await assert.rejects(api.getModelInfo(), /backend is unavailable/);
  } finally {
    await proxy.close();
  }
});
