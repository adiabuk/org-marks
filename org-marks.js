function onError(error) {
  console.log(`Error: ${error}`);
}

var getting = browser.storage.local.get("input");
getting.then(onGot, onError);

function click() {

console.log('hello');
alert('hello);
document.getElementById("myElement").innerHTML = "whatever";
}

function setSidebarStyle(theme) {
  const myElement = document.getElementById("myElement");

  // colors.frame and colors.accentcolor are aliases
  if (theme.colors && (theme.colors.accentcolor || theme.colors.frame)) {
    document.body.style.backgroundColor =
      theme.colors.accentcolor || theme.colors.frame;
  } else {
    document.body.style.backgroundColor = "white";
  }

  if (theme.colors && theme.colors.toolbar) {
    myElement.style.backgroundColor = theme.colors.toolbar;
  } else {
    myElement.style.backgroundColor = "#ebebeb";
    myElement.text=getting;
    document.getElementById("myElement").innerHTML = "whatever";
  }

  if (theme.colors && theme.colors.toolbar_text) {
    myElement.style.color = theme.colors.toolbar_text;
  } else {
    myElement.style.color = "black";
  }
}

// Set the element style when the extension page loads
async function setInitialStyle() {
  const theme = await browser.theme.getCurrent();
  setSidebarStyle(theme);
}
setInitialStyle();

// Watch for theme updates
browser.theme.onUpdated.addListener(async ({ theme, windowId }) => {
  const sidebarWindow = await browser.windows.getCurrent();
  /*
    Only update theme if it applies to the window the sidebar is in.
    If a windowId is passed during an update, it means that the theme is applied to that specific window.
    Otherwise, the theme is applied globally to all windows.
  */
  if (!windowId || windowId == sidebarWindow.id) {
    setSidebarStyle(theme);
  }
});

document.body.style.border = "5px solid red";
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

function readFile(_path, _cb){

    fetch(_path, {mode:'same-origin'})   // <-- important

    .then(function(_res) {
        return _res.blob();
    })

    .then(function(_blob) {
        var reader = new FileReader();

        reader.addEventListener("loadend", function() {
            _cb(this.result);
        });
        console.log('reading file');
        reader.readAsText(_blob);
    });
};

//readFile('file:///home/amro/repos/personal/org-mode/remember.org', function(_res){
readFile('file:///home/amro/test', function(_res){

    console.log(_res); // <--  result (file content)

});

console.log('hello');

browser.menus.create({
  id: "remove-me",
  title: "Hello", //browser.i18n.getMessage("menuItemRemoveMe"),
  contexts: ["all"]
}, onCreated);

browser.menus.create({
  id: "separator-1",
  type: "separator",
  contexts: ["all"]
}, onCreated);

browser.menus.create({
  id: "greenify",
  type: "radio",
  title: browser.i18n.getMessage("menuItemGreenify"),
  contexts: ["all"],
  checked: true,
  icons: {
    "16": "icons/paint-green-16.png",
    "32": "icons/paint-green-32.png"
  }
}, onCreated);

browser.menus.create({
  id: "bluify",
  type: "radio",
  title: browser.i18n.getMessage("menuItemBluify"),
  contexts: ["all"],
  checked: false,
  icons: {
    "16": "icons/paint-blue-16.png",
    "32": "icons/paint-blue-32.png"
  }
}, onCreated);

browser.menus.create({
  id: "separator-2",
  type: "separator",
  contexts: ["all"]
}, onCreated);

var checkedState = true;

browser.menus.create({
  id: "check-uncheck",
  type: "checkbox",
  title: browser.i18n.getMessage("menuItemUncheckMe"),
  contexts: ["all"],
  checked: checkedState
}, onCreated);


document.getElementById("button").addEventListener("click", click);
