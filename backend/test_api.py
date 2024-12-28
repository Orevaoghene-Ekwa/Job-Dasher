import unittest
from main import create_app
from config import TestConfig
from exts import db


class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)

        self.client = self.app.test_client(self)

        with self.app.app_context():
            db.create_all()

    
    def test_hello_world(self):
        hello_response = self.client.get('/job/hello')

        json = hello_response.json

        self.assertEqual(json, {"message":"Hello World"})


    def test_signup(self):
        signup_response = self.client.post(
            '/auth/signup',
            json={
                "username":"testuser",
                "email":"testuser@test.com",
                "password":"password"
                }
        )

        status_code = signup_response.status_code

        self.assertEqual(status_code, 201)


    def test_login(self):
        signup_response = self.client.post(
            '/auth/signup',
            json={
                "username":"testuser",
                "email":"testuser@test.com",
                "password":"password"
                }
        )

        login_response = self.client.post(
            '/auth/login',
            json={
                "username":"testuser",
                "password":"password"
            }
        )

        status_code = login_response.status_code

        json = login_response.status_code
        # print(json)

        self.assertEqual(status_code, 200)


    def test_get_all_jobs(self):
        """Test getting all jobs"""
        response = self.client.get('/job/jobs')
        # print(response)
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_get_one_job(self):
        id=1
        response = self.client.get('/job/job/{id}')
        status_code = response.status_code
        self.assertEqual(status_code, 404)
        # print(status_code)

    def test_create_job(self):
        signup_response = self.client.post(
            '/auth/signup',
            json={
                "username":"testuser",
                "email":"testuser@test.com",
                "password":"password"
                }
        )

        login_response = self.client.post(
            '/auth/login',
            json={
                "username":"testuser",
                "password":"password"
            }
        )
        access_token = login_response.json["access_token"]

        create_job_response = self.client.post(
            '/job/jobs',
            json={
                "title":"Test cookie",
                "description":"Test description"
            },
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )

        status_code = create_job_response.status_code
        # print(create_job_response.json)
        self.assertEqual(status_code, 201)

    def test_update_job(self):
        signup_response = self.client.post(
            '/auth/signup',
            json={
                "username":"testuser",
                "email":"testuser@test.com",
                "password":"password"
                }
        )

        login_response = self.client.post(
            '/auth/login',
            json={
                "username":"testuser",
                "password":"password"
            }
        )
        access_token = login_response.json["access_token"]

        create_job_response = self.client.post(
            '/job/jobs',
            json={
                "title":"Test cookie",
                "description":"Test description"
            },
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )

        status_code = create_job_response.status_code

        id=1
        update_response = self.client.put(
            f'/job/job/{id}',
            json={
                "title":"Test cookie",
                "description":"Test description"
            },
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )

        status_code = update_response.status_code
        self.assertEqual(status_code, 200)

    def test_delete_job(self):
        signup_response = self.client.post(
            '/auth/signup',
            json={
                "username":"testuser",
                "email":"testuser@test.com",
                "password":"password"
                }
        )

        login_response = self.client.post(
            '/auth/login',
            json={
                "username":"testuser",
                "password":"password"
            }
        )
        access_token = login_response.json["access_token"]

        create_job_response = self.client.post(
            '/job/jobs',
            json={
                "title":"Test cookie",
                "description":"Test description"
            },
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )

        id=1
        delete_response=self.client.delete(
            f'job/job/{id}',
            headers={
                "Authorization":f"Bearer {access_token}"
            }
        )

        status_code=delete_response.status_code
        self.assertEqual(status_code, 200)

    
    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    unittest.main()