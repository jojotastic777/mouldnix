function(c, a){ // b: [bytecode]]

    //can be used to get the properties of a string    
    //Object.getOwnPropertyNames(String.prototype)

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
    //fundimental object

    
    //load [] from db
    //load {} from db
    //load true from db
    //load false from db
    //undefined can be retrieved by accessing the index of an array
    //that doesn't exist
    //NaN can be retrieved by substracting a number from a string

    //in order to load a javascript object from bytecode onto the stack
    //get the memory at the endex of that object and jump

    //
    

    //m is memory and is populated with bytecode
    var m=a.b

    //m[0] is the instruction in memory to run next.
    //     It must be start higher than this list counts to.
    //m[1] is the state to decide if the machine is running.
    //     If it is set to true then the machine will stop and return.
    //m[2] Is the return value of the machine.
    //m[3] is the store. It is a reliable place to store things like pointers.
    //it starts out as nothing but you should make it an empty object
    //m[4] is String which can be used to convert between strings and integers
    m=[5,1,,,String].concat(m)
    
    //stack is how you cache data on the machine and how computation is done
    s=[]

    //push onto the stack
    var p=x=>s.push(x)

    //take from the stack
    var t=()=>s.pop()

    //turn a pointer into a copy of the pointer's value
    var c=x=>x


    //The loop continues until m[1] is false
    //Then the machine returns m[2]
    while(m[1]){

	//the loop passes over a switch statement making a finite state machine. The switch is based on the m[0]
	switch(m[0]){
	    

	case 1:
	    
	    //Run whatever function is on the stack with the arguments of the list behind it in the stack
	    //javascript list behind it

	    t().apply(null, t())

	    break

	case 2:
	    
	    //get the index of an array or the key of an object

	    //can be used to get "string"["charCodeAt"]()

	    p(t[t()])

	    break

	case 3:
	    
	    //subtraction

	    p(t() - t())

	    break

	case 4:

	    //exactly equals

	    p(t() === t())

	    break

	case 5:

	    //less than
	    //may want to replace with <=

	    p(t() < t())

	    break


	case 6:

	    //logical if
	    //if statements always deal with a jump
	    //if the statement is true it will do the second jump
	    //or else it will do the first jump



	    if(p()){p()
		    p()}


	    break

	case 7:

	    //set the index of an array or the key/value of an object on the stack

	    var x = t()

	    x[t()]=t()

	    p(x)

	    break


	case 8:
	    
	    //push a pointer to memory onto the stack
	    
	    //can be used to get something from memory
	    //can be used to set something in memory
	    //can be used to return the length of memory

	    p(m)

	    break

	case 9:

	    //push the next op onto the stack
	    //necessary for pushing args onto the stack to begin with

	    p(m[m[0]])

	    m[0]++

	case 10:

	    //turn a reference into a copy of that reference

	    p(c(t()))

	    

	}
	
	m[0]++

    }
	
    return m[2]
 
}
