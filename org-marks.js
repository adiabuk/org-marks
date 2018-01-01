function onError(error) {
  console.log(`Error: ${error}`);
}

var getting = browser.storage.local.get("input");

function refresh() {

document.getElementById("myElement").innerHTML = getData();
}

function replacelink(html) {
    var re = new RegExp("^\\*\\*\\*\\s\\[\\[.*\\]\\[.*\\]\\]"); // [[http://google.com][google]]
    var re2 = new RegExp("^\\*\\*\\*\\s\\[\\[.*\\]\\]");        // [[http://www.google.com]]
    var re3 = new RegExp("^\\*\\*\\*\\shttp[s]?.*");            // http://www.google.com
    var re4 = new RegExp("\\*\\* .*");                          // <title>

    if (html.includes("DONE")) {
      ret =  "";
    }
    else if (re.test(html)) {
      ret = html.replace(/^\*\*\*\s\[\[(http[s]?.*)\]\[(.*)\]\]/g, "<a class='third after' href='$1'>$2</a><br>");
    }

    else if (re2.test(html)){
      ret = html.replace(/^\*\*\*\s\[\[(http[s]?.*)\]\]$/g, "<a class='third after' href='$1'>$1</a><br>");
    }
    else if (re3.test(html)){
      ret=html.replace(/^\*\*\*\s(http[s]?\:\/\/.*$)/g, "<a class='third after' href='$1'>$1</a><br>");
    }
    else if (re4.test(html)){
      ret = html.replace(/^\*\*\s(.*)$/g, "<h1>$1</h1><br>");
    }
    else {
      ret = "";
    }
    return ret;

}

function getData(){
    document.getElementById("myElement").innerHTML = "No data";
    a = '<a href="https://www.w3schools.com/html/">Visit our HTML tutorial</a>'
    var lines = localStorage["mysetting"].split('\n');
    var links = "";
    for(var i = 0;i < lines.length;i++){
      links += replacelink(lines[i]);
      links += "\n";
    }
    document.getElementById("myElement").innerHTML = links;
  return links
  }


function setSidebarStyle(theme) {
  const myElement = document.getElementById("myElement");
  document.getElementById("button").addEventListener("click", refresh);

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

readFile('file:///Users/diaba/test', function(_res){

    console.log(_res); // <--  result (file content)

});

var checkedState = true;

var button=document.getElementById("button");
button.addEventListener("click", refresh);
document.getElementById("myElement").innerHTML = "No data!!";
document.getElementById("button").addEventListener("click", displayDate);

function displayDate() {
    document.getElementById("demo").innerHTML = Date();
}
