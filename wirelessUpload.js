document
  .getElementById("upload_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var form = document.getElementById("upload_form");
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", `http://${esp32Url}/updateCode`, true);

    xhr.upload.addEventListener(
      "progress",
      function (evt) {
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          document.getElementById("prg").textContent =
            "progress: " + Math.round(percentComplete * 100) + "%";
        }
      },
      false
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("success!");
      }
    };

    xhr.send(formData);
  });
  document.getElementById("upload_form").addEventListener("submit", function (event) {
    event.preventDefault();
    var fileInput = document.getElementById("file_input");
    var file = fileInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var arrayBuffer = reader.result;
        var byteArray = new Uint8Array(arrayBuffer);
        socket.send(byteArray);
      };
      reader.readAsArrayBuffer(file);
    }
  });