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


# @gate.command()
# @click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config file name')
# def copy_group(config):
#     c = load_config(config)
#     service.copy_group(c['template_source_directory'],
#                        c['target'],
#                        c['group_name'])


@gate.command()
@click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config YAML file name')
def init(config):
    c = load_config(config)
    service.copy_group(c['template_source_directory'],
                       c['target'],
                       c['group_name'])
    service.make_run_sh(c['target'], c['run_sh'], c['main_mac'], c['analysis_c'])
    service.make_post_sh(c['target'], c['post_sh'], c['main_mac'], c['analysis_c'])
    service.make_subs(c['target'], c['nb_split'])


@click.command()
@click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config file name')
def run(config):
    c = load_config(config)
    service.run(c['target'], c['main_mac'], stdout=c['stdout'])


@gate.command()
@click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config YAML file name')
def submit(config):
    # TODO: add submit service
    c = load_config(config)
    service.submit(c['target'], c['sh_file'], service.submit_service_direct)


@gate.command()
@click.option('--config', '-c', type=str, default=DEFAULT_CONFIG_FILE, help='config YAML file name')
def merge(config):
    c = load_config(config)
    service.merge(c['target'], c['merge_file_name'])


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
