import urllib
from flask_restful import Resource, reqparse
from flask import request
import os

import json


def _unquote(double_quoted_path):
    quoted_path = urllib.parse.unquote_plus(double_quoted_path)
    path = urllib.parse.unquote_plus(quoted_path)
    return path

class Task(Resource):
    def get(self, path):
        try:
            path = _unquote(path)
            pwd = DirectoryModel(path, is_dir=True, is_exis=True)
            pwd.check()
            args = _parser.parse_args()
            contents = pwd.contents(args.get('regs', '*'))
            paths = [str((pwd._path / fn).absolute())
                     for fn in contents['files']]
            results = {
                'status': 'OK',
                'path': pwd.path,
                'files': contents['files'],
                'isdir': contents['isdir'],
                'isexe': contents['isexe'],
                'parent': pwd.parent,
                'parts': pwd.parts,
                'paths': paths
            }
            return results, 200
        except Exception as err:
            return _error_handle(err)

    def post(self, path):
        try:
            print("TEST POST")
            path = _unquote(path)
            cmd = 'cd '+path+' && sbatch '+ path + '/run.sh' + ' > task.start'
            print(cmd)
            os.system(cmd)
            os.system('mkdir test')
            # args = parser.parse_args()
            # # source = request.form.get('data')
            # # source = _unquote(source)
            results = {
                'status': 'OK'
            }
            return results, 201
        except Exception as err:
            return _error_handle(err)