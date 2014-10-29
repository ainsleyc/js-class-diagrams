$(document).ready(function () {
  $.get('assets/spec.json', function (data) {

    var spec = data;
    var editor = new JSONEditor(document.getElementById("spec"));
    editor.set(spec);

    jcd = new JCD(document.getElementById("specDiagram"));
    jcd.draw(spec);
  });
});
