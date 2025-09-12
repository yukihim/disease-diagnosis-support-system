def get_session_current_devices(inpatient_session_id: int):
	from app.database.models.devices import Monitoring_Devices
	from ....database import db

	
	monitoring_devices = db.session.query(Monitoring_Devices).filter(Monitoring_Devices.session_id == inpatient_session_id).all()

	ans = {
		'heart_rate': {"id": 0, "name": "No device"},
		'blood_pressure': {"id": 0, "name": "No device"},
		'temperature': {"id": 0, "name": "No device"},
		'respiratory_rate': {"id": 0, "name": "No device"},
		'blood_sugar': {"id": 0, "name": "No device"}
	}
	for device in monitoring_devices:
		ans[device.type_device] = {
			'id': device.id,
			'name': device.name
		}

	return ans
	
	
	
	
	
	
