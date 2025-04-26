
from flask import jsonify

def send_for_test(test_type_id, room_id, note):
    """
    This function will send the patient for test
    :param test_type_id:
    :param room_id:
    :param note:
    :return:
    """

    return jsonify({}, status=200, mimetypes='application/json')


