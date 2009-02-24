var DragGroup = new Caste
( RadioGroupMember,
 {
	initialize: function()
	{
		RadioGroupMember.prototype.initialize.apply( this )
		DDManager.dragGroups.register( this )
		
		this.members = new SelectGroup()	
	}
})

var DDManager = new new Caste // Singleton
( MouseWatcher,
 {
	initialize: function()
	{
		MouseWatcher.prototype.initialize.apply( this )
		
		this.dragGroups = new RadioGroup()
		
		this.onDragStart = new CustomEvent()
		this.onDrag = new CustomEvent()
		this.onDragEnd = new CustomEvent()
		
		this.watching.switchOff()
		
		this.onMouseMove.listeners.push( this.drag.bindAsEventListener( this ) )
	},
	
	dragPrep: function( event, prepped )
	{
		if ( event.event.shiftKey )
			prepped.joinSelection()
		else
			if ( !prepped.selected.is )
				prepped.select()
		
		this.wait = setTimeout( this.dragStart.bind( this ), 300 )
		
		this.watching.switchOn()
		
		this.startX = event.pointer().x
		this.startY = event.pointer().y
		
		this.dragGroups.current.get().members.selection.registry.each( function( draggable )
		{
				draggable.onDragPrep.fire( event )	
		})
	},
	
	dragStart: function()
	{
		this.started = true
		document.body.style.cursor = 'move'
	
		this.onDragStart.fire()
		this.dragGroups.current.get().members.selection.registry.each( function( draggable )
		{
			draggable.onDragStart.fire()	
		})
	},
	
	drag: function( event )
	{
		this.wait = clearTimeout( this.wait )
		if ( !this.started ) 
		{
			this.dragStart()
		}
		
		this.onDrag.fire( event )
		this.dragGroups.current.get().members.selection.registry.each( function( draggable )
		{
			draggable.onDrag.fire( event )	
		})
	},
	
	dragEnd: function( event )
	{
		
		this.wait = clearTimeout( this.wait )
		this.started = false
		this.watching.switchOff()
		
		this.dragGroups.current.get().members.selection.registry.each( function( draggable )
		{
			draggable.onDragEnd.fire( event )	
		})
	}
})()


var DragGroupMember = new Caste
( SelectGroupMember,
 {
  	initialize: function()
	{
		SelectGroupMember.prototype.initialize.apply( this )
		
		this.onDragStart = new CustomEvent()
		this.onDragEnd = new CustomEvent()
		this.onDrag = new CustomEvent()
		this.onDragPrep = new CustomEvent()
	}
})

var Repositionable = new Caste
( Clickable, DragGroupMember,
 {
  	initialize: function()
	{
		Clickable.prototype.initialize.apply( this )
		DragGroupMember.prototype.initialize.apply( this )
	},
	
	prep: function( event )
	{
		this.mouseDownable.switchOff()
		this.mouseUppable.switchOn()
		
		this.elStartX = Number( this.style.left.replace('px','') )
		this.elStartY = Number( this.style.top.replace('px','') )
	},
	
	end: function( event )
	{
		this.mouseUppable.switchOff()
		this.mouseDownable.switchOn()
	
		document.body.style.cursor = 'default'
	},
	
	reposition: function( event )
	{
		var top = event.pointer().y,
			left = event.pointer().x
			
		this.wait = clearTimeout( this.wait )
		if ( !this.started ) this.dragStart()
		var position = 
		{
			top: this.elStartY + ( top - DDManager.startY ) + 'px',
			left: this.elStartX + ( left - DDManager.startX )  + 'px'
		}
		this.setStyle( position )
	}
})