from flask import request
from . import app
from . import overview, recommend, send_for_test, finalizing, prescription_treatment
from ..authentication import check_role
from flask_jwt_extended import jwt_required


@app.route('/overview', methods=['POST'])
@jwt_required()
@check_role(['doctor', 'nurse'])
def overview_controller():
    try:
        ans = overview.get_overview()
        return ans
    except Exception as e:
        return {'error': "Error while retrieving the overview: "+str(e)}, 400

@app.route('/recommend', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def recommend_controller():
    try:
        symptoms = request.json.get('symptoms')
        ans = recommend.recommend(symptoms)
        return ans
    except Exception as e:
        return {'error': "Error while retrieving the recommendation: "+str(e)}, 400

@app.route('/send_for_test', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def send_for_test_controller():
    try:
        test_type_id = request.json.get('test_type_id')
        room_id = request.json.get('room_id')
        note = request.json.get('note')
        ans = send_for_test.send_for_test(test_type_id, room_id, note)
        return ans
    except Exception as e:
        return {'error': "Error while sending for test: "+str(e)}, 400

@app.route('/finalizeing', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def finalizeing_controller():
    try:
        symptoms = request.json.get('symptoms')
        finalizing_diagnosis = request.json.get('finalizing_diagnosis')
        ans = finalizing.finalizing(symptoms, finalizing_diagnosis)
        return ans
    except Exception as e:
        return {'error': "Error while finalizing: "+str(e)}, 400

@app.route('/prescription_treatment', methods=['POST'])
@jwt_required()
@check_role(['doctor'])
def prescription_treatment_controller():
    try:
        prescriptions = request.json.get('prescriptions')
        treatments = request.json.get('treatments')
        ans = prescription_treatment.prescription_treatment(prescriptions, treatments)
        return ans
    except Exception as e:
        return {'error': "Error while prescribing: "+str(e)}, 400