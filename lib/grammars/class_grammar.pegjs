{ 
  function arrayToWord(arr) {
    return flattenArr(arr).join('') 
  }

  function flattenArr(arr) {
    return [].concat.apply([], arr)
  }

  function formatOutput(className, variables, methods) {
    obj = {}
    obj.className = className; 
    obj.variables = flattenArr(variables); 
    obj.methods   = flattenArr(methods);
    return obj; 
  }

  function isBlank(str) { 
    return (/\s+/.test(str) || str === undefined || str === null)
  }
    
}

start 
  = class

class
  = begin:class_begin sep+ name:class_name sep+ vars:variable_declarations* methods:methods* end:class_end { return formatOutput(name, vars, methods) }

class_name
  = name: ([A-Z][a-z]+) { return arrayToWord(name) }

class_begin
  = begin: "class" { return begin }

class_end
  = end: "end" { return end }

variable_declarations
  = vars:(variable_declaration sep+)+  { return flattenArr(vars).filter(isBlank) }

variable_declaration
  = name:[a-zA-Z]+ colon:":" " "+ type:variable_type { return { name: arrayToWord(name), type: type } }

variable_type
  = type: "String" / "Array" / "Hash"

methods
  = methods:(method sep+)+ { return methods.map(function(m) { return arrayToWord(m) }) }

method
  = sign:"+" name:([a-zA-Z0-9]+) { return arrayToWord(name) }

sep 
  = [ ] { return null }


