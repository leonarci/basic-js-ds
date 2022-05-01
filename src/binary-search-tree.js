const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data, root = this.rootNode) {
    if (!this.rootNode) {
      this.rootNode = new Node(data);
      return;
    }

    if (!root) {
      return new Node(data);
    }

    if (data < root.data) {
      root.left = this.add(data, root.left);
    } else if (data > root.data) {
      root.right = this.add(data, root.right);
    }
    return root;
  }

  has(data, root = this.rootNode) {
    if (!root) return false;

    if (root.data === data) return true;

    if (data < root.data) {
      return this.has(data, root.left);
    } else if (data > root.data) {
      return this.has(data, root.right);
    }
  }

  find(data, root = this.rootNode) {
    if (!root) return null;

    if (root.data === data) return root;

    if (data < root.data) {
      return this.find(data, root.left);
    } else if (data > root.data) {
      return this.find(data, root.right);
    }
  }

  remove(data) {
    this.root = removeNode(data, this.rootNode);

    function removeNode(data, node) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = removeNode(data, node.left);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(data, node.right);
        return node;
      } else {
        if (!node.left && !node.right) {
          node = null;
          return node;
        } else if (!node.left) {
          node = node.right;
          return node;
        } else if (!node.right) {
          node = node.left;
          return node;
        } else {
          let maxFromLeft = node.left;
          while (maxFromLeft.right) {
            maxFromLeft = maxFromLeft.right;
          }

          node.data = maxFromLeft.data;
          node.left = removeNode(maxFromLeft.data, node.left);
          return node;
        }
      }
    }
  }

  min() {
    let currentRoot = this.rootNode;
    if (!currentRoot) return null;

    while (currentRoot.left) {
      currentRoot = currentRoot.left
    }

    return currentRoot.data;
  }

  max() {
    let currentRoot = this.rootNode;
    if (!currentRoot) return null;

    while (currentRoot.right) {
      currentRoot = currentRoot.right;
    }

    return currentRoot.data;
  }
}

module.exports = {
  BinarySearchTree
};