const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handlePicked, false);

function handlePicked() {
  fileURL = window.URL.createObjectURL(this.files[0]);
  fileEntry = this.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var srctext = reader.result;
    var firstline = srctext.split('\n')[0];
    const regex = /\* Bookmarks([\s\S]*?.*?)\n\*?\s\S/g;
    m = regex.exec(srctext);
    localStorage.mysetting = m;
    localStorage["mysetting"] = m;
    var newtext = regex.exec(srctext);
   }
  reader.readAsText(fileEntry);
}

function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    input: document.querySelector("#input").value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#input").value = result.input || "blue";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("input");
  getting.then(setCurrentChoice, onError);
  console.log('restoring options')
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
