import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { PredictionResultPage } from '../src/pages/PredictionResultPage';

export function renderResult(prediction) {
  return renderToString(
    <StaticRouter location={{ pathname: '/results', state: { prediction } }}>
      <PredictionResultPage />
    </StaticRouter>
  );
}
