def get_device_list():
	device_type = ['heart_rate', 'blood_pressure', 'temperature', 'respiratory_rate', 'blood_sugar']

	from ....database.models import Monitoring_Devices
	from ....database import db
	from sqlalchemy import select

	stmt = select(
		Monitoring_Devices.id,
		Monitoring_Devices.name,
		Monitoring_Devices.type_device,
	).where(
		Monitoring_Devices.type_device.in_(device_type),
	)

	devices = db.session.execute(stmt).all()
	

	device_list = {
		'blood_pressure': [{"id": 0, "name": "No device"}],
		'heart_rate': [{"id": 0, "name": "No device"}],
		'temperature': [{"id": 0, "name": "No device"}],
		'respiratory_rate': [{"id": 0, "name": "No device"}],
		'blood_sugar': [{"id": 0, "name": "No device"}]
	}

	for row in devices:
		device_list[row[2]].append({
			'id': row[0],
			'name': row[1]
		})
	
	import logging
	_logger = logging.getLogger(__name__)
	_logger.info(f"\n\n\nDevice list: {device_list}")
	
	for key, value in device_list.items():
		if len(value) == 0:
			value.append({
				'id': 0,
				'name': 'No device'
			})
		

	return device_list
		
	

	
	
	
	