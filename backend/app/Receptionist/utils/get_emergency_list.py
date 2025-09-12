from flask import request, jsonify
import datetime
from sqlalchemy import func
def get_emergency_list():
	from ...database.models import Emergencies

	today = datetime.datetime.now().date()

	emergency_list = Emergencies.query.filter(
		func.date(Emergencies.time) == today,
		Emergencies.status == "waiting"
	).all()
	import logging
	logging.getLogger(__name__).info(today)
	emergency_list = [{"case": emergency.description, "dept": emergency.department, "time": emergency.time.strftime("%H:%M")} for emergency in emergency_list]

	
	
	return emergency_list
	