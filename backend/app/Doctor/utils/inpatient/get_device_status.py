def get_device_status(device_ids):
    

	ans = {
		'blood_pressure': False,
		'heart_rate': False,
		'respiratory_rate': False,
		'temperature': False,
		'oxygen_saturation': False,
		'blood_sugar': False,
	}

	for key,value in device_ids.items():
		from ....database import db
		from ....database.models import Monitoring_Devices

		device = db.session.query(Monitoring_Devices).filter(Monitoring_Devices.id == value).first()
		if device:
			ans[key] = device.active
		else:
			ans[key] = False

	return ans
    

