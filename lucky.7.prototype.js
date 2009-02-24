var Archetype = new Caste
({
	initialize: function()
	{
		this._proto = []
	},
	
	_: function( name )
	{
  		console.log( 'beginning multiple proto seach')
		console.log( 'looking in: ', this, ' for [ ' +name+ ' ]' )
    	
    	var protoList = [ this._proto ],
    		property = null
    	
    	// look up property locally
     	if ( this[ name ] )  
     		return this[ name ]
     	
    	// traverse the proto chains until all reach Archetype
	    console.log( 'beginning lookup loop' )
    	while ( protoList.length > 0 )
	    {
	    	console.log( 'iteration of lookup loop' )
	    	
	        protoList.each( function( _prot )
	        {
	        	_prot.each( function( proto )
	        	{
	        		console.log( 'looking in: ', proto, ' for[ ' +name+ ' ]' )
	        		if ( proto[ name ] )
	        			property = proto[ name ]
	        	})
	        })
	        
	        console.log( 'lookup yielded: ', property )
	        
	        if ( property )
	        	return property
	        	
			console.log( 'lookup faild, bumping up proto chain' )
			
	        protolist = protoList.map( function( _prot )
	        {
	        	if ( _prot._proto )
	        		return _prot._proto
	        })
	        
	        console.log( 'next step in chain: ', protoList )
	    	bort
	    }
	
    	// look up property in Archetype
	    console.log( 'looking in: Archetype')
	    return Archetype[ name ] || null
	}
})

bacon = new Archetype()
color = {white:'#fff'}
bacon._proto.push(color)
foo = new Archetype()
foo._proto.push( bacon )
foo._('white')