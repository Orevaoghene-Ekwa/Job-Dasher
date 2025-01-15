from flask_restx import Resource, Namespace, fields
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (create_access_token, 
                                create_refresh_token, jwt_required,
                                get_jwt_identity)
from flask import request, jsonify, make_response
from decouple import config

auth_ns = Namespace('auth', description="A namespace for authentication")
admin_email = config('ADMIN_EMAIL')
admin_password = config('ADMIN_PASSWORD')

sign_up_model = auth_ns.model(
    "SignUp",
    {
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()
    }
)

login_model = auth_ns.model(
    "Login",
    {
        "username":fields.String(),
        "password":fields.String()
    }
)


@auth_ns.route("/signup")
class SignUp(Resource):

    @auth_ns.expect(sign_up_model)
    def post(self):
        data = request.get_json()

        email = data.get('email')

        db_email = User.query.filter_by(email=email).first()

        if db_email is not None:
            return jsonify({"message":f"An account already exists with the email {email}"})

        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )
        new_user.save()

        return make_response(jsonify({"message":f"Account created successfully!"}), 201)
    

@auth_ns.route("/login")
class Login(Resource):

    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        db_user = User.query.filter_by(email=email).first()

        if (admin_email == email and admin_password == password):
            access_token = create_access_token(identity=admin_email)
            refresh_token = create_refresh_token(identity=admin_email)
            role = "admin"

            return jsonify(
                {
                    "access_token":access_token,
                    "refresh_token":refresh_token,
                    "role":role
                }
            )
        elif db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.email)
            refresh_token = create_refresh_token(identity=db_user.email)
            role = "user"

            return jsonify(
                {
                    "access_token":access_token,
                    "refresh_token":refresh_token,
                    "role":role
                }
            )
        

@auth_ns.route("/refresh")
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()

        new_access_token = create_access_token(identity=current_user)

        return make_response(jsonify({"access_token":new_access_token}, 200))