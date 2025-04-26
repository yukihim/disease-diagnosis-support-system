from flask import jsonify

def finalizing(symptoms, finalizing_diagnosis):
    """
    This function will finalize the diagnosis
    :param symptoms:
    :param finalizing_diagnosis:
    :return:
    """

    return jsonify({}, status=200, mimetypes='application/json')