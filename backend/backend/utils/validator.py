"""Validate the frontend's existing prediction field names."""
from datetime import date
import math
REQUIRED_FIELDS = ['brand', 'model', 'year', 'mileage', 'fuelType', 'transmission', 'owner']
OWNER_MAP = {'1st Owner': 'First Owner', '2nd Owner': 'Second Owner', '3rd Owner': 'Third Owner', '4th+ Owner': 'Fourth & Above Owner',
             'First Owner': 'First Owner', 'Second Owner': 'Second Owner', 'Third Owner': 'Third Owner', 'Fourth & Above Owner': 'Fourth & Above Owner', 'Test Drive Car': 'Test Drive Car'}


def validate_predict_input(data):
    if not isinstance(data, dict):
        return None, ['Request body must be a JSON object.']
    errors = [f'Missing required field: {key}.' for key in REQUIRED_FIELDS if key not in data or data[key] is None or data[key] == '']
    if errors:
        return None, errors
    cleaned = {}
    for key in ['brand', 'model', 'fuelType', 'transmission', 'owner']:
        value = data[key]
        if not isinstance(value, str) or not value.strip() or len(value) > 100:
            errors.append(f'{key} must be a nonempty string of at most 100 characters.')
        else:
            cleaned[key] = value.strip()
    for key, low, high in [('year', 1995, date.today().year), ('mileage', 0, 499999)]:
        try:
            if isinstance(data[key], bool):
                raise ValueError()
            value = float(data[key])
            if not math.isfinite(value) or not low <= value <= high or (key == 'year' and not value.is_integer()):
                raise ValueError()
            cleaned[key] = int(value) if key == 'year' else value
        except (ValueError, TypeError, OverflowError):
            errors.append(f'{key} must be a finite {"integer" if key == "year" else "number"} between {low} and {high}.')
    for key, allowed in [('fuelType', {'Petrol', 'Diesel', 'CNG', 'LPG', 'Electric', 'Hybrid'}), ('transmission', {'Manual', 'Automatic'}), ('owner', OWNER_MAP)]:
        if key in cleaned and cleaned[key] not in allowed:
            errors.append(f'Unsupported {key}. Allowed: {sorted(allowed)}')
    if 'owner' in cleaned:
        cleaned['owner'] = OWNER_MAP.get(cleaned['owner'], cleaned['owner'])
    return (None, errors) if errors else (cleaned, [])
