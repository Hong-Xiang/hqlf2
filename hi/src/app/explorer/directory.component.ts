import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { File } from '../file/file';
import { FileService } from '../file/file.service';
import { TreeNode } from 'primeng/primeng';

@Component({
  selector: 'app-explorer-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent {
  filesTree: TreeNode[] = [];
  selectedNode: TreeNode;
  @Output() onOpenFile = new EventEmitter<string>();

  private getNodeFromFile(file: File): TreeNode {
    let node: TreeNode;
    if (file.isdir) {
      const children: TreeNode[] = [];
      for (let i = 0; i < file.childrenPath.length; ++i) {
        children.push({
          label: file.childrenName[i],
          data: file.childrenPath[i],
          leaf: !file.childrenIsDir[i]
        });
      }

      node = {
        label: file.name,
        data: file.path,
        leaf: false,
        children: children,
        expandedIcon: 'fa-folder-open',
        collapsedIcon: 'fa-folder'
      };
    } else {
      node = {
        label: file.name,
        data: file.path,
        leaf: true,
        children: [],
        icon: 'fa-file-word-o'
      };
    }
    return node;
  }

  newDir(path: string) {
    this.fileService.getFile(path, false).then(file => {
      const node = this.getNodeFromFile(file);
      this.filesTree.push(node);
    });
  }

  init() {
    this.fileService.getFile('/tmp/test20170810', false).then(file => {
      const node = this.getNodeFromFile(file);
      this.filesTree.push(node);
    });
  }
  constructor(private fileService: FileService) {}

  up() {
    const current_root = this.filesTree[0];
    this.fileService.getFile(current_root.data, false).then(c_file => {
      const p_path = c_file.parent;
      this.fileService.getFile(p_path, false).then(p_file => {
        const p_node = this.getNodeFromFile(p_file);
        this.filesTree[0] = p_node;
      });
    });
  }

  lift() {
    if (this.selectedNode) {
      this.filesTree[0] = this.selectedNode;
    }
  }

  close() {
    if (this.selectedNode) {
      for (let i = 0; i < this.filesTree.length; ++i) {
        if (this.filesTree[i] === this.selectedNode) {
          this.filesTree.splice(i, 1);
          return;
        }
      }
    }
  }

  nodeSelect(event) {
    if (event.node) {
      this.selectedNode = event.node;
      if (event.node.leaf) {
        this.onOpenFile.emit(event.node.data);
      } else {
        this.nodeExpand(event);
      }
    }
  }

  nodeExpand(event) {
    if (event.node) {
      this.fileService.getFile(event.node.data, event.node.leaf).then(file => {
        const nodes: TreeNode[] = [];
        for (let i = 0; i < file.childrenPath.length; ++i) {
          const child: File = {
            name: file.childrenName[i],
            path: file.childrenPath[i],
            isdir: file.childrenIsDir[i],
            parent: undefined,
            isexe: undefined,
            url: undefined,
            contents: undefined,
            childrenPath: [],
            childrenIsDir: [],
            childrenName: []
          };
          const node = this.getNodeFromFile(child);
          nodes.push(node);
        }
        event.node.children = nodes;
        event.node.expanded = true;
      });
    }
  }
}
