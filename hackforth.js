function(c,a){

    var next_words=[]
    var stack=[]
    var dictionary={}
    var return_value
    var machine=(x)=>{
	//	console.log("x")
	console.log(x)
	switch(x){




	case "dup":

	    var x = stack.pop()
	    stack.push(x)
	    stack.push(x)
	    break

	case "swap":
	    var x=stack.pop()
	    var y=stack.pop()
	    stack.push(x)
	    stack.push(y)
	    break

	case "rot":
	    var x=stack.pop()
	    var y=stack.pop()
	    var z=stack.pop()
	    stack.push(y)
	    stack.push(x)
	    stack.push(z)
	    break

	case "over":
	    var x=stack.pop()
	    var y=stack.pop()
	    stack.push(y)
	    stack.push(x)
	    stack.push(y)
	    break
	    

	case "-":
	    stack.push(stack.pop() - stack.pop())
	    break

	case "*":
	    stack.push(stack.pop() * stack.pop())
	    break

	case "/":
	    stack.push(stack.pop() / stack.pop())
	    break

	case "mod":
	    stack.push(stack.pop() % stack.pop())
	    break

	case "not":
	    stack.push(!stack.pop())
	    break

	case "or":
	    x=stack.pop()
	    var y=stack.pop()
	    stack.push(x || y)
	    
	    break

	case "drop":
	    stack.pop()
	    break

	case "next-word":

	    if(next_words.length === 0 && a.code.length !== 0){
		var next_letter=a.code.slice(0,1)
		var next_word=next_letter
		a.code=a.code.slice(1,a.code.length)
		while(next_letter !== " " && next_letter !== "\n" && a.code.length !== 0){
		    next_letter=a.code.slice(0,1)
		    if(next_letter !== " " && next_letter !== "\n" && a.code.length !== 0){
			next_word=next_word.concat(next_letter)}

		    a.code=a.code.slice(1,a.code.length)
		}
		stack.push(next_word)
	    }
	    else{

		if(next_words.length === 0 && a.code.length === 0){

		    //assume that tne next word is on the stack

		}

		else{

		    stack.push(next_words.pop())


		}
	    }

	    break

	case "eval":
	    machine("next-word")
	    machine(stack.pop())

	    break

	case "{}":
	    stack.push({})
	    break

	case "[]":
	    stack.push([])
	    break
	    

	case "get-subobject":

	    stack.push(stack.pop()[stack.pop()])

	    break

	case "set-subobject":

	    stack.pop()[stack.pop()]=stack.pop()

	    break

	case "hard-copy":

	    stack.push((function(obj) {
		var copy
		if (null == obj || "object" != typeof obj) return obj
		if (obj instanceof Array) {
		    return obj.slice(0,obj.length)
		}
		if (obj instanceof Object) {
		    copy = {}
		    for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr])
		    }
		    return copy
		}})(stack.pop()))
	    break

	case "run-function":

	    stack.pop()()

	    break

	case "=":

	    stack.push(stack.pop() === stack.pop())
	    break

	case "<":

	    stack.push(stack.pop() < stack.pop())
	    break

	    //case "string":

	    //    machine("next-word")

	    //    break

	case "until2":
	    //goto2
//	    console.log("goodbye")
//	    console.log(stack)
	    if(stack.pop()){
		console.log("hello")
		machine("next-word")
		machine("dup")
		next_words.push(stack.pop())
		next_words.push("until2")
		next_words=next_words.concat(dictionary[stack.pop()])
	    }
	    else{
		next_words.pop()
	    }

	    break

	case "until":


	    stack.push(true)
	    next_words.push("until2")



	    break
	

	case "if":


	    //this instruction causes infinite recursion
	    //machine("eval")

	    // we do this instead
	    machine("next-word")

	    x=stack.pop()

	    
	    if(stack.pop()){

		
		if(dictionary[x]){


		    next_words=next_words.concat(dictionary[x])



		}
	    }

	    
	    break


	case ":":

	    machine("next-word")

	    var name = stack.pop()

	    var definition=[]

	    machine("next-word")

	    machine("dup")

	    while(stack.pop() !== ";"){

		machine("dup")

		if(parseInt(stack.pop())){
		    stack.push(parseInt(stack.pop()))
		}

		definition.push(stack.pop())

		machine("next-word")

		machine("dup")

	    }

	    dictionary[name]=definition.reverse()

	    stack.pop()

	    break

	case "hackmud-data":

	    stack.push({c,a})

	    break

	case "return":

	    return_value=stack.pop()

	    break

	case "concat":

	    stack.push(stack.pop().concat(stack.pop()))

	    break

	case "space":

	    stack.push(" ")

	    break

	case "next-letter":

	    stack.push(a.code.slice(0,1))
	    a.code=a.code.slice(1,a.code.length)

	    break

	case "save":
	    dictionary[stack.pop()]=[stack.pop()]
	    break

	default:

	    if(dictionary[x]){

		next_words=next_words.concat(dictionary[x])



	    }
//cant parseInt here because it may be a string
	    else{

		stack.push(x)
		    
	    }




	    break


	}


    }

    counter=0

    while(!(a.code.length == 0 && next_words.length == 0) && !return_value && counter !== -1){
	machine("eval")
	counter++

    }
    console.log("stack")
    console.log(stack)


    return return_value



}
