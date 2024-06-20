const debuggerVersion = (document.getElementById("version").innerText ="v1.5.0");

const outputPanel = document.getElementById("outputPanel");
const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut");
const darkModeBtn = document.getElementById("darkMode");
const clearBtn = document.getElementById("clear");
const downloadBtn = document.getElementById("download");
const autoScroll = document.getElementById("autoScroll");
const settings = document.getElementById("settings");
const inputBar = document.getElementById("inputBar");
const selectedMsgType = document.getElementById("msgType");

let darkModeCount = 1; //default mode
let scrollPressed = true; //default
let fontSize = 16; //default
let msgTillNow = "";

//related to time stamp
let now = new Date();
let timestamp = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

zoomInButton.addEventListener("click", () => {
  fontSize += 2;
  outputPanel.style.fontSize = fontSize + "px";
});

zoomOutButton.addEventListener("click", () => {
  if (fontSize > 6) {
    // Prevent font size from becoming too small
    fontSize -= 2;
    outputPanel.style.fontSize = fontSize + "px";
  }
});

darkModeBtn.addEventListener("click", () => {
  if (darkModeCount % 2) {
    outputPanel.style.backgroundColor = "black";
    outputPanel.style.color = "lightgreen";
  } else {
    outputPanel.style.backgroundColor = "white";
    outputPanel.style.color = "black";
  }
  darkModeCount++;
});

clearBtn.addEventListener("click", () => {
  outputPanel.value = "";
  msgTillNow = "";
});

downloadBtn.addEventListener("click", () => {
  if (outputPanel.value == "") {
    alert("there is no data to download");
    return;
  }
  const blob = new Blob([outputPanel.value], { type: "text/plain" });

  const link = document.createElement("a");

  link.download = "web_debug_ouptut.txt";

  link.href = window.URL.createObjectURL(blob);

  link.click();

  link.remove(); //delete the created link from document
});

autoScroll.addEventListener("click", () => {
  if (scrollPressed) {
    console.log("auto scroll enabled");
    scrollPressed = false;
  } else {
    console.log("disabled auto scroll");
    scrollPressed = true;
  }
});

settings.addEventListener("click", () => {
  document.getElementById("settingsPopUp").classList.remove("hidden");
});

function settingsClosePopup() {
  document.getElementById("settingsPopUp").classList.add("hidden");
}

function saveSettings() {
  settingsClosePopup(); //finally
}

function sendInputData() {
  data = inputBar.value;
  let msg;
  if (selectedMsgType.value == "input") {
    msg = {
      "msg": "input",
      "data": data,
    };
  } else {
     msg = {
      "msg": data,
    };
  }

  sendData(msg);
}
