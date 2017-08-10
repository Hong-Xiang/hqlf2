from pathlib import Path
import shutil

class Directory:
    def __init__(self, path):
        if path is None:
            raise ValueError("Path can not be None.")
        self.path = Path(path)

    def mkdir(self, parents=False):
        self.check(False)
        self.path.mkdir(parents=parents)
        return self.pwd()

    def delete(self):
        self.check()        
        parent = self.exit()
        shutil.rmtree(self.path)
        return parent

    def rename(self, path_new):
        self.check()
        path_new = Directory(path_new)
        path_new.check(False)
        self.path.rename(path_new.path)
        self.path = path_new.path
        return self.pwd()

    def pwd(self):
        self.check()
        return str(self.path.absolute())

    def parts(self):
        return self.path.parts

    def check(self, exists=True):
        if self.path is None:
            raise ValueError("Path can not be None.")
        if exists:
            if not self.path.exists():
                raise FileNotFoundError(self.path)
            if not self.path.is_dir():
                raise NotADirectoryError(self.path)                
        else:
            if self.path.exists():
                raise FileExistsError(self.path)
        return True

    def show(self, reg=None):
        self.check()
        reg = reg or '*'
        paths = [str(p.absolute()) for p in self.path.glob(reg)]
        return paths

    def contents(self, reg=None):
        self.check()
        reg = reg or '*'
        paths = [p for p in self.path.glob(reg)]
        is_dirs = [p.is_dir() for p in paths]
        pwd = self.pwd()
        paths = [str(p.name) for p in paths]
        return {'files': paths, 'isdir': is_dirs}

    def enter(self, target):
        self.check()
        path_new = self.path / target
        nwd = Directory(path_new)
        nwd.check()
        return nwd.pwd()

    def exit(self):
        self.check()
        ppwd = Directory(self.path.parent)
        return ppwd.pwd()



