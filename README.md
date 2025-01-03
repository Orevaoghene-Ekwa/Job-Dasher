# Job Dasher

Job-Dasher is a web application designed to streamline job tracking and management for users. It offers features such as job creation, user authentication, and an intuitive interface to monitor job statuses.

## Features
- Frontend: React.js, Bootstrap
- Backend: Python-Flask
- Database: sqlite
- Routing: React Router

## Getting Started
### Prerequisites

Ensure you have the following installed
- Python
- Node.js
- npm

### Installation
1. Clone the repository

```
git clone https://github.com/Orevaoghene-Ekwa/Job-Dasher.git
cd Job-Dasher
```

2. Install dependencies
- Naavigate to the client directory and run the code below

```
npm install
```

3. Setup environment variables
  Create a .env file in the backend directory and add the following:

```
SECRET_KEY="YourSecretKey"
SQLALCHEMY_TRACK_MODIFICATIONS=False
ADMIN_EMAIL="AdminEmail"
ADMIN_PASSWORD="AdminPassword"
```

4. Start the development server:
- In the backend folder, activate the virtual environment
- Ensure all requirements are installed or run:

```
pip install -r requirements.txt
```

- In the client folder, run:

```
npm start
```

## Usage

- Sign Up: Register a new account.
- Log In: Access your account.
- Create Job: Add new job postings.
- View Jobs: Browse and manage existing jobs.

## Contributing

Contributions are welcome! Please follow these steps:

  1. Fork the repository.
  2. Create a new branch: git checkout -b feature-name.
  3. Make your changes and commit them: git commit -m 'Add feature'.
  4. Push to the branch: git push origin feature-name.
  5. Submit a pull request.


## Contact
For any inquiries or issues, please open an issue on the [GitHub repository](https://github.com/Orevaoghene-Ekwa/Job-Dasher/issues).