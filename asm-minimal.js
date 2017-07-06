function(c, a){ // b: [bytecode]]


    //bytecode is memory
    var m=a.b
    
    //loc is the instruction in memory to run
    //    m=[m.length,[],{}].concat(m)
    //load [] from lib
    //load {} from lib
    //load true from lib
    //load false from lib
    m=[3,1,0].concat(m)
    
    //stack is how you cache data on the machine and how computatoin is done
    s=[]

    var p=x=>s.push(x)

    var t=()=>s.pop()
    
    while(m[1]){
	
	switch(m[0]){
	    
	case 0:
	    
	    //set memory
	    
	    m[t()]=t()

	    break

	case 1:

	    //get memory

	    p(m[t()])

	    break

	case 2:
	    
	    //case to run a function that is on the top of the stack with arguments of the
	    //javascript list behind it

	    t().apply(null, cache(t()))

	    break

	case 3:
	    
	    //get the index of an array or the key of an object at pop

	    p(t[t()])

	    break

	case 4:
	    
	    //subtraction

	    p(t() - t())

	    break

	case 5:

	    //exactly equals

	    p(t() === t())

	    break

	case 6:

	    //less than
	    //may want to replace with <=

	    p(t() < t())

	    break


	case 7:

	    //logical if
	    //if statements always deal with a jump
	    //if the statement is true it will do the first jump
	    //or else it will do the second jump
	    //if saveop location saveop 0 jump saveop location saveop 0 jump

	    p()&&(m[0]+=5)


	    break

	case 8:

	    //set the index of an array or the key/value of an object on the stack

	    var x = t()

	    x[t()]=t()

	    p(x)

	    break

	case 9:

	    //turn a char into an int

	    p(t(charCodeAt()))

	    break

	case 10:

	    //turn an int into a char

	    p(String.fromCharCode(t()))

	    break

	case 11:

	    //return the length of memory

	    p(m.length)

	    break

	case 12:

	    p(#db.i(t()))

	    break

	case 13:

	    p(#db.f(t()).first())

	    break

	}
	
	m[0]++

    }
	
    return m[2]
 
}
