var Canvas = new ElementCaste
( {
	tag: 'canvas'
  },
	
  {
	initialize: function()
	{
		this.turtle = this.getContext('2d')	
	},
	
	empty: function()
	{
		this.turtle.clearRect( 0, 0, this.width, this.height )
	},
	
	fill: function( color )
	{
		this.fillStyle = color.toRGB()
		this.turtle.fillRect( 0, 0, this.width, this.height )
	}
} )

var Line = new ElementCaste
( {
	inheritance: [Canvas]
  },
  
  {
	initialize: function( origin, conclusion )
	{
		this.origin = origin
		this.conclusion = conclusion
		Canvas.prototype.initialize.apply( this )
		this.style.position = 'absolute'
		this.drawLine()
	},
	
	drawLine: function()
	{			
		this.inversion()
			
		var begin = this.begin()
		var end = this.end()

		this.fixCanvas( end )
		
		this.turtle.beginPath()			
		this.turtle.moveTo( begin.x, begin.y )
		this.turtle.lineTo( end.x, end.y )
		this.turtle.closePath()
		this.turtle.stroke()
	},
	
	inversion: function()
  	{
  		this._origin = this.origin
  		this._conclusion = this.conclusion
  		if ( this.origin.x > this.conclusion.x )
  		{
  			this._origin = this.conclusion
  			this._conclusion = this.origin
  		}
  	},
	
	set: function( point, coord )
	{
		coord.y ? this[point].y = coord.y : null
		coord.x ? this[point].x = coord.x : null
		this.drawLine()
	},
	
	begin: function()
	{
		var y = this._origin.y > this._conclusion.y ? this._origin.y : 0
		return { x: 0, y: y }
	},
	
	end: function()
	{
		var x = this._conclusion.x - this._origin.x,
		    y = this._conclusion.y - this._origin.y
		if ( this._origin.y > this._conclusion.y )
			y = this._conclusion.y

		return { x:x, y:y }
	},
	
	fixCanvas: function( end )
	{
		var top = this._origin.y,
			left = this._origin.x
			
		if ( this._origin.y > this._conclusion.y )
			top = 0
		
		this.setStyle
		({
			top: top,
			left: left
		})
		
		if ( this._origin.y > this._conclusion.y )
		{
			this.height = this._origin.y
			this.width = this._conclusion.x - this._origin.x
		}
		else
		{
			this.height = this._conclusion.y - this._origin.y
			this.width = this._conclusion.x - this._origin.x
		}
	}
} )