
URL = "http://localhost:5001/"
# blood_sugar, heart_rate, blood_pressure, temperature, espiratory Rate
# 2 set of 6 device.
device_list = [
        {
                "name": "Device 1",
                "type_device": "blood_sugar",
                "token": "100001",
                "low_end": 70,
                "high_end": 110		
        },
        {
                "name": "Device 2",
                "type_device": "heart_rate",
                "token": "100002",
                "low_end": 60,
                "high_end": 100
        },
        {
                "name": "Device 3",
                "type_device": "blood_pressure",
                "token": "100003",
                "low_end": 60,
                "high_end": 120
        },
        {
                "name": "Device 4",
                "type_device": "temperature",
                "token": "100004",
                "low_end": 36,
                "high_end": 37
        },
        {
                "name": "Device 5",
                "type_device": "respiratory_rate",
                "token": "100005",
                "low_end": 12,
                "high_end": 20
        },
        {
                "name": "Device 6",
                "type_device": "blood_sugar",
                "token": "100006",
                "low_end": 70,
                "high_end": 110
        },
        {
                "name": "Device 7",
                "type_device": "heart_rate",
                "token": "100007",
                "low_end": 60,
                "high_end": 100
        },
        {
                "name": "Device 8",
                "type_device": "blood_pressure",
                "token": "100008",
                "low_end": 60,
                "high_end": 120
        },
        {
                "name": "Device 9",
                "type_device": "temperature",
                "token": "100009",
                "low_end": 36,
                "high_end": 37
        },
        {
                "name": "Device 10",
                "type_device": "respiratory_rate",
                "token": "100010",
                "low_end": 12,
                "high_end": 20
        }
]


current_device = []

from signal import signal, SIGINT
import sys

def signal_handler(sig, frame):
    print('You pressed Ctrl+C!')
    for device in current_device:
        from requests import post
        import json
        response = post(URL + "/device/logout", json=json.dumps(device), headers={"Authorization": f"Bearer {device['access_token']}"})
        
        print(response.json())
    sys.exit(0)

signal(SIGINT, signal_handler)

register = False

def register_device():
    for device in device_list:
        from requests import post
        response = post(URL + "/device/register", json=device)
        print(response)


def login_device():
    for device in device_list:
        from requests import post
        response = post(URL + "/device/login", json=device)
        print(response.json())
        current_device.append({
            "name": device["name"],
            "type_device": device["type_device"],
            "token": device["token"],
            "low_end": device["low_end"],
            "high_end": device["high_end"],
            "access_token": response.json()["access_token"],
            "refresh_token": response.json()["refresh_token"]
		})


def update_values():
    for device in current_device:
        from requests import post
        import json
        import random
        
        if device["type_device"] == "blood_pressure":
            value1 = random.randint(device["low_end"], device["high_end"])
            value2 = random.randint(value1+1, value1+10)
            value = f"{value1}/{value2}"
        else:
            value = random.randint(device["low_end"], device["high_end"])
        print(device["access_token"])
        response = post(URL + "/device/update_values", json={"value": value}, headers={"Authorization": f"Bearer {device['access_token']}", "Content-Type": "application/json"})
        print(response)
        print(response.json())




if __name__ == "__main__":
    #get args
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--register", action="store_true")
    args = parser.parse_args()
    register = args.register
    if register:
        register_device()
    else:
        login_device()
        while True:
            #  wait 5s
            from time import sleep
            sleep(5)
            update_values()
            print("update values")
            
        
		