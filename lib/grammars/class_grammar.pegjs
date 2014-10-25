{ 
  function arrayToWord(arr) {
    return [].concat.apply([], arr).join('') 
  }

  function formatOutput(className, variables, methods) {
    obj = {}
    obj.className = className; 
    obj.variables = variables; 
    obj.methods   = methods;
    return obj; 
  }
    
}

start 
  = class

class
  = begin:class_begin sep+ name:class_name sep+ variable:(variable_declaration sep+)* methods:(method_name sep+)* end:class_end { return formatOutput(name, variable, methods) }

class_name
  = name: ([A-Z][a-z]+) { return arrayToWord(name) }

class_begin
  = begin: "class" { return begin }

class_end
  = end: "end" { return end }

variable_declaration
  = name:[a-zA-Z]+ colon:":" " "+ type:variable_type { return arrayToWord(name) }

variable_type
  = type: "String" / "Array" / "Hash"

method_name
  = sign:"+" name:([a-zA-Z0-9]+) { return arrayToWord(name) }

sep 
  = [ ] { return null }


