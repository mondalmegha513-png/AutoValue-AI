"""Backend integration tests; run: python -m unittest discover -s backend/tests -v"""
import sys
from pathlib import Path
import unittest
from unittest.mock import patch
import math
import pandas as pd
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from app import create_app
from train import clean_and_prepare_data
from utils.validator import validate_predict_input
from utils import model_loader

VALID = dict(brand='Maruti', model='Swift', year=2017, mileage=45000, fuelType='Petrol', transmission='Manual', owner='1st Owner')


class BackendTests(unittest.TestCase):
    def setUp(self):
        self.client = create_app().test_client()

    def test_health_and_metadata(self):
        self.assertTrue(self.client.get('/api/health').json['model_ready'])
        info = self.client.get('/api/model-info').json
        self.assertTrue(info['model_ready'])
        self.assertIsInstance(info['metrics']['MAE_inr'], float)

    def test_actual_prediction(self):
        response = self.client.post('/api/predict', json=VALID)
        self.assertEqual(response.status_code, 200, response.json)
        self.assertGreater(response.json['predicted_price_inr'], 0)
        self.assertEqual(response.json['currency'], 'INR')
        self.assertEqual(response.json['input_received']['owner'], 'First Owner')

    def test_predictions_respond_to_vehicle_age(self):
        old = self.client.post('/api/predict', json={**VALID, 'year': 2008}).json
        new = self.client.post('/api/predict', json={**VALID, 'year': 2019}).json
        self.assertGreater(new['predicted_price_inr'], old['predicted_price_inr'])

    def test_bad_json(self):
        self.assertEqual(self.client.post('/api/predict', data='{bad', content_type='application/json').status_code, 400)

    def test_invalid_payloads(self):
        for body in [[], {}, {'brand': 'BMW'}, {**VALID, 'brand': []}, {**VALID, 'model': {}}, {**VALID, 'year': 2020.5}, {**VALID, 'year': True}, {**VALID, 'mileage': 'NaN'}, {**VALID, 'mileage': 'Infinity'}, {**VALID, 'mileage': -1}]:
            with self.subTest(body=body):
                self.assertEqual(self.client.post('/api/predict', json=body).status_code, 422)

    def test_unknown_vehicle(self):
        for change in [{'brand': 'Unknown'}, {'model': 'Imaginary'}, {'fuelType': 'Electric'}, {'brand': 'BMW', 'model': 'Swift'}]:
            self.assertEqual(self.client.post('/api/predict', json={**VALID, **change}).status_code, 422)

    def test_out_of_training_year_warning(self):
        response = self.client.post('/api/predict', json={**VALID, 'year': 2026})
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json['warnings'])

    def test_model_missing(self):
        with patch('routes.predict.model_is_ready', return_value=False):
            self.assertEqual(self.client.post('/api/predict', json=VALID).status_code, 503)

    def test_prediction_failure(self):
        with patch('routes.predict.get_pipeline') as loader:
            loader.return_value.predict.side_effect = RuntimeError('private details')
            response = self.client.post('/api/predict', json=VALID)
            self.assertEqual(response.status_code, 500)
            self.assertNotIn('private details', str(response.json))

    def test_cors(self):
        response = self.client.options('/api/predict', headers={'Origin': 'http://localhost:3000', 'Access-Control-Request-Method': 'POST'})
        self.assertEqual(response.headers['Access-Control-Allow-Origin'], 'http://localhost:3000')

    def test_cleaning_kilometres_and_duplicates(self):
        row = dict(name='BMW 3 Series 320d', year=2017, km_driven=45000, mileage='22 kmpl', fuel='Diesel', transmission='Automatic', owner='First Owner', selling_price=1500000)
        df = clean_and_prepare_data(pd.DataFrame([row, row, {**row, 'selling_price': 1700000}]))
        self.assertEqual(len(df), 1)
        self.assertEqual(df.iloc[0]['mileage'], 45000)
        self.assertEqual(df.iloc[0]['price'], 1600000)
        self.assertEqual(df.iloc[0]['model'], '3 Series')

    def test_cleaning_missing_schema(self):
        with self.assertRaisesRegex(ValueError, 'Missing dataset columns'):
            clean_and_prepare_data(pd.DataFrame({'year': [2020]}))


if __name__ == '__main__':
    unittest.main()
