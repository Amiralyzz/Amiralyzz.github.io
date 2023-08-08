function writeData(value) {
  localStorage.setItem("labItems", value);
}

function readData() {
  try {
    if (localStorage.getItem("labItems") == null) {
      let labData = JSON.stringify(labItems);
      writeData(labData);
    } else {
      labItems = JSON.parse(localStorage.getItem("labItems"));
    }
  } catch {
    let labData = JSON.stringify(labItems);
    writeData(labData);
  }
}
