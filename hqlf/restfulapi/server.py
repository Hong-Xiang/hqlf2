from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from hqlf.restfulapi.filesystem import Directory, File

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

def lauch():
    app.run(debug=True, host="0.0.0.0")

if __name__ == "__main__":
    lauch()
