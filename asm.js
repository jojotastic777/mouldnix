function(c, a){ // b: [bytecode]]

    //bytecode is memory

    //loc is the instruction in memory to run
    l=0

    //stack is how you cache data on the machine and how computatoin is done
    s=[]

    //push to stack
    function p(x){

	s.push(x)
	
    }


    //pop from stack
    function pop(){

	return s.pop()

    }

    while(true){

	//finite state machine based on the current op code

	switch(a.b[l]){
	    
	case 0:

	    //cease the machine by returning the head of the stack

	    return t()
	    
	    break

	case 1:

	    //case to push the next op code onto the stack
	    //useful if you want to use an object from args

	    l++

	    p(a.b[l])

	    break

	case 2:

	    //set memory

	    a.b[t()]=t()

	    break

	case 3:

	    //get memory

	    p(a.b[t()])

	    break

	case 4:
	    
	    //case to run a function that is on the top of the stack with arguments of the
	    //javascript list behind it

	    t().apply(null, cache(t()))

	    break

	case 5:
	    
	    //get the index of an array or the key of an object at pop

	    p(pop[t()])
	    


	    break

	case 6:

	    //addition

	    p(pop + t())

	    break
	    
	case 7:
	    
	    //subtraction

	    p(t() - t())

	    break

	case 8:
	    
	    //division

	    p(t() / t())

	    break

	case 9:
	    
	    //modulus
	    
	    p(t() % t())

	    break

	case 10:

	    //string equals

	    p(t() == t())

	    break

	case 11:

	    //exactly equals

	    p(t() === t())

	    break

	case 12:

	    //not

	    p(!t())

	    break

	case 13:

	    //less than

	    p(t() < t())

	    break

	case 14:

	    //logical and

	    p(t() && t())

	    break

	case 15:

	    //logical or

	    p(t() || t())

	case 16:

	    //logical if
	    //may need revision. if is supposed to work by jumping

	    if(t()){

		t()
		
	    }

	    else{

		var x = t()

		t()

		p(x)

	    }

	    break

	case 17:

	    //push an array

	    p([])

	    break

	case 18:

	    //push true
	    //false can be obtained through not true

	    p(true)

	    break

	case 19:

	    //push empty object

	    p({})

	    break

	case 20:

	    //set the index of an array or the key/value of an object on the stack

	    var x = s.pop()

	    x[s.pop()]=s.pop()

	    p(x)

	    break

	case 21:

	    //jump

	    l=t()

	    break

	case 22:

	    //turn a string into an array of chars

	    push(pop.split("").map(function(value){return value.charCodeAt(0)}))

	    break


	case 23:

	    //turn of an array of chars into a string

	    push(pop.map(function(value){return String.fromCharCode(value)}).join(""))

	    break

	case 24:

	    //return the length of memory

	    push(a.b.length())

	    break


	}
	
	l++

    }
	
	    	    	    



 
}
