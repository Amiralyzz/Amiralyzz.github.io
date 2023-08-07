let algorithms = [
  // [0] = anemia
  [
    {
      "key": "1",
      "value": "Hb low",
      "parent": "",
      "labitemsIndex": "3",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1",
      "value": "MCV low",
      "parent": "1",
      "labitemsIndex": "41",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10",
      "value": "MCV normal",
      "parent": "1",
      "labitemsIndex": "41",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11",
      "value": "MCV high",
      "parent": "1",
      "labitemsIndex": "57",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "110",
      "value": "no Schistocytes",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "11"
    },
    {
      "key": "1100",
      "value": "Folate or B12 normal",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": "1"
    },
    {
      "key": "11001",
      "value": "Pancytopenia",
      "parent": "1100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11000",
      "value": "no Pancytopenia",
      "parent": "1100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "110010",
      "value": "Macrocytic Anemia (Leukemia, Aplastic Anemia or MDS)",
      "parent": "11001",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "110000",
      "value": "Macrocytic Anemia (Drugs, Liver , Alcohol , Endocrine)",
      "parent": "11000",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1101",
      "value": "Folate or B12 low",
      "parent": "110",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "11010",
      "value": "Megaloblastic Anemia",
      "parent": "1101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "111",
      "value": "Schistocytes",
      "parent": "11",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1110",
      "value": "Hemolysis",
      "parent": "111",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-1",
      "value": "Ferritin low",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "10-10",
      "value": "Iron deficiency anemia",
      "parent": "10-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "100",
      "value": "Ferritin normal",
      "parent": "10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1000",
      "value": "Marrow damage",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1001",
      "value": "decreased stimulation (Renal disease, Inflammation)",
      "parent": "100",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1-1",
      "value": "Ferritin low",
      "parent": "1-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1-10",
      "value": "Iron deficiency anemia",
      "parent": "1-1-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-10",
      "value": "Ferritin normal",
      "parent": "1-1",
      "labitemsIndex": "13",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-100",
      "value": "Suspect Thalassemia",
      "parent": "1-10",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-101",
      "value": "CRP high",
      "parent": "1-10",
      "labitemsIndex": "",
      "measurementsIndex": "8",
      "signsIndex": ""
    },
    {
      "key": "1-101-1",
      "value": "TSAT low",
      "parent": "1-101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-1010",
      "value": "TSAT normal",
      "parent": "1-101",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-101-10",
      "value": "Anemia of chronic disease",
      "parent": "1-101-1",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    },
    {
      "key": "1-10100",
      "value": "Iron deficiency anemia or Anemia of chronic disease",
      "parent": "1-1010",
      "labitemsIndex": "",
      "measurementsIndex": "",
      "signsIndex": ""
    }
  ],
];
class TreeNode {
  constructor(
    key,
    value = key,
    parent = null,
    labitemsIndex,
    measurementsIndex,
    signsIndex
  ) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.labitemsIndex = labitemsIndex;
    this.measurementsIndex = measurementsIndex;
    this.signsIndex = signsIndex;
    this.children = [];
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

class Tree {
  constructor(key, value = key, labitemsIndex, measurementsIndex, signsIndex) {
    this.root = new TreeNode(
      key,
      value,
      null,
      labitemsIndex,
      measurementsIndex,
      signsIndex
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

  insert(parentNodeKey, key, value = key, labitemsIndex, measurementsIndex, signsIndex) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(
          new TreeNode(key, value, node, labitemsIndex, measurementsIndex, signsIndex)
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
    algorithms[selectedTreeIndex][0].measurementsIndex,
    algorithms[selectedTreeIndex][0].signsIndex
  );
  let algorithmLength = algorithms[selectedTreeIndex].length;
  for (let i = 1; i < algorithmLength; i++) {
    tree.insert(
      algorithms[selectedTreeIndex][i].parent,
      algorithms[selectedTreeIndex][i].key,
      algorithms[selectedTreeIndex][i].value,
      algorithms[selectedTreeIndex][i].labitemsIndex,
      algorithms[selectedTreeIndex][i].measurementsIndex,
      algorithms[selectedTreeIndex][i].signsIndex
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
      } else if (node.signsIndex != "") {
        let value = patient[0].signs[3][node.signsIndex];
        let name = patient[0].signs[4][node.signsIndex];
        let entered = 0;
        if (value != undefined) {
          entered = 1;
          console.log("folate entered");
        }
        item = {
          "name": name,
          "entered": entered,
          "value": value,
          "min": -1,
          "max": 0.5 
        }
      }
      else {
        leaves = tree.findLeavesFrom(keyString);
        return [leaves, path];
      }
      if (item.entered == 0) {
        path += " &#8594 " + item.name + " not entered";
        leaves = tree.findLeavesFrom(keyString);
        if (keyString == "1") {
          return [undefined, undefined];
        }
        return [leaves, path];
      }
      if (item.used === false) {
        path += " &#8594 " + item.name + " not entered";
        leaves = tree.findLeavesFrom(keyString);
        if (keyString == "1") {
          return [undefined, undefined];
        }
        return [leaves, path];
      }
      let value = Number(item.value);
      let max = Number(item.max);
      let min = Number(item.min);

      if (item.max == "") {
        if (item.min == "") {
          return [leaves, path];
        } else if (value < min) {
          keyString += "-1";
        } else {
          keyString += "0";
        }
      } else {
        if (value > max) {
          keyString += "1";
        } else if (item.min == "") {
            keyString += "0";
        } else if (value < min) {
          keyString += "-1";
        } else {
          keyString += "0";
        }
          
      }
      


      // if (Number(item.value) > Number(item.max)) {
      //   keyString += "1";
      // } else if (Number(item.value) < Number(item.min)) {
      //   keyString += "-1";
      // } else {
      //   keyString += "0";
      // }
      //   leaves = tree.findLeavesFrom("1-10");
      // console.log([...leaves].map((x) => x.value));
    } catch {
      return [undefined, undefined];
    }
  }
}
