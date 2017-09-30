import yaml
import click
from dxpy.file_system.path import Path
from hqlf.gate import service


@click.group()
def split():
    pass

@split.command()
def init():
    with open('task.yml') as fin:
        c = yaml.load(fin)
    target = Path('.').abs
    service.copy_dir(c['source_dir'], target)
    service.make_sh(target, c['main_mac'], c['analysis_c'])
    for i in range(c['nb_split']):
        service.make_sub(target, i)


@split.command()
def submit():
    print('TODO: ADD SUBMIT!')

@split.command()
def debug():
    service.merge('.')


if __name__=="__main__":
    split()
