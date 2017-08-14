import urllib
from flask_restful import Resource, reqparse
from flask import request

from hqlf.model.directory import Directory as DirectoryModel


def _error_handle(err):
    if isinstance(err, FileNotFoundError):
        return {'ERROR': "File or directory {err} not exist.".format(err=err)}, 404
    elif isinstance(err, NotADirectoryError):
        return {'ERROR': "{err} is not a directory .".format(err=err)}, 409
    elif isinstance(err, ValueError):
        if str(err) == "Path can not be None.":
            return {'ERROR': 'Directory path not specified.'}, 400
        else:
            return {'ERROR': str(err)}
    elif isinstance(err, FileExistsError):
        return {'ERROR': 'File {err} exists.'.format(err=err)}, 409
    else:
        raise err


_parser = reqparse.RequestParser()
_parser.add_argument('task', type=str)
_parser.add_argument('regs', type=str)
_parser.add_argument('source', type=str)
_parser.add_argument('target', type=str)

def _unquote(double_quoted_path):
    quoted_path = urllib.parse.unquote_plus(double_quoted_path)
    path = urllib.parse.unquote_plus(quoted_path)
    return path
    
class Directory(Resource):
    def get(self, path):
        try:
            print('>>> GET CALLED.')
            path = _unquote(path)
            pwd = DirectoryModel(path)
            args = _parser.parse_args()
            contents = pwd.contents(args.get('regs', '*'))
            results = {
                'status': 'OK',
                'path': pwd.pwd(),
                'files': contents['files'],
                'isdir': contents['isdir'],
                'parent': pwd.exit(),
                'parts': pwd.parts()
            }
            return results, 200
        except Exception as err:
            return _error_handle(err)

    def put(self, path):
        try:
            path = urllib.parse.unquote_plus(path)
            pwd = DirectoryModel(path)
            args = _parser.parse_args()
            target = urllib.parse.unquote_plus(args['target'])
            result = {
                'status': 'OK',
                'path' : pwd.rename(target)
            }
            return results, 201
        except Exception as err:
            return _error_handle(err)

    def post(self, path):
        try:
            path = urllib.parse.unquote_plus(path)
            pwd = DirectoryModel(path)
            args = parser.parse_args()
            source = urllib.parse.unquote_plus(args['target'])
            result = {
                'status': 'OK',
                'path' : pwd.mkdir()
            }
            return results, 201
        except Exception as err:
            return _error_handle(err)

    def delete(self, path):
        try:
            path = request.form.get('path')
            pwd = DirectoryModel(path)
            result = pwd.delete()
            return {'OK': result}
        except Exception as err:
            return _error_handle(err)
