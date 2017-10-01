import yaml
from fs.osfs import OSFS
from fs.copy import copy_file, copy_fs
from fs import path

# TODO: Extract these methods to config service
# START OF CONFIGS


def template_path():
    return '/home/hongxwing/Workspace/mac_zoo'


def group_macs(group_name):
    with OSFS(template_path()) as tpl_dir:
        with tpl_dir.open('group.yml') as fin:
            return yaml.load(fin)[group_name]
# END OF CONFIGS


def copy_mac(target, mac_name):
    copy_file(OSFS(template_path()), mac_name, OSFS(target), mac_name)


def copy_group_macs(target, group_name):
    macs = group_macs(group_name)
    for m in macs:
        copy_mac(target, m)


def make_sh(target, main_mac, analysis_c):
    with OSFS(target) as t:
        with t.open('run.sh', 'w') as fout:
            c = ("#!/bin/bash\n"
                 + "date\n"
                 + "#SBATCH -o %j.out\n"
                 + "#SBATCH -e %j.err\n"
                 + "Gate {mac}\n".format(mac=main_mac)
                 + "root -q -b {cfile}\n".format(cfile=analysis_c)
                 + "date\n")
            print(c, file=fout)


def copy_dir(source, target):
    filters = ['*.mac', '*.sh', '*.C', '*.pat']
    with OSFS(source) as s:
        with OSFS(target) as t:
            files = list(s.walk.files(filter=filters))
            for f in files:
                copy_file(s, f, t, f)


def make_sub(target, sub_id):
    with OSFS(target) as t:
        sub = t.makedir('sub{:d}'.format(sub_id), recreate=True)
    copy_dir(target, sub.getsyspath('.'))


def make_subs(target, nb_split):
    for i in range(nb_split):
        make_sub(target, i)


def merge(targe, merge_file_name):
    with OSFS(targe) as t:
        with t.open(merge_file_name, 'w') as fout:
            for f in t.walk.files(filter=[merge_file_name]):
                if path.issamedir('/', f):
                    continue
                with t.open(f) as fin_tmp:
                    print(fin_tmp.read(), end='', file=fout)


def submit(target, config_file):
    with OSFS(targe) as t:
        with t.open('config.yml') as fin:
            c = yaml.load(fin)
        for d in t.walk.dirs(filter=['sub*']):
            tasks_service.submit.sbatch(workdir=t.getsyspath())


def clear(target):
    
