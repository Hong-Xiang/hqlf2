import unittest
from hqlf.gate import service


class TestService:
    def test_copy_mac(self):
        tmplate = 'tmp.mac'
        target = '.'
        service.copy_mac('to_copy', '.')
        pass

    def test_copy_group_macs(self):
        group_name = 'test'
        target = '.'
        macs = service.get_group_macs(group_name)
        

    def test_run(self, main_mac):
        target = '.'
        service.run(target, main_mac)

    def test_split(self):
        nb_split = 10
        target = '.'
        service.split(target, '.')

    def test_batch(self):
        service.batch('.', 10)
