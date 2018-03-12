#!/home/hongxwing/anaconda3/bin/python
import click
import yaml
from fs.osfs import OSFS
import os
import subprocess
import sys
from hqlf.gate import service


@click.group()
def gate():
    pass


DEFAULT_CONFIGS = {
    'template_source_directory': os.environ.get('PATH_MACS_TEMPLATES',
                                                '/hqlf/hongxwing/macs_template'),
    'target': '.',
    'group_name': 'Ecat',
    'main_mac': 'PET_Ecat.mac',
    'analysis_c': 'PET_Analyse.C',
    'nb_split': 10,
    'merge_file': 'polyEcat.txt',
    'no_action': False,
    'run_sh': 'run.sh',
    'post_sh': 'post.sh'
}

DEFAULT_CONFIG_FILE = 'config.yml'


@gate.command()
@click.option('--target', '-t', type=str, default='.', help='target directory')
@click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config file name')
def generate_config(target, config):
    with OSFS(target) as t:
        with t.open(config, 'w') as fout:
            yaml.dump(DEFAULT_CONFIGS, fout, default_flow_style=False)


def load_config(config):
    with open(config) as fin:
        return yaml.load(fin)


@gate.command()
@click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config YAML file name')
@click.option('--templates', '-t', isflag=True)
@click.option('--shell', '-s', isflag=True)
@click.option('--dirs', '-d', isflag=True)
def init_all(config, templates, shell, dirs):
    c = load_config(config)
    if not dirs and not shell and not templates:s
        make_all = True
    if templates or make_all:
        service.copy_group(c['template_source_directory'],
                        c['target'],
                        c['group_name'])
    if shell or make_all:
        service.make_run_sh(c['target'], c['run_sh'],
                            c['main_mac'], c['analysis_c'])
        service.make_post_sh(c['target'], c['post_sh'])
    if dirs or make_all:
        service.make_subs(c['target'], c['nb_split'])


@click.command()
@click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config file name')
def run(config):
    c = load_config(config)
    service.run(c['target'], c['main_mac'], stdout=c['stdout'])


@gate.command()
@click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config YAML file name')
@click.option('--worker', '-w', type=str, default='print', help='service type, one of [print, direct, slurm]')
def submit(config, worker):
    # TODO: add submit service
    c = load_config(config)
    if worker == 'print':
        service.submit(c['target'], c['run_sh'], c['post_sh'],
                       service.submit_service_print)
    elif worker == 'direct':
        service.submit(c['target'], c['run_sh'], c['post_sh'],
                       service.submit_service_direct)
    elif worker == 'hqlf':
        service.submit(c['target'], c['run_sh'], c['post_sh'],
                       service.submit_service_hqlf)


@gate.command()
@click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config YAML file name')
def merge(config):
    c = load_config(config)
    service.merge(c['target'], c['merge_file'])


@gate.command()
@click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config YAML file name')
def clear_subdirs(config):
    c = load_config(config)
    service.clear_subdirs(c['target'], c['no_action'])


@gate.command()
@click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config YAML file name')
def clear_all(config):
    c = load_config(config)
    service.clear_all(c['target'], config, c['no_action'])


if __name__ == "__main__":
    gate()
