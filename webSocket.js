let esp32Url = "esp32.local"; // default url
let websocket;

// Handles all related to web sockets
window.addEventListener("load", function () {
  connectEsp32();
});

function closeConnection() {
  if (websocket) {
    // Remove all event listeners
    websocket.onopen = null;
    websocket.onclose = null;
    websocket.onmessage = null;
    websocket.onerror = null;

    // Close the connection
    websocket.close();
    websocket = null;
    alert("Disconnected");
    console.log("Disconnected");
  }
}

function connectEsp32(esp32Urlparam = esp32Url) {
  if (esp32Urlparam === "") {
    return;
  }

  closeConnection();

  // Use the mDNS name of the ESP32
  websocket = new WebSocket(`ws://${esp32Urlparam}/ws`);

  // Handle successful connection
  websocket.onopen = function (event) {
    alert("Connected");
    console.log("WebSocket connection established");
  };

  // Handle errors
  websocket.onerror = function (event) {
    console.log("WebSocket error: ", event);
    alert("Error occurred: " + event);
  };

  // Print & display the data received from esp32
  websocket.onmessage = function (event) {
    var data = event.data;
    displayData(data);
  };

  // Handle disconnection
  websocket.onclose = function (event) {
    console.log("Disconnected!!");
    alert("Disconnected");
  };
}

function displayData(data) {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  msgTillNow += "(" + formattedTime + ")" + "--> " + data + "\n";
  outputPanel.value = msgTillNow;
  if (scrollPressed) {
    outputPanel.scrollTop = outputPanel.scrollHeight; // Scroll to the bottom
  }
}

function saveNewURl() {
  esp32Url = document.getElementById("changeUrlEsp32").value; // Save the new url
  connectEsp32(esp32Url);
}

function sendData(data) {
  websocket.send(JSON.stringify(data));
}
