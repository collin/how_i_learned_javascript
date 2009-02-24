var Connector = new new Caste // Singleton
({
	initialize: function()
	{
		this.connections = new HashRegistry()
	}
})()

var JavaScript = new ElementCaste
({
	tag: 'script'
 },
 {
 	initialize: function( src )
 	{
 		this.setSource( src )
 		this.readyState = new Attribute( false )
 		
 		this.stamp = new Date().getTime()
 		
 		this.readyStateListener = this.cleanUp.bind( this )
 		this.readyState.onSet.listeners.register( this.readyStateListener )
 	},
 	
 	setSource: function( src )
 	{
 		this.src = src + '?' + this.stamp
 		document.body.appendChild( this )
 	},
 	
 	cleanUp: function()
 	{
 		if ( this.readyState.get() = true )
	 	{
	 		document.body.removeChild( this )
	 		delete this
	 	}
 	}
})

var Connection = new Caste
({
	
})