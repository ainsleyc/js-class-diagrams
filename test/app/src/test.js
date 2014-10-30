$(document).ready(function () {
  $.get('assets/spec.json', function (data) {

    var spec = data;
    var editor = new JSONEditor(document.getElementById("spec"));
    editor.set(spec);

    jcd = JCD.factory({ 
      "display": document.getElementById("specDiagram")
    });
    jcd.draw(spec);
    jcd.load(spec);
  });
  $.get('assets/jcd.json', function (data) {

    var spec = data;
    var editor = new JSONEditor(document.getElementById("jcd"));
    editor.set(spec);

    jcd = JCD.factory({
      "display": document.getElementById("jcdDiagram")
    });
    jcd.draw(spec);
    jcd.load(spec);
  });
});
