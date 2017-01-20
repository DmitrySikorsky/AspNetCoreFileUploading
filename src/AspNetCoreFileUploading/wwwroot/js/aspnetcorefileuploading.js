// Copyright © 2017 Dmitry Sikorsky. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

function submitForm(formId) {
  document.getElementById(formId).submit();
}

function uploadFiles(inputId) {
  var input = document.getElementById(inputId);
  var files = input.files;
  var formData = new FormData();

  for (var i = 0; i != files.length; i++) {
    formData.append("files", files[i]);
  }

  $.ajax(
    {
      url: "/uploader",
      data: formData,
      processData: false,
      contentType: false,
      type: "POST",
      success: function (data) {
        alert("Files Uploaded!");
      }
    }
  );
}

function initializeDragAndDropArea() {
  if (typeof (window["FileReader"]) == "undefined") {
    return;
  }

  var dragAndDropArea = $("#dragAndDropArea");

  if (dragAndDropArea.length == 0) {
    return;
  }

  dragAndDropArea[0].ondragover = function () {
    dragAndDropArea.addClass("drag-and-drop-area-dragging");
    return false;
  };

  dragAndDropArea[0].ondragleave = function () {
    dragAndDropArea.removeClass("drag-and-drop-area-dragging");
    return false;
  };

  dragAndDropArea[0].ondrop = function (event) {
    dragAndDropArea.removeClass("drag-and-drop-area-dragging");

    var formData = new FormData();

    for (var i = 0; i != event.dataTransfer.files.length; i++) {
      formData.append("files", event.dataTransfer.files[i]);
    }

    $.ajax(
      {
        url: "/uploader",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
          alert("Files Uploaded!");
        }
      }
    );

    return false;
  }
}

$(document).ready(
  function () {
    initializeDragAndDropArea();
  }
);