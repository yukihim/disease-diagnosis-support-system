def get_medicine_name():
    from ....database.models import Medicines
    rows = Medicines.query.all()
    

    return [{
        'name':row.medicine_name,
        'id':row.id
	} for row in rows]
	
    

    