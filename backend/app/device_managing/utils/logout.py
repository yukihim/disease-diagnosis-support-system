def logout(device_id):
    from ...database import db
    from ...database.models import Monitoring_Devices
    device = db.session.query(Monitoring_Devices).filter(Monitoring_Devices.id == device_id).first()
    if device:
        device.active = False
        db.session.commit()
        return True
    else:
        return False