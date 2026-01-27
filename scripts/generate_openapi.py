import sys
import os
import yaml
from fastapi.openapi.utils import get_openapi

# Setup path to include project root
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

# Import app after path setup
from main import app

def generate_openapi():
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        openapi_version=app.openapi_version,
        description=app.description,
        routes=app.routes,
    )
    
    output_path = "openapi.yaml"
    # os.makedirs("docs", exist_ok=True) # Not needed for root
    
    with open(output_path, "w") as f:
        yaml.dump(openapi_schema, f, sort_keys=False)
    
    print(f"OpenAPI schema generated at {output_path}")

if __name__ == "__main__":
    generate_openapi()
