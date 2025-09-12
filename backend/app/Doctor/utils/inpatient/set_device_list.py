def set_device_list(inpatient_session_id: int, device_list: dict):
	from ....database import db
	from ....database.models.devices import Monitoring_Devices

	for key, value in device_list.items():
		import logging
		_logger = logging.getLogger(__name__)
		_logger.error(f"\n\n\nSetting device list: {value}")
		if value['id'] != 0:
			#find and remove the device if found
			device = db.session.query(Monitoring_Devices).filter(Monitoring_Devices.session_id == inpatient_session_id, Monitoring_Devices.type_device == key).first()
			
			if device:
				device.session_id = None
				db.session.commit()

			device = db.session.query(Monitoring_Devices).filter(Monitoring_Devices.id == value['id']).first()
			device.session_id = inpatient_session_id
			db.session.commit()
		
		
	# db.session.commit()