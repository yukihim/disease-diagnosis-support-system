from flask_jwt_extended import create_access_token, create_refresh_token
def login(device_token):
	from ...database import db
	from ...database.models import Monitoring_Devices
	device = db.session.query(Monitoring_Devices).filter(Monitoring_Devices.token == device_token).first()
	
	if device:
		access_token = create_access_token(identity=str(device.id))
		refresh_token = create_refresh_token(identity=str(device.id))
		device.active = True
		db.session.commit()
		return access_token, refresh_token
	else:
		return None