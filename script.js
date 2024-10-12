class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
class Tree {
  constructor(arr = []) {
    this.root = buildTree(arr);
  }
  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  // Recursive insertion function
  insertNode(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertNode(node.right, value);
    }

    return node; // Return the node to keep the tree structure intact
  }
  deleteItem(value) {
    const supprimer = (node, x) => {
      const fusion = (a1, a2) => {
        if (a1 === null) return a2;
        if (a2 === null) return a1;

        return new Node(
          a1.data,
          a1.left,
          new Node(a2.data, fusion(a1.right, a2.left), a2.right)
        );
      };

      if (node === null) return null;

      if (x < node.data) {
        return new Node(node.data, supprimer(node.left, x), node.right);
      } else if (x > node.data) {
        return new Node(node.data, node.left, supprimer(node.right, x));
      } else {
        return fusion(node.left, node.right);
      }
    };

    this.root = supprimer(this.root, value);
  }
  find(value) {
    if (this.root === null) return false;
    if (this.root.data < value) {
      this.root.right.find(value);
    } else if (this.root.data > value) {
      this.root.left.find(value);
    } else return true;
  }
  levelOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("no callback function!");

    if (this.root === null) return;
    let discovered = [this.root];
    while (discovered.length > 0) {
      let currentNode = discovered.shift();
      callback(currentNode);
      if (currentNode.left) {
        discovered.push(currentNode.left);
      }
      if (currentNode.right) {
        discovered.push(currentNode.right);
      }
    }
  }
  inOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("no callback function!");
    const aux = (node) => {
      if (node === null) return;
      aux(node.left);
      callback(node);
      aux(node.right);
    };
    aux(this.root);
  }
  preOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("no callback function!");
    const aux = (node) => {
      if (node === null) return;
      callback(node);
      aux(node.left);
      aux(node.right);
    };
    aux(this.root);
  }
  postOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("no callback function!");
    const aux = (node) => {
      if (node === null) return;
      aux(node.left);
      aux(node.right);
      callback(node);
    };
    aux(this.root);
  }
  height(node) {
    if (node === null) return -1;
    return Math.max(height(node.left), height(node.right)) + 1;
  }
  depth(node) {
    const findDepth = (current, depth) => {
      if (current === null) return -1; // Node not found
      if (current === node) return depth; // Found the node, return the depth

      // Check left and right subtrees
      const leftDepth = findDepth(current.left, depth + 1);
      if (leftDepth !== -1) return leftDepth; // Found in left subtree

      return findDepth(current.right, depth + 1); // Check right subtree
    };

    return findDepth(this.root, 0);
  }
  isBalanced() {
    return checkBalanced(this.root) !== -1;
    function checkBalanced(node) {
      // Recursive function to check balance and calculate height
      if (node === null) return 0;

      const leftHeight = checkBalanced(node.left);
      if (leftHeight === -1) return -1; // Left subtree is not balanced

      const rightHeight = checkBalanced(node.right);
      if (rightHeight === -1) return -1; // Right subtree is not balanced

      // Check if current node is balanced
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1; // Not balanced
      }

      // Return height of current node
      return Math.max(leftHeight, rightHeight) + 1;
    }
  }
  rebalance(){//could be done with rotations for less complexity but oh well
    let aux=[];
    this.inOrder((node)=>{
        aux.push(node.data)
    })
    aux.sort((a,b)=> a-b);
    this.root=buildTree(aux);
  }
}

function buildTree(arr) {
  let aux1 = [...new Set(arr)];
  aux1.sort(function (a, b) {
    return a - b;
  });
  function aux(target, start, end) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(target[mid]);
    root.left = aux(target, start, mid - 1);
    root.right = aux(target, mid + 1, end);
    return root;
  }
  return aux(aux1, 0, aux1.length - 1);
}
