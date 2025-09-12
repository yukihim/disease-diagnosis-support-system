def register_device(name, type_device, token):
    from ...database.models import Monitoring_Devices
    from ...database import db

    device = Monitoring_Devices(
        name=name, 
        type_device=type_device, 
        token=token
    )

    
    db.session.add(device)
    db.session.commit()
    return True