# See the API documentation at https://github.com/navikt/pam-public-feed/

import requests
import json

api_key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMudG9rZW4udjFAbmF2Lm5vIiwiYXVkIjoiZmVlZC1hcGktdjEiLCJpc3MiOiJuYXYubm8iLCJpYXQiOjE1NTc0NzM0MjJ9.jNGlLUF9HxoHo5JrQNMkweLj_91bgk97ZebLdfx3_UQ"
endpoint = "https://arbeidsplassen.nav.no/public-feed/api/v1/ads"

# Set request headers

headers = {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMudG9rZW4udjFAbmF2Lm5vIiwiYXVkIjoiZmVlZC1hcGktdjEiLCJpc3MiOiJuYXYubm8iLCJpYXQiOjE1NTc0NzM0MjJ9.jNGlLUF9HxoHo5JrQNMkweLj_91bgk97ZebLdfx3_UQ"
    }

# Set request parameters
params = {
    "countryCode": "NO",
    "language": "nb"
    # Add more parameters as needed
}

# Make the API call
response = requests.get(endpoint, headers=headers, params=params)

# Process the response
if response.status_code == 200:
    job_ads = response.json()
    with open("job_ads.json", "w", encoding="utf-8") as f:
        json.dump(job_ads, f, indent=4, ensure_ascii=False)
else:
    print("Error:", response.status_code)
