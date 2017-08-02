function(c, a){ // help: "help"
    
    if(a.w){
	function w(s){

	    s=s.replace(/ /g, "1").replace(/	/g, "0").match(/.{1,7}/g).join(" ")
	    
	    var n = s.split(" ");
	    var b = [];
	    
	    for (var i = 0; i < n.length; i++) {
		b.push(String.fromCharCode(parseInt(n[i], 2)));
	    }
	    return b.join("");
	    
	}
	return w(a.w)
    }
    if(a.help){
	
	var s="\n\nTo convert whitespace to a string use:\n\n"
	s=s.concat("dorothy.wayneright{ w: \"your whitespace string\" }\n\n")
	s=s.concat("The return value of the script will be:\n\n")
	s=s.concat("{string: \"your string\"}\n\n")
	s=s.concat("To convert a string to white space check out this google docs: \n\n")
	s=s.concat("https:/")
	s=s.concat("/docs.google.com/document/d/1ibnqvweuxSV1ZY7QO5RPPDO-onqv5zRWUhSeSOUXInA/edit?usp=sharing")
	
	return s
    }
}
