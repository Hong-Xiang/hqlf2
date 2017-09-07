from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api

from dxpy.task.api import add_web_api

from hqlf.restfulapi.filesystem import Directory, File
from hqlf.restfulapi.task import Task
from hqlf.restfulapi.image3d import Image3D


app = Flask(__name__)
CORS(app)

api = Api(app)


class Hello(Resource):
    def get(self):
        return {
            'status': 'OK',
            'port': 5000,
            'ip': "192.168.1.118"}


api_root = '/api/'
api.add_resource(Hello, api_root + 'server')
api.add_resource(Directory, api_root + 'dir/<path>')
api.add_resource(File, api_root + 'file/<path>')
api.add_resource(Task, api_root + 'task/<path>')
add_web_api(api, api_root, name='job')
api.add_resource(Image3D, api_root + 'image/<path>')


def lauch():
    app.run(debug=True, host="0.0.0.0")


if __name__ == "__main__":
    lauch()