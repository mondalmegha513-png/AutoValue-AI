# Frontend prediction integration

The existing prediction wizard calls the Flask API and passes the returned prediction through React Router state to /results. A direct visit to /results without a prediction shows a link back to the form. Refreshing an existing result preserves its browser history state; results are not saved to an account.

## Start locally (PowerShell, from project root; two terminals)

Backend, using the already trained model:

```powershell
cd backend
.\run_dev.bat
```

Frontend:

```powershell
cd frontend
npm.cmd run dev
```

Open http://localhost:3000/predict. No installation or retraining is needed on this machine.

## API configuration

By default the frontend uses relative /api URLs. Vite forwards them to http://127.0.0.1:5000 in development and preview. Optional settings are documented in .env.example:

- API_PROXY_TARGET changes the local Vite proxy target.
- VITE_API_BASE_URL sets an API base URL at build time for deployments using a separate backend. Such a deployment must configure backend CORS for its frontend origin.

A deployed static frontend needs a reverse proxy for /api or a configured VITE_API_BASE_URL; the Vite proxy applies to dev/preview only.

The request sends exactly brand, model, year (number), mileage (km driven, number), fuelType, transmission and owner. Maruti Suzuki maps to the dataset brand Maruti. Brand/model and fuel choices come from /api/model-info. Variant, city and condition remain visible but are not sent as model inputs.

The result displays predicted_price_inr with en-IN currency formatting, returned vehicle details, and warnings. The previous mock confidence percentage, range and attribution amounts have been replaced with actual input details and a model badge; the backend does not supply confidence or price attribution values. Training data ends in 2020, and newer vehicles show a limitation notice in the form and results.

## Checks (from frontend/)

```powershell
npm.cmd test
npm.cmd run test:integration
npm.cmd run build
```

The integration command requires both servers above to be running. It uses the real frontend client through Vite's proxy and existing Flask model, then renders the React result component to verify the actual INR value, inputs, newer-car warning and empty-result state. It also checks a real Vite proxy pointed at a stopped backend. This is a programmatic integration check; it does not simulate clicking the wizard in a browser.

No browser automation surface was available during implementation, so interactive browser and visual checks remain manual. The build reports a bundle-size warning; unrelated routing and bundling were left unchanged. Share and Save Car remain their existing placeholder controls; their behaviour was not part of prediction integration.
