

from flask import jsonify

def recommend(symptoms):
    """
            Return a list of possible disease a long with it probability
    :param symptoms:
    :return:
        json{
            disease: array[
                json{
                    name: str,
                    probability: float
                },
                ...
            ]
        }
    """

    return jsonify(
        {
            'disease': [
                {
                    'name': 'Covid-19',
                    'probability': 0.8
                },
                {
                    'name': 'Flu',
                    'probability': 0.6
                },
                {
                    'name': 'Cold',
                    'probability': 0.4
                },
                {
                    'name': 'Pneumonia',
                    'probability': 0.2
                },
            ]
        }, status=200, mimetype='application/json'
    )
