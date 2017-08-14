import urllib
from flask_restful import Resource, reqparse
from flask import request
import os

import json


def _error_handle(err):
    def emsg(text):
        return {
            'status': 'ERROR',
            'msg': text
        }
    if isinstance(err, FileNotFoundError):
        return emsg("File or directory {err} not exist.".format(err=err)), 404
    elif isinstance(err, NotADirectoryError):
        return emsg("{err} is not a directory .".format(err=err)), 409
    elif isinstance(err, NonePathError):
        return emsg('Directory path not specified.'), 400
    elif isinstance(err, ExecDirError):
        return emsg('Directory (err) can not be executable'.format(err=err)), 409
    elif isinstance(err, FileExistsError):
        return emsg('File {err} exists.'.format(err=err)), 409
    else:
        raise err


def _unquote(double_quoted_path):
    quoted_path = urllib.parse.unquote_plus(double_quoted_path)
    path = urllib.parse.unquote_plus(quoted_path)
    return path


class Task(Resource):
    def get(self, path):
        try:
            path = _unquote(path)
            # pwd = DirectoryModel(path, is_dir=True, is_exis=True)
            # pwd.check()
            # args = _parser.parse_args()
            # contents = pwd.contents(args.get('regs', '*'))
            # paths = [str((pwd._path / fn).absolute())
            #          for fn in contents['files']]
            results = {
                'status': 'OK',
                'path': path,
                # 'files': contents['files'],
                # 'isdir': contents['isdir'],
                # 'isexe': contents['isexe'],
                # 'parent': pwd.parent,
                # 'parts': pwd.parts,
                # 'paths': paths
            }
            return results, 200
        except Exception as err:
            return _error_handle(err)

    def post(self, path):
        """
        Use with HTTP request with POST method.
        path:
            double quoted path.
        body:
            {"command": <string:command to run.>}
        """
        try:
            path = _unquote(path)
            command = request.form['command']
            cmd = 'cd ' + path + ' && ' + command
            os.system(cmd)
            results = {
                'status': 'OK'
            }
            return results, 201
        except Exception as err:
            return _error_handle(err)
