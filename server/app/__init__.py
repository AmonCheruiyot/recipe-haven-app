from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os

db = SQLAlchemy()
jwt = JWTManager()

app = Flask(__name__)
CORS(app) 
def create_app():
    app = Flask(__name__)
    
    # Configure the application
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.urandom(24)
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)

    # Enable CORS for specific frontend domain
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()
    
    # Register Blueprints
    from app.routes.auth import auth
    from app.routes.recipe import recipe
    from app.routes.user import user
    from app.routes.support import support

    app.register_blueprint(auth)
    app.register_blueprint(recipe)
    app.register_blueprint(user)
    app.register_blueprint(support)

    return app
