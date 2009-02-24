var SelectGroup = new Caste
( ArrayRegistry,
 {
 	initialize: function()
 	{
 		ArrayRegistry.prototype.initialize.apply( this )	
 		this.selection = new ArrayRegistry()
 		
 		this.onPurge.listeners.push( this.resetSelected.bind( this, this.registry ) )
 		this.onUnregister.listeners.push( this.resetSelected.bind( this ) )
		this.onRegister.listeners.push( this.registerWithMember.bind( this ) )
		this.onUnregister.listeners.push( this.unregisterFromMember.bind( this ) )
		
		this.selection.onRegister.listeners.push( function( member)
		{
			member.selected.switchOn()
		})
		
		this.selection.onUnregister.listeners.push( function( member)
		{
			member.selected.switchOff()
		})
 	},
 	
 	resetSelected: function( members )
 	{
 		var resets = members.each ? members : [ members ]
 		resets.each( function( member )
 		{
 			this.selection.unregister( member ) 
 		}.bind( this )) 
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

var SelectGroupMember = new Caste
( ArrayRegistry,
 {
	initialize: function()
	{ 	
 		ArrayRegistry.prototype.initialize.apply( this )
 		
 		this.selected = new Switch()
	},
	
	select: function()
	{
		this.registry.each( function( selectGroup )
		{
			selectGroup.selection.purge()
			selectGroup.selection.register( this )
		}.bind( this ))
	},
	
	joinSelection: function()
	{
		this.registry.each( function( selectGroup )
		{
			selectGroup.selection.register( this )
		}.bind( this ))		
	}
})