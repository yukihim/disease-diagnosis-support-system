from . import app
from . import overview, test
from flask_jwt_extended import jwt_required
from flask import request


@app.route('/overview', methods=['GET'])
@jwt_required()
def overview_controller():
    try:
        ans = overview.get_overview()
        return ans
    except Exception as e:
        return {'error': "Error while retrieving the receptionist's overview: "+str(e)}, 400


@app.route('/test', methods=['POST'])
@jwt_required()
def test():
    try:
        test_id = request.json.get('test_id')
        ans = test.get_test(test_id)
        return ans
    except Exception as e:
        return {'error': "Error while testing: "+str(e)}, 400

@app.route('/test/detailed', methods=['POST'])
@jwt_required()
def detailed_test():
    try:
        test_id = request.json.get('test_id')
        ans = test.get_detailed_test(test_id)
        return ans
    except Exception as e:
        return {'error': "Error while testing: "+str(e)}, 400

