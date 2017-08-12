from functools import wraps
from pathlib import Path
import shutil
import stat


def _with_check(func):
    @wraps(func)
    def wrapper(obj, *args, **kwargs):
        obj.check()
        return func(obj, *args, **kwargs)
    return wrapper


_EXEC_SUFFIX = ('.sh', )


class NonePathError(TypeError):
    def __init__(self, *arg, **kwargs):
        super(NonePathError, self).__init__(self)


class ExecDirError(ValueError):
    def __init__(self, *arg, **kwargs):
        super(ExecDirError, self).__init__(self)


class FileUnix:
    def __init__(self, path, is_exis=None, is_dir=None, is_exec=None):

        if path is None:
            raise ValueError("Path can not be None.")
        self._path = Path(path)
        if is_exis is None:
            self._is_exis = self._path.exists()
        else:
            self._is_exis = is_exis
        if is_dir is None:
            self._is_dir = self._path.is_dir()
        else:
            self._is_dir = is_dir
        if is_exec is None:
            self._is_exec = self._path.suffix in _EXEC_SUFFIX
        else:
            self._is_exec = is_exec

    def check(self):
        if self._path is None:
            raise NonePathError
        if self._path.exists():
            if not self._is_exis:
                raise FileExistsError(self._path_str())
            if self._path.is_dir():
                if not self._is_dir:
                    raise IsADirectoryError(self._path_str())
            else:
                if self._is_dir:
                    raise NotADirectoryError(self._path_str())
            if self._is_dir and self._is_exec:
                raise ExecDirError(self._path_str())
        else:
            if self._is_exis:
                raise FileNotFoundError(self._path_str())
        return None

    def __str__(self):
        result = "<unix file: {fn}: is_dir={is_dir}, is_exec={is_exec}, is_exis={is_exis}>".format(
            fn=self.path, is_dir=self.is_dir, is_exec=self.is_exec, is_exis=self.is_exis)
        return result

    def _path_str(self):
        return str(self._path.absolute())

    @property
    @_with_check
    def name(self):
        return self._path.name

    @property
    @_with_check
    def is_exis(self):
        return self._is_exis

    @property
    @_with_check
    def is_dir(self):
        return self._is_dir

    @property
    @_with_check
    def is_exec(self):
        return self._is_exec

    @property
    @_with_check
    def path(self):
        return self._path_str()

    @property
    @_with_check
    def name(self):
        return self._path.name

    @property
    @_with_check
    def parts(self):
        return self._path.parts

    @property
    @_with_check
    def parent(self):
        pdir = FileUnix(self._path.parent, is_dir=True, is_exis=True)
        return pdir.path

    @_with_check
    def rename(self, path_new):
        path_new = FileUnix(path_new, is_exis=False)
        path_new.check()
        self.path.rename(path_new.path)
        self._path = Path(path_new.path)
        return self.path


class Directory(FileUnix):
    def __init__(self, *args, **kwargs):
        super(Directory, self).__init__(*args, **kwargs)
        self._is_dir = True
        self._is_exec = False

    @_with_check
    def mkdir(self, parents=False):
        if self.is_exis:
            raise FileExistsError
        self._path.mkdir(parents=parents)
        self._is_exis = True
        return self.path

    @_with_check
    def delete(self):
        if not self.is_exis:
            raise FileNotFoundError
        parent = self.parent
        shutil.rmtree(self.path)
        self._is_exis = False
        return parent

    @_with_check
    def contents(self, reg=None):
        self.check()
        reg = reg or '*'
        paths = [p for p in self._path.glob(reg)]
        files_unix = [FileUnix(str(p.absolute())) for p in paths]
        files = [f.name for f in files_unix]
        is_dirs = [f.is_dir for f in files_unix]
        is_exes = [f.is_exec for f in files_unix]
        return {'files': files, 'isdir': is_dirs, 'isexe': is_exes}

    @_with_check
    def enter(self, target):
        path_new = self._path / target
        nwd = Directory(path_new)
        nwd.check()
        return nwd.path

    @_with_check
    def exit(self):
        ppwd = Directory(self.parent)
        return ppwd.path


class File(FileUnix):
    def __init__(self, *arg, **kwargs):
        super(File, self).__init__(*arg, **kwargs)

    @_with_check
    def contents(self, fmt=str):
        with self._path.open() as fin:
            return fin.read()

    @_with_check
    def new(self, parents=False, data=None):
        print('NEW CALLED.')
        if self.is_exis:
            raise FileExistsError
        if parents:
            pd = Path(self.parent)
            if not pd.exists():
                pd = Directory(self.parent, is_dir=True, is_exis=False)
                pd.mkdir()
        print('WRITE READY.')
        if data:
            if isinstance(data, str):
                data = data.encode()
            with self._path.open('wb') as fout:
                fout.write(data)
        else:
            self._path.touch()
        self._is_exis = True
        return self.path

    @_with_check
    def modify(self, data=None):
        if data:
            if isinstance(data, str):
                data = data.encode()
            with self._path.open('wb') as fout:
                fout.write(data)
        else:
            self._path.touch()
        return self.path

    @_with_check
    def delete(self):
        if not self.is_exis:
            raise FileNotFoundError
        parent = self.parent
        self._path.unlink()
        self._is_exis = False
        return parent
