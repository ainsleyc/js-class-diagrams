
describe 'Parser', ->

  describe 'Basic Tests', ->
    parser  = new JCD.Parser(classGrammar)

    it 'should get class name correctly', ->
      test_string = "class Stuff end"
      output      = parser.parse(test_string)
      klass       = output.classes[0]
      expect(klass.className).to.equal('Stuff')

    it 'should get correct number of variables', ->
      test_string = "class Stuff thing: String otherthing: Array end"
      output      = parser.parse(test_string)
      klass       = output.classes[0]
      expect(klass.variables.length).to.equal(2)

    it 'should get correct number of methods', ->
      test_string = "class Stuff +func1 +func2 end"
      output      = parser.parse(test_string)
      klass       = output.classes[0]
      expect(klass.methods.length).to.equal(2)

    
    it 'should get the name, variables, and methods correctly', ->
      test_string = "class Stuff x_1: String y_2: Hash three: Array +func1 +func2 +func3 end"
      output      = parser.parse(test_string)
      klass       = output.classes[0]
      expect(klass.className).to.equal('Stuff')
      expect(klass.variables.length).to.equal(3)
      expect(klass.methods.length).to.equal(3)

    it 'should get multiple classes correctly', ->
      first_class  = "class Stuff1 one: String two: Hash three: Array +func1 +func2 +func3 end"
      second_class = "class Stuff2 one: Hash two: Array +func_yx +func_y end"
      test_string  = first_class + " " + second_class
      output       = parser.parse(test_string)
      klass        = output.classes[0]
      expect(klass.className).to.equal('Stuff1')
      expect(klass.variables.length).to.equal(3)
      expect(klass.methods.length).to.equal(3)
      klass       = output.classes[1]
      expect(klass.className).to.equal('Stuff2')
      expect(klass.variables.length).to.equal(2)
      expect(klass.methods.length).to.equal(2)

    it 'should parse assocation correctly', ->
      test_string = 'Stuff1 inherits Stuff2'
      output      = parser.parse(test_string)
      assoc       = output.associations[0]
      expect(assoc.firstClass).to.equal('Stuff1')
      expect(assoc.secondClass).to.equal('Stuff2')
      expect(assoc.relationship).to.equal('inherits')

    it 'should parse assocation correctly', ->
      test_string = 'Stuff1 aggregates Stuff2'
      output      = parser.parse(test_string)
      assoc       = output.associations[0]
      expect(assoc.firstClass).to.equal('Stuff1')
      expect(assoc.secondClass).to.equal('Stuff2')
      expect(assoc.relationship).to.equal('aggregates')


    it 'should parse class and association', ->
      test_string  = "class Stuff1 one: String two: Hash three: Array +func1 +func2 +func3 end Stuff1 inherits Stuff2"
      output       = parser.parse(test_string)
      klass        = output.classes[0]
      assoc        = output.associations[0]
      expect(klass.className).to.equal('Stuff1')
      expect(klass.variables.length).to.equal(3)
      expect(klass.methods.length).to.equal(3)
      expect(assoc.firstClass).to.equal('Stuff1')
      expect(assoc.secondClass).to.equal('Stuff2')
      expect(assoc.relationship).to.equal('inherits')

