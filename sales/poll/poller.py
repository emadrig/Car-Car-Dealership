import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO

def get_inventory():
    response = requests.get("http://inventory-api:8000/api/automobiles")
    content = json.loads(response.content)
    print(content["autos"])
    for auto in content["autos"]:
        AutomobileVO.objects.update_or_create(
            import_href=auto["href"],
            defaults={"vin": auto["vin"]}
        )
# Import models from sales_rest, here.
# from sales_rest.models import Something

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            get_inventory()
        except Exception as e:
            print("ERROR")
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
