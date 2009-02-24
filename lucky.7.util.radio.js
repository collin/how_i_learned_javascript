var RadioGroup = new Caste
( ArrayRegistry,
 {
	initialize: function()
	{
		ArrayRegistry.prototype.initialize.apply( this )
		this.current = new Attribute( null )
		
		this.current.onSet.listeners.push( this.clear.bind( this ) )
		this.onRegister.listeners.push( this.registerWithMember.bind( this ) )
		this.onUnregister.listeners.push( this.unregisterFromMember.bind( this ) )
	},
	
	clear: function()
	{
		this.registry.each( function( groupMember )
		{
			groupMember.selected.switchOff()
		})
	},
	
	registerWithMember: function( member )
	{
		member.register( this )
	},
	
	unregisterFromMember: function( member )
	{
		member.unregister( this )
	}
})

var RadioGroupMember = new Caste
( ArrayRegistry,
 {
 	initialize: function()
 	{
 		ArrayRegistry.prototype.initialize.apply( this )
 		
 		this.selected = new Switch()
 	},
 	
 	select: function()
 	{
 		this.registry.each( function( radioGroup )
 		{
 			radioGroup.current.set( this )
 		})
 		this.selected.switchOn()
 	}
})