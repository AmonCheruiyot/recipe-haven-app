from flask import Blueprint, request, jsonify, current_app, url_for
from flask_jwt_extended import create_access_token
from app import db
from app.models import User
import os

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')

    if not username or not email or not password:
        return jsonify({"message": "Missing form data"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists"}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password)

    photo = request.files.get('photo')
    if photo and photo.filename != '':
        # Ensure the upload directory exists
        if not os.path.exists(current_app.config['UPLOAD_FOLDER']):
            os.makedirs(current_app.config['UPLOAD_FOLDER'])
        
        photo_filename = f"{username}_{photo.filename}"
        photo_path = os.path.join(current_app.config['UPLOAD_FOLDER'], photo_filename)
        photo.save(photo_path)

        # Store the relative URL path to the uploaded photo
        new_user.profile_photo = url_for('static', filename=f'uploads/{photo_filename}', _external=False)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
