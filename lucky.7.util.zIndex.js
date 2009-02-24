var zIndexer = new Caste
( Registry,
 {
	initialize: function()
	{
		Registry.prototype.initialize.apply( this )
		this.onRegister.listeners.push( this.draw )
		this.onUnregister.listeners.push( this.draw )
		this.onDraw = new CustomEvent()
	},
	
	draw: function()
	{
		this.registry.each( function( indexed, index ) { 
			indexed.style.zIndex = index
		})
		this.onDraw.fire()
	}
})
window.zIndex = new zIndexer()

var zIndexed = new Caste
({
	initialize: function( somezIndex )
	{
		this._zIndex = somezIndex || document.zIndex
		this._zIndex.register( this )
		
		this.onMoveUp = new CustomEvent()
		this.onMoveDown = new CustomEvent()
		this.onMoveToTop = new CustomEvent()
		this.onMoveToBottom = new CustomEvent()
	},
	
	zIndex: function( what )
	{
		this[ what ]()
		this.zIndex.draw()	
	},
	
	moveUp: function()
	{
		if ( this._zIndex.registry.length > 1 )
		{
			var index = this._zIndex.registry.index( this )
			this._zIndex.remove( this )
			this._zIndex.splice( index + 1, 0, this )
		}
		this.onMoveUp.fire()
	},
	
	moveDown: function()
	{
		if ( this._zIndex.registry.length > 1 )
		{
			var index = this._zIndex.registry.index( this )
			this._zIndex.remove( this )
			this._zIndex.splice( index - 1, 0, this )
		}
		this.onMoveDown.fire()
	},
	
	moveToTop: function()
	{
		this._zIndex.remove( this )
		this._zIndex.push( this )
		this.onMoveToTop.fire()
	},
	
	moveToBottom: function()
	{
		this._zIndex.remove( this )
		this._zIndex.unShift( this )	
		this.onMoveToBottom.fire()
	}
})