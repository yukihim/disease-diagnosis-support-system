def update_values(device_id, value):
    from ...database import db
    from ...database.models import Monitoring_Devices, Device_values
    device = db.session.query(Monitoring_Devices).filter(Monitoring_Devices.id == device_id).first()
    if device and device.active:
        device_value = Device_values(device_id=device_id, value=value)
        db.session.add(device_value)
        db.session.commit()
        return True
    else:
        return False