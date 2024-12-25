from flask import request

from flask_jwt_extended import jwt_required


from . import app


@app.route('/overview', methods=['GET'])
@jwt_required()
def overview_controller():
    try:
        ans = overview.get_overview()
        return ans
    except Exception as e:
        return {'error': "Error while retrieving the receptionist's overview: "+str(e)}, 400


@app.route('/edit', methods=['POST'])
@jwt_required()
def edit():
    try:
        username = request.json.get('username')
        password = request.json.get('password')
        email = request.json.get('email')
        phone = request.json.get('phone')
        role = request.json.get('role')

        ans = edit.edit(username, password, email, phone, role)
        return ans
    except Exception as e:
        return {'error': "Error while editing patient's EHR: "+str(e)}, 400

@app.route('/add', methods=['POST'])
@jwt_required()
def add():
    try:
        username = request.json.get('username')
        password = request.json.get('password')
        email = request.json.get('email')
        phone = request.json.get('phone')
        role = request.json.get('role')

        ans = add.add(username, password, email, phone, role)
        return ans

    except Exception as e:
        return {'error': "Error while adding patient's EHR: "+str(e)}, 400

@app.route('/delete', methods=['POST'])
@jwt_required()
def delete():
    try:
        username = request.json.get('username')

        ans = delete.delete(username)
        return ans
    except Exception as e:
        return {'error': "Error while deleting patient's EHR: "+str(e)}, 400


@app.route('/user_logs', methods=['POST'])
@jwt_required()
def user_logs():
    try:
        username = request.json.get('username')
        ans = user_logs.user_logs(username)
        return ans
    except Exception as e:
        return {'error': "Error while retrieving user logs: "+str(e)}, 400



