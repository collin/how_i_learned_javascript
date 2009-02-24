var Registry = new Caste
({
	initialize: function()
	{
		this.onRegister = new CustomEvent()
		this.onUnregister = new CustomEvent()
		this.onPurge = new CustomEvent()
	},
	
	register: function( member )
	{
		this.add( member )
		this.onRegister.fire( member )
	},
	
	unregister: function( member )
	{
		this.remove( member )
		this.onUnregister.fire( member )
	},
	
	remove: function( member )
	{
		this.registry = this.registry.reject( function( atom ) { 
			return atom == member
		})
	},
	
	purge: function()
	{
		this.registry.each( function( member )
		{
			this.unregister( member )
		}.bind( this ))
		this.onPurge.fire()
	}
})

var SplitRegistry = new Caste
( Registry,
 {
 	initialize: function( splitString )
 	{
 		this.splitString = splitString || ' '
 		Registry.prototype.initialize.apply( this )
 	},
 	
 	register: function( member )
 	{
 		member.split( this.splitString ).compact().each( function( _member )
 		{
 			if ( !this.registry.include( _member ) )
 				Registry.prototype.register.apply( this, [_member] )
 		}.bind( this ))
 	},
 	
 	unregister: function( member )
 	{
 		member.split( this.splitString ).compact().each( function( _member )
 		{
 			if ( this.registry.include( _member) )
 				Registry.prototype.unregister.apply( this, [_member] )
 		}.bind( this ))
 	},
 	
 	remove: function( member )
 	{
 		member.split( this.splitString ).compact().each( function( _member )
 		{
 			Registry.prototype.remove.apply( this, [_member] )
 		}.bind( this ))
 	}
})

var ArrayRegistry = new Caste
( Registry,
 {
	initialize: function()
	{
		Registry.prototype.initialize.apply( this )
		this.registry = []
	},
	
	add: function( member )
	{
		this.registry.push( member )
	}
})

var SplitArrayRegistry = new Caste
( ArrayRegistry, SplitRegistry,
 {
	initialize: function()
	{
		ArrayRegistry.prototype.initialize.apply( this )
		SplitRegistry.prototype.initialize.apply( this )	
	}
})

var Attribute = new Caste
({
	initialize: function( value )
	{
		this.onSet = new CustomEvent()
		this.onGet = new CustomEvent()
		this.set( value )
	},
	
	set: function( value )
	{
		this.value = value || {}
		this.onSet.fire( value )
	},
	
	get: function()
	{
		this.onGet.fire()
		return this.value
	}
})

var Switch = new Caste
({
	initialize: function()
	{
		this.onSwitchOn = new CustomEvent()
		this.onSwitchOff = new CustomEvent()
		this.onToggle = new CustomEvent()
		this.switchOff()
	},
	
	switchOff: function()
	{
		this.is = false
		this.onSwitchOff.fire()
	},
	
	switchOn: function()
	{
		this.is = true
		this.onSwitchOn.fire()
	},
	
	toggle: function()
	{
		if ( this.is )
			this.switchOff()
		else
			this.switchOn()
		
		this.onToggle.fire( this.is )
	}
})