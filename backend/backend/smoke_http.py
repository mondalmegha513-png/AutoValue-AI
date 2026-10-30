"""Exercise real HTTP requests on an ephemeral localhost port; shut down cleanly."""
import json
import threading
from urllib.request import Request, urlopen
from werkzeug.serving import make_server
from app import create_app

server = make_server('127.0.0.1', 0, create_app())
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()
base = f'http://127.0.0.1:{server.server_port}'
try:
    for path in ['/api/health', '/api/model-info']:
        with urlopen(base + path, timeout=15) as response:
            body = json.load(response)
            assert response.status == 200 and body['model_ready']
            print(path, response.status, 'model_ready=', body['model_ready'])
    payload = dict(brand='Maruti', model='Swift', year=2017, mileage=45000, fuelType='Petrol', transmission='Manual', owner='1st Owner')
    request = Request(base + '/api/predict', data=json.dumps(payload).encode(), headers={'Content-Type': 'application/json'}, method='POST')
    with urlopen(request, timeout=15) as response:
        body = json.load(response)
        assert response.status == 200 and body['predicted_price_inr'] > 0
        print('/api/predict', response.status, json.dumps(body))
finally:
    server.shutdown()
    thread.join(timeout=5)
    server.server_close()
