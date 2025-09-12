def get_mearsurements(devices: dict):
	from app.database.models.devices import Device_values
	from app.database import db
	from sqlalchemy import select
	

	ans ={
		'blood_pressure': [],
		'heart_rate': [],
		'temperature': [],
		'respiratory_rate': [],
		'blood_sugar': []
	}

	for key, value in devices.items():
		if(value == 0): continue
		stmt = select(Device_values.value, Device_values.time_stamp).where(Device_values.device_id == value).order_by(Device_values.time_stamp.desc())
		measurements = db.session.execute(stmt).all()
		
		measurements = measurements[:5]
		# ans[key] = [ { 'value': x[0], 'time': x[1].strftime('%Y-%m-%d %H:%M:%S') } for x in measurements]

		if key == 'blood_pressure':
			ans['blood_pressure'] = [{"systolic": x[0].split('/')[0], "diastolic": x[0].split('/')[1], 'time': x[1].strftime('%Y-%m-%d %H:%M:%S')} for x in measurements if x[0] != None]
		else:
			ans[key] = [{"value": x[0], 'time': x[1].strftime('%Y-%m-%d %H:%M:%S')} for x in measurements if x[0] != None]

	return ans

	


	
	