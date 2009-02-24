var CustomEvent = new Caste
({
	initialize: function()
	{
		this.listeners = new Array()
	},
	
	fire: function()
	{
		var args = arguments
		this.listeners.each( function( listener )
		{
			listener.apply( null, args )
		}.bind( this ) )
	},
	
	remove: function( listener )
	{
		this.listeners = this.listeners.reject( function ( aListener ) {
			return listener == aListener
		})
	}
})

var _Event = new Caste
({
	initialize: function(e)
	{
		this.event = e || window.event || null
	},
	
	element: function()
	{
		var targ
		if (this.event.target) targ = this.event.target
		else if (this.event.srcElement) targ = this.event.srcElement
		if (targ.nodeType == 3) // defeat Safari bug
			targ = targ.parentNode
		return targ
	},
	
	type: function()
	{
		return this.event.type
	},
	
	keyCode: function()
	{
		var code
		if (this.event.keyCode) code = this.event.keyCode
		else if (this.event.which) code = this.event.which
		return code
	},
	
	character: function()
	{
		return String.fromCharCode( this.keyCode )
	},
	
	rightClick: function()
	{
		var rightclick
		if (this.event.which) rightclick = (this.event.which == 3)
		else if (this.event.button) rightclick = (this.event.button == 2)
		return rightclick
	},
	
	pointer: function()
	{
		var posx = 0
		var posy = 0
		if (this.event.pageX || this.event.pageY) 	
		{
			posx = this.event.pageX
			posy = this.event.pageY
		}
		else if (this.event.clientX || this.event.clientY) 	
		{
			posx = this.event.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft
			posy = this.event.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop
		}
		return {x: posx, y: posy}
	}
})

$E = function( e )
{
	return new _Event( e || null )
}