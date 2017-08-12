import { File } from './file';
import { Directory } from './directory';

const f1: File = {
  name: 'f1',
  path: '/tmp/home/f1',
  parent: '/tmp/home',
  isdir: false,
  isexe: false,
  url: 'xxx',
  contents: 'Content of f1.'
};

const f2: File = {
  name: 'f2',
  path: '/tmp/home/f2',
  parent: '/tmp/home',
  isdir: false,
  isexe: true,
  url: 'xxx',
  contents: 'Content of f2.'
};

const f3: File = {
  name: 'f3',
  path: '/tmp/home/f1',
  parent: '/tmp/home',
  isdir: true,
  isexe: false,
  url: 'xxx',
  contents: []
};

const f0: File = {
  name: 'home',
  path: '/tmp/home',
  parent: '/tmp',
  isdir: true,
  isexe: false,
  url: 'xxx',
  contents: [f1, f2, f3]
};

export const FILES_MOCK: File[] = [f0, f1, f2, f3];