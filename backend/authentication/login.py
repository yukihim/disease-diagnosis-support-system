from flask import Flask, render_template, request, redirect, url_for
from flask_login import LoginManager, login_user, logout_user, login_required
from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, id, username, email):
        self.id = id
        self.username = username
        self.email = email

app = Flask(__name__)
app.secret_key = 'your_secret_key'
login_manager = LoginManager(app)

# Mock database
users = {"user1": {"password": "password123", "email": "user1@example.com"}}

@login_manager.user_loader
def load_user(user_id):
    # Load user from your database
    if user_id in users:
        user_data = users[user_id]
        return User(user_id, user_id, user_data['email'])
    return None

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users and users[username]['password'] == password:
            user = User(username, username, users[username]['email'])
            login_user(user)
            return redirect(url_for('dashboard'))
        return 'Invalid credentials'
    return render_template('login.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return 'Welcome to your dashboard'

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))