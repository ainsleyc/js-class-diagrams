{
  var _ = require('underscore');

  function arrayToWord(arr) {
    return _.flatten(arr).join('')
  }

  function formatClass(className, variables, methods) {
    obj = {}
    obj.className = className;
    obj.variables = _.compact(_.flatten(variables));
    obj.methods   = _.flatten(methods);
    obj.type      = 'class'
    return obj;
  }

  function formatAssociation(klass1, klass2, relationship) { 
    obj = {}
    obj.firstClass   = klass1; 
    obj.secondClass  = klass2; 
    obj.relationship = relationship;
    obj.type         = 'association';
    return obj; 
  }

  function formatDoc(primaries) {
    obj = {}; 
    obj.classes      = [];
    obj.associations = []; 

    _.each(primaries, function(p) {
      if (p.type == 'class') { obj.classes.push(p) }
      else if (p.type == 'association') { obj.associations.push(p) }
      else { throw "Type doesn't exist!" }
    });

    return obj;
  }
}

start
  = document

document
  = primaries:(primary (sep+ primary)*) { return formatDoc(_.compact(_.flatten((primaries))))  }

primary
  = c:class / a:association 

// ASSOCIATIONS
association
  = klass1:class_name sep+ relationship:relationship sep+ klass2:class_name { return formatAssociation(klass1, klass2, relationship) }

relationship
  = type: "inherits" / "composites" / "aggregates"


// CLASSES
class
  = begin:class_begin sep+ name:class_name sep+ vars:variable_declarations* methods:methods* end:class_end { return formatClass(name, vars, methods) }

class_name
  = name: ([A-Z][a-z0-9]+) { return arrayToWord(name) }

class_begin
  = begin: "class" { return begin }

class_end
  = end: "end" { return end }


// VARIABLES
variable_declarations
  = vars:(variable_declaration sep+)+  { return _.compact(vars) }

variable_declaration
  = name:[a-zA-Z_0-9]+ colon:":" " "+ type:variable_type { return { name: arrayToWord(name), type: type } }

variable_type
  = type: "String" / "Array" / "Hash"


// METHODS
methods
  = methods:(method sep+)+ { return methods.map(function(m) { return arrayToWord(m) }) }

method
  = sign:"+" name:([a-zA-Z0-9_]+) { return arrayToWord(name) }


// AUXILLARY
sep
  = [ \t\r\n] { return null }


