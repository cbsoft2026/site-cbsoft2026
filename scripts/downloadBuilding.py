import argparse
import json
import subprocess
from pathlib import Path

parser = argparse.ArgumentParser(description="Baixa um prédio do OpenStreetMap pelo OSM ID.")

parser.add_argument("osm_id", type=int, help="ID do prédio no OpenStreetMap")
args = parser.parse_args()

osm_id = args.osm_id

query = f"""
[out:json][timeout:25];

way(id:{osm_id});

out geom;
"""

result = subprocess.run(
    [
        "curl",
        "-s",
        "--get",
        "--data-urlencode",
        f"data={query}",
        "https://overpass-api.de/api/interpreter",
    ],
    capture_output=True,
    text=True,
    check=True,
)

if result.stderr:
    print(result.stderr)
    exit(result.returncode)

data = json.loads(result.stdout)

features = []

for element in data["elements"]:
    if element.get("type") != "way" or not element.get("geometry") or len(element["geometry"]) < 3:
        continue

    coordinates = [
        [
            point["lon"],
            point["lat"],
        ]
        for point in element["geometry"]
    ]

    features.append({
        "type": "Feature",
        "properties": {
            "osm_id": element["id"],
            "name": element.get("tags", {}).get("name"),
            "building": element.get("tags", {}).get("building"),
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                coordinates
            ],
        },
    })

geojson = {
    "type": "FeatureCollection",
    "features": features,
}

print(geojson)
