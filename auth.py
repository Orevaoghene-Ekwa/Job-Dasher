from flask_restx import Resource, Namespace, fields
from models import User, OTPStore
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (create_access_token, 
                                create_refresh_token, jwt_required,
                                get_jwt_identity)
from flask import request, jsonify, make_response
from decouple import config
import random
from datetime import datetime, timedelta
import smtplib

auth_ns = Namespace('auth', description="A namespace for authentication")

admin_email = config('ADMIN_EMAIL')
admin_password = config('ADMIN_PASSWORD')

PORT = config('MAIL_PORT')
MAIL_SERVER = config('MAIL_SERVER')
MAIL_PASSWORD = config('MAIL_PASSWORD')
MAIL_SENDER = config('MAIL_SENDER')

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

verify_otp_model = auth_ns.model(
    "VerifyOTP",
    {
        "email": fields.String(),
        "otp": fields.Integer(),
    }
)


@auth_ns.route("/signup")
class SignUp(Resource):

    @auth_ns.expect(sign_up_model)
    def post(self):
        try:
            data = request.get_json()
            email = data.get('email')

            # Validate email
            if not email:
                return {"message": "Email is required"}, 400

            # Check if email already exists
            if User.query.filter_by(email=email).first():
                return {"message": f"An account already exists with the email {email}"}, 400

            # Generate and store OTP
            otp = random.randint(100000, 999999)
            expiration_time = datetime.utcnow() + timedelta(minutes=10)

            otp_entry = OTPStore(email=email, otp=otp, expires_at=expiration_time)
            otp_entry.save()

            try:
                # Send OTP to email
                with smtplib.SMTP(MAIL_SERVER, PORT) as connection:
                    connection.starttls()
                    connection.login(user=MAIL_SENDER, password=MAIL_PASSWORD)
                    connection.sendmail(
                        from_addr=MAIL_SENDER,
                        to_addrs=email,
                        msg=f"Subject:Your One Time Password\n\nYour OTP is {otp}. \nIt is valid for 10 minutes"
                    )

            except smtplib.SMTPAuthenticationError:
                otp_entry.delete()
                return {"status": "error", "message": "Authentication error. Please check your email credentials."}, 500
            except smtplib.SMTPException as e:
                otp_entry.delete()
                return {"status": "error", "message": f"Failed to send OTP email: {e}"}, 500

            return {"status": "success", "message": "Please check your email for an OTP to complete your signup."}, 200

        except Exception as e:
            print(f"Unexpected error: {e}")
            otp_entry.delete()
            return {"status": "error", "message": "An unexpected error occurred. Please try again later."}, 500



@auth_ns.route("/verify-otp")
class VerifyOTP(Resource):
    @auth_ns.expect(verify_otp_model)
    def post(self):
        data = request.get_json()
        email = data.get('email')
        otp = data.get('otp')
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return {"message": "Username and password are required for account creation."}, 400

        otp_entry = OTPStore.query.filter_by(email=email, otp=otp).first()

        if not otp_entry or otp_entry.expires_at < datetime.utcnow():
            return {"message": "Invalid or expired OTP."}, 400

        # Create user if OTP is valid
        new_user = User(
            username=username,
            email=email,
            password=generate_password_hash(password)
        )
        new_user.save()

        # Delete OTP
        otp_entry.delete()

        return {"message": "Account created successfully!", "success": True}, 201

    

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
        else:
            return jsonify({"message": "Invalid credentials."}), 401
        

@auth_ns.route("/refresh")
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token":new_access_token}, 200))