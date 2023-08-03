let algorithms = [
  // [0] = anemia
  [
    {
      key: "1",
      value: "Hb low",
      parent: "",
      labitemsIndex: "3",
      measurementsIndex: "",
    },
    {
      key: "1-1",
      value: "MCV low",
      parent: "1",
      labitemsIndex: "41",
      measurementsIndex: "",
    },
    {
      key: "10",
      value: "MCV normal",
      parent: "1",
      labitemsIndex: "41",
      measurementsIndex: "",
    },
    {
      key: "11",
      value: "MCV high",
      parent: "1",
      labitemsIndex: "",
      measurementsIndex: "",
    },
    {
      key: "110",
      value: "Iron deficiency not probable",
      parent: "11",
      labitemsIndex: "",
      measurementsIndex: "",
    },
    {
      key: "10-1",
      value: "Ferritin low",
      parent: "10",
      labitemsIndex: "",
      measurementsIndex: "",
    },
    {
      key: "10-10",
      value: "Iron deficiency anemia",
      parent: "10-1",
      labitemsIndex: "",
      measurementsIndex: "",
    },
    {
      key: "100",
      value: "Ferritin normal",
      parent: "10",
      labitemsIndex: "13",
      measurementsIndex: "",
    },
    {
      key: "1000",
      value: "CRP normal",
      parent: "100",
      labitemsIndex: "",
      measurementsIndex: "",
    },
    {
      key: "1001",
      value: "CRP high",
      parent: "100",
      labitemsIndex: "",
      measurementsIndex: "",
    },
    {
      key: "1-1-1",
      value: "Ferritin low",
      parent: "1-1",
      labitemsIndex: "",
      measurementsIndex: "",
    },
    {
      key: "1-1-10",
      value: "Iron deficiency anemia",
      parent: "1-1-1",
      labitemsIndex: "",
      measurementsIndex: "",
    },
    {
      key: "1-10",
      value: "Ferritin normal",
      parent: "1-1",
      labitemsIndex: "13",
      measurementsIndex: "",
    },
    {
      key: "1-100",
      value: "Suspect Thalassemia",
      parent: "1-10",
      labitemsIndex: "",
      measurementsIndex: "",
    },
    {
      key: "1-101",
      value: "CRP high",
      parent: "1-10",
      labitemsIndex: "",
      measurementsIndex: "8",
    },
    {
      key: "1-101-1",
      value: "Anemia of chronic disease",
      parent: "1-101",
      labitemsIndex: "",
      measurementsIndex: "",
    },
    {
      key: "1-1010",
      value: "Iron deficiency anemia or Anemia of chronic disease",
      parent: "1-101",
      labitemsIndex: "",
      measurementsIndex: "",
    },
  ],
];
class TreeNode {
  constructor(
    key,
    value = key,
    parent = null,
    labitemsIndex,
    measurementsIndex
  ) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.labitemsIndex = labitemsIndex;
    this.measurementsIndex = measurementsIndex;
    this.children = [];
    measurementsIndex;
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

class Tree {
  constructor(key, value = key, labitemsIndex, measurementsIndex) {
    this.root = new TreeNode(
      key,
      value,
      null,
      labitemsIndex,
      measurementsIndex
    );
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(parentNodeKey, key, value = key, labitemsIndex, measurementsIndex) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(
          new TreeNode(key, value, node, labitemsIndex, measurementsIndex)
        );
        return true;
      }
    }
    return false;
  }

  remove(key) {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c) => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }

  findLeavesFrom(parentNodeKey) {
    let leaves = [];
    for (let node of this.preOrderTraversal()) {
      if (node.key.startsWith(parentNodeKey)) {
        if (node.isLeaf) leaves.push(node);
      }
    }
    return leaves;
  }
}

function testEngine(key) {
  let selectedTreeIndex = key;
  const tree = new Tree(
    algorithms[selectedTreeIndex][0].key,
    algorithms[selectedTreeIndex][0].value,
    algorithms[selectedTreeIndex][0].labitemsIndex,
    algorithms[selectedTreeIndex][0].measurementsIndex
  );
  let algorithmLength = algorithms[selectedTreeIndex].length;
  for (let i = 1; i < algorithmLength; i++) {
    tree.insert(
      algorithms[selectedTreeIndex][i].parent,
      algorithms[selectedTreeIndex][i].key,
      algorithms[selectedTreeIndex][i].value,
      algorithms[selectedTreeIndex][i].labitemsIndex,
      algorithms[selectedTreeIndex][i].measurementsIndex
    );
  }

  let leaves = [];
  let keyString = "1";
  let path = "";
  while (true) {
    let node = tree.find(keyString);
    let item = {};
    try {
      if (keyString != "1") {
        path += " &#8594 " + node.value;
      } else {
        path += node.value;
      }

      if (node.labitemsIndex != "") {
        item = labItems[node.labitemsIndex];
      } else if (node.measurementsIndex != "") {
        item = measurements[node.measurementsIndex];
      } else {
        leaves = tree.findLeavesFrom(keyString);
        return [leaves, path];
      }
      if (item.value <= 0) {
        path += " &#8594 " + item.name + " not entered";
        leaves = tree.findLeavesFrom(keyString);
        if (keyString == "1") {
          return [undefined, undefined];
        }
        return [leaves, path];
      }
      if (item.value > item.max) {
        keyString += "1";
      } else if (item.value < item.min) {
        keyString += "-1";
      } else {
        keyString += "0";
      }

      //   leaves = tree.findLeavesFrom("1-10");
      // console.log([...leaves].map((x) => x.value));
    } catch {
      return [undefined, undefined];
    }
  }
}
