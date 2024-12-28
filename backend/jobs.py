from flask_restx import Namespace, Resource, fields
from models import Job
from flask_jwt_extended import jwt_required
from flask import request

job_ns = Namespace('job', description="A namespace for Jobs")

job_model = job_ns.model(
    "Job",
    {
        "id":fields.Integer(),
        "title":fields.String(),
        "description":fields.String()
    }
)


@job_ns.route("/hello")
class HelloResource(Resource):
    def get(self):
        return {"message":"Hello World"}
    

@job_ns.route("/jobs")
class JobResource(Resource):
    @job_ns.marshal_list_with(job_model)
    def get(self):
        """Get all jobs"""
        jobs = Job.query.all()

        return jobs
    

    @job_ns.marshal_with(job_model)
    @job_ns.expect(job_model)
    @jwt_required()
    def post(self):
        """Create a new job"""
        data = request.get_json()
        new_job = Job(
            title = data.get('title'),
            description = data.get('description')
        )
        new_job.save()

        return new_job, 201


@job_ns.route("/job/<int:id>")
class JobResource(Resource):

    @job_ns.marshal_with(job_model)
    def get(self, id):
        """Get a job by id"""
        job = Job.query.get_or_404(id)

        return job


    @job_ns.marshal_with(job_model)
    @jwt_required()
    def put(self, id):
        """Update a job by id"""
        job_to_update = Job.query.get_or_404(id)
        data = request.get_json()
        job_to_update.update(data.get('title'), data.get('description'))

        return job_to_update


    @job_ns.marshal_with(job_model)
    @jwt_required()
    def delete(self, id):
        """Delete a job by id"""
        job_to_delete = Job.query.get_or_404(id)
        job_to_delete.delete()

        return job_to_delete