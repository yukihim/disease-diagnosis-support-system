def get_procedures_name():
    from ....database.models import Procedures
    rows = Procedures.query.all()
    return [{
        'name':row.name,
        'id':row.id
    } for row in rows]