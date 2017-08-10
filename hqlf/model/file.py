from pathlib import Path
import shutil


class FileUnix:
    def __init__(self, path):
        if path is None:
            raise ValueError("Path can not be None.")
        self._path = Path(path)

    def mkdir(self, parents=False):
        self.check(False)
        self._path.mkdir(parents=parents)
        return self.path()

    def delete(self):
        self.check()
        parent = self.parent()
        shutil.rmtree(self._path)
        return parent

    def rename(self, path_new):
        self.check()
        path_new = Directory(path_new)
        path_new.check(False)
        self._path.rename(path_new.path)
        self._path = path_new.path
        return self.path()

    def path(self):
        self.check()
        return str(self._path.absolute())

    def parts(self):
        return self._path.parts

    def check(self, exists=True):
        if self._path is None:
            raise ValueError("Path can not be None.")
        if exists:
            if not self._path.exists():
                raise FileNotFoundError(self._path)
            if not self._path.is_dir():
                raise NotADirectoryError(self._path)
        else:
            if self._path.exists():
                raise FileExistsError(self._path)
        return True

    def parent(self):
        self.check()
        ppwd = FileUnix(self._path.parent)
        return ppwd.path()


class File(FileUnix):
    def __init__(self, path):
        super(File, self).__init__(path)

    def new(self, parents=False):
        self.check(False)
        self._path.mkdir(parents=parents)
        return self.path()

    def delete(self):
        self.check()
        parent = self.exit()
        shutil.rmtree(self._path)
        return parent

    def rename(self, path_new):
        self.check()
        path_new = Directory(path_new)
        path_new.check(False)
        self._path.rename(path_new.path)
        self._path = path_new.path
        return self.path()

    def path(self):
        self.check()
        return str(self._path.absolute())

    def parts(self):
        return self._path.parts

    def check(self, exists=True):
        if self._path is None:
            raise ValueError("Path can not be None.")
        if exists:
            if not self._path.exists():
                raise FileNotFoundError(self._path)
            if not self._path.is_dir():
                raise NotADirectoryError(self._path)
        else:
            if self._path.exists():
                raise FileExistsError(self._path)
        return True

    def contents(self):
        with self._path.open() as fin:
            return fin.read()



