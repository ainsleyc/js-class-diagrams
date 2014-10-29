$(document).ready(function () {
  $.get('assets/spec.json', function (data) {

    var spec = data;
    var editor = new JSONEditor(document.getElementById("spec"));
    editor.set(spec);

    jcd = new JCD(document.getElementById("specDiagram"));
    jcd.draw(spec);
  });
  $.get('assets/jcd.json', function (data) {

    var spec = data;
    var editor = new JSONEditor(document.getElementById("jcd"));
    editor.set(spec);

    jcd = new JCD(document.getElementById("jcdDiagram"));
    jcd.draw(spec);
  });
});
