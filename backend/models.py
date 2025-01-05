from datetime import datetime, date, time
from exts import db

"""
class Job:
    id:int primary key
    title:str
    salary: int
    description:str (text)
    date:date
    time:time
    job_type:str
    link:str
"""

class Job(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    salary = db.Column(db.Integer(), nullable=False)
    date = db.Column(db.Date(), default=date.today, nullable=False)
    time = db.Column(db.Time(), default=datetime.utcnow().time, nullable=False)
    job_type = db.Column(db.Text(), nullable=False)
    link = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<Job {self.title}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title, description):
        self.title = title
        self.description = description

        db.session.commit()


# User Model
"""
class User:
    id:Integer
    username:String
    email:String
    password:String
"""

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.commit()