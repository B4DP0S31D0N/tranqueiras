from flask import Flask, request, jsonify

app = Flask(__name__)

participants = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    if username in participants:
        return jsonify({'error': 'User already registered'}), 400
    participants[username] = {'hints': 0}
    return jsonify({'message': 'User registered successfully'})

@app.route('/request_hint', methods=['POST'])
def request_hint():
    data = request.json
    username = data.get('username')
    if username not in participants:
        return jsonify({'error': 'User not registered'}), 400
    if participants[username]['hints'] >= 3:
        return jsonify({'error': 'Hint limit reached'}), 400
    participants[username]['hints'] += 1
    return jsonify({'message': 'Hint provided', 'hints': participants[username]['hints']})

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    sorted_participants = sorted(participants.items(), key=lambda x: x[1]['hints'], reverse=True)
    return jsonify(sorted_participants)

if __name__ == '__main__':
    app.run(debug=True)
