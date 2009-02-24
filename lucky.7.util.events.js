/* 
 * The icky realm of global events. :D
 */
document.mouseUp = new CustomEvent()
document.onmouseup = document.mouseUp.fire.bind( document.mouseUp )

window.onLoad = new CustomEvent()
window.onload = window.onLoad.fire.bind( window.onLoad )
// End of those icky global evests :D

var Clickable = new Caste
({
	initialize: function()
	{
		this.clickable = new Switch()
		this.mouseDownable = new Switch()
		this.mouseUppable = new Switch()
		
		this.onClick = new CustomEvent()
		this.onMouseDown = new CustomEvent()
		this.onMouseUp = new CustomEvent()
		
		this.mouseUpListener = this.onMouseUp.fire.bind( this.onMouseUp )
		
		this.clickable.onSwitchOn.listeners.push( this.makeClickable.bind( this ) )
		this.clickable.onSwitchOff.listeners.push( this.unmakeClickable.bind( this ) )
				
		this.mouseDownable.onSwitchOn.listeners.push( this.makeMouseDownable.bind( this ) )
		this.mouseDownable.onSwitchOff.listeners.push( this.unmakeMouseDownable.bind( this ) )		
		
		this.mouseUppable.onSwitchOn.listeners.push( this.makeMouseUppable.bind( this ) )
		this.mouseUppable.onSwitchOff.listeners.push( this.unmakeMouseUppable.bind( this ) )
	},
	
	makeClickable: function()
	{
		this.onclick = this.onClick.fire.bind( this.onClick )
	},
	
	unmakeClickable: function()
	{
		this.onclick = null
	},
	
	makeMouseDownable: function()
	{
		this.onmousedown = this.onMouseDown.fire.bind( this.onMouseDown )
	},
	
	unmakeMouseDownable: function()
	{
		this.onmousedown = null
	},
	
	makeMouseUppable: function()
	{
		document.mouseUp.listeners.push( this.mouseUpListener )
		this.onmouseup = this.mouseUpListener
	},
	
	unmakeMouseUppable: function()
	{
		document.mouseUp.remove( this.mouseUpListener )
		this.onmouseup = null
	}
})

var Hoverable = new Caste
({
	initialize: function()
	{
		this.hoverable = new Switch()
		
		this.onHover = new CustomEvent()
		this.onUnhover = new CustomEvent()
		
		this.hoverable.onSwitchOn.listeners.push( this.makeHoverable.bind( this ) )
		this.hoverable.onSwitchOff.listeners.push( this.unmakeHoverable.bind( this ) )
	},
	
	makeHoverable: function()
	{
		this.onmouseover = this.onHover.bind( this.onHover )
	},
	
	unmakeHoverable: function()
	{
		this.onmouseout = null
	}
})

var DblClickable = new Caste
({
	initialize: function()
	{
		this.dblClickable = new Switch()
		
		this.onDblClick = new CustomEvent()
		
		this.dblClickable.onSwitchOn.listeners.push( this.makeDblClickable.bind( this ) )
		this.dblClickable.onSwitchOff.listeners.push( this.unmakeDblClickable.bind( this ) )
	},
	
	makeDblClickable: function()
	{
		this.ondblclick = this.onDblClick.fire.bind( this.onDblClick )
	},
	
	unmakeDblClickable: function()
	{
		this.ondblclick = null
	}
})

var MouseWatcher = new Caste
({
	initialize: function()
	{
		this.watching = new Switch()
		
		this.onMouseMove = new CustomEvent()

		this.watching.onSwitchOn.listeners.push( this.startWatching.bind( this ) )
		this.watching.onSwitchOff.listeners.push( this.stopWatching.bind( this ) )
	},
	
	startWatching: function()
	{
		document.onmousemove = this.onMouseMove.fire.bind( this.onMouseMove )
	},
	
	stopWatching: function()
	{
		document.onmousemove = null
	}
})