function(c, a){ // b: [bytecode]]

    //bytecode is memory

    //loc is the instruction in memory to run
    a.b=[a.b.length].concat(a.b)

    //stack is how you cache data on the machine and how computatoin is done
    s=[]

    //push to stack
    function p(x){

	s.push(x)
	
    }


    //pop from stack
    function t(){

	return s.pop()

    }

    while(1){

	//finite state machine based on the current op code

	switch(a.b[0]){
	    
	case 0:

	    //cease the machine by returning the head of the stack

	    return t()
	    
	    break

	case 1:

	    //set memory

	    a.b[t()]=t()

	    break

	case 2:

	    //get memory

	    p(a.b[t()])

	    break

	case 3:
	    
	    //case to run a function that is on the top of the stack with arguments of the
	    //javascript list behind it

	    t().apply(null, cache(t()))

	    break

	case 4:
	    
	    //get the index of an array or the key of an object at pop

	    p(pop[t()])

	    break

	case 5:
	    
	    //subtraction

	    p(t() - t())

	    break

	case 6:

	    //exactly equals

	    p(t() === t())

	    break

	case 7:

	    //not

	    //!0 produces true
	    //!!0 produces false

	    p(!t())

	    break

	case 8:

	    //less than

	    p(t() < t())

	    break


	case 9:

	    //logical if
	    //if statements always deal with a jump
	    //if the statement is true it will do the first jump
	    //or else it will do the second jump
	    //if saveop location saveop 0 jump saveop location saveop 0 jump

	    if(t()){

		a.b[0] +=5

	    }

	    break

	case 10:

	    //push an array

	    p([])

	    break


	case 11:

	    //push empty object

	    p({})

	    break

	case 12:

	    //set the index of an array or the key/value of an object on the stack

	    var x = s.pop()

	    x[s.pop()]=s.pop()

	    p(x)

	    break

	case 13:

	    //turn a string into an array of chars

	    push(pop.split("").map(function(x){return x.charCodeAt(0)}))

	    break

	case 14:

	    //turn of an array of chars into a string

	    push(pop.map(function(x){return String.fromCharCode(x)}).join(""))

	    break

	case 15:

	    //return the length of memory

	    push(a.b.length())

	    break

	}
	
	a.b[0]++

    }
	

 
}


