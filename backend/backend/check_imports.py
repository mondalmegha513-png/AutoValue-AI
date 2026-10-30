"""Check installed dependencies without deprecated package attributes."""
from importlib import import_module, metadata
import sys
print(sys.version)
for module, distribution in [('flask', 'flask'), ('flask_cors', 'flask-cors'), ('numpy', 'numpy'), ('pandas', 'pandas'), ('sklearn', 'scikit-learn'), ('joblib', 'joblib'), ('scipy', 'scipy')]:
    import_module(module)
    print(f'{distribution}={metadata.version(distribution)}')
