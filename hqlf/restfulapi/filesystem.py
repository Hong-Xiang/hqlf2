import urllib
from flask_restful import Resource, reqparse
from flask import request

from hqlf.model.filesystem import Directory as DirectoryModel
from hqlf.model.filesystem import File as FileModel
from hqlf.model.filesystem import NonePathError, ExecDirError


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

    # def put(self, path):
    #     try:
    #         path = _unquote(path)
    #         pwd = DirectoryModel(path)
    #         args = _parser.parse_args()
    #         target = urllib.parse.unquote_plus(args['target'])
    #         result = {
    #             'status': 'OK',
    #             'path': pwd.rename(target)
    #         }
    #         return results, 201
    #     except Exception as err:
    #         return _error_handle(err)

    def post(self, path):
        try:
            path = _unquote(path)
            pwd = DirectoryModel(path, is_exis=False)
            # args = parser.parse_args()
            # # source = request.form.get('data')
            # # source = _unquote(source)
            results = {
                'status': 'OK',
                'path': pwd.mkdir()
            }
            return results, 201
        except Exception as err:
            return _error_handle(err)

    def delete(self, path):
        try:
            path = _unquote(path)
            pwd = DirectoryModel(path, is_exis=True)
            result = pwd.delete()
            return {'status': 'OK',
                    'parent': result}
        except Exception as err:
            return _error_handle(err)


class File(Resource):
    def get(self, path):
        try:
            path = _unquote(path)
            f = FileModel(path, is_exis=True)
            args = _parser.parse_args()

            contents = f.contents()
            results = {
                'status': 'OK',
                'path': f.path,
                'isexe': f.is_exec,
                'parent': f.parent,
                'parts': f.parts,
                'contents': contents
            }
            return results, 200
        except Exception as err:
            return _error_handle(err)

    def post(self, path):
        try:
            path = _unquote(path)
            f = FileModel(path, is_exis=False)

            contents = request.form.get('data')
            f.new(data=contents)
            contents = f.contents()
            results = {
                'status': 'OK',
                'path': f.path,
                'isexe': f.is_exec,
                'parent': f.parent,
                'parts': f.parts,
                'contents': contents
            }
            return results, 200
        except Exception as err:
            return _error_handle(err)

    def put(self, path):
        try:
            path = _unquote(path)
            print(path)
            f = FileModel(path, is_dir=False, is_exis=True)
            args = _parser.parse_args()
            contents = request.form.get('data')
            f.modify(data=contents)
            contents = f.contents()
            results = {
                'status': 'OK',
                'path': f.path,
                'isexe': f.is_exec,
                'parent': f.parent,
                'parts': f.parts,
                'contents': contents
            }
            return results, 200
        except Exception as err:
            return _error_handle(err)

    def delete(self, path):
        try:
            path = _unquote(path)
            print(path)
            f = FileModel(path, is_dir=False, is_exis=True)
            parent = f.delete()
            results = {
                'status': 'OK',
                'parent': parent
            }
            return results, 200
        except Exception as err:
            return _error_handle(err)
