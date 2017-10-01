import click


@click.group()
def gate():
    pass


@gate.command()
def copy():
    pass


@gate.command()
def copy_group():
    pass


@gate.command()
@click.option('--target', 't', type=str, default='.', help='target directory')
def generate_config(target):
    default_config = {
        'template_source_directory': ''
    }
    with 

@gate.command()
@click.option('--config', '-c', type=str, default='config.yml', help='config YAML file name')
def init():
    pass


@gate.command()
def submit():
    pass


@gate.command()
def merge()
    pass


@gate.command()
def clear()
    pass


if __name__ == "__main__":
    gate()
