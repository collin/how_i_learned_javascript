
var Line = new ElementCaste
({
	tag: 'v:line'
 },
 {
 	initialize: function( origin, conclusion, options )
 	{ 
 		this.strokecolor = new Color('000').toRGB()
 		this.strokeweight = '30'

 		this.origin = origin || this.origin || {x:0,y:0}
 		this.conclusion = conclusion || this.conclusion || {x:0,y:0}
 		
 		this.style.position = 'absolute'
 		this.style.backgroundColor = '#fcc'
 		
 		document.body.appendChild( this )
 	},
 	
 	length: function()
 	{
 		return Math.distance( this.origin, this.conclusion )
 	},
 	
 	set: function( end, coords )
 	{
 		coords.x ? this[ end ].x = coords.x : null
 		coords.y ? this[ end ].y = coords.y : null
 		this.drawLine()
 	},
 	
 	drawLine: function()
	{			
		this.inversion()
		

 		this.from = this.begin().x +', '+ this.begin().y
 		
		this.to   = this.end().x   +', '+ this.end().y 
				
		this.fixCanvas()
	},
	
	inversion: function()
  	{
  		this.inverted = false
  		this._origin = this.origin
  		this._conclusion = this.conclusion
  		if ( this.origin.x > this.conclusion.x )
  		{
  			this.inverted = true
  			this._origin = this.conclusion
  			this._conclusion = this.origin
  		}
  	},
  	
	begin: function()
	{
		var padding = this.padding(),
			y = this._origin.y > this._conclusion.y ? this._origin.y + padding.height : 0 + padding.height
		
		return { x: 0 + padding.width, y: y }
	},
		
	end: function()
	{
		var padding = this.padding(),
			x = this._conclusion.x - this._origin.x,
		    y = this._conclusion.y - this._origin.y + padding.height
	
		if ( this._origin.y > this._conclusion.y )
		{
			y = this._conclusion.y
			if ( this.inverted )
				y = y + padding.height
		}
		
		if ( !this.inverted && this._origin.x < this._conclusion.x && this._origin.y > this._conclusion.y )
			y = y + (padding.height)
		
		return { x: x + padding.width, y: y }
	},
	
	padding: function()
	{
		var width = this._conclusion.x - this._origin.x,
			height = this._conclusion.y - this._origin.y,
			strokeWidth = this.getAttribute( 'stroke-width' ),
			angleA = Math.acos( width / this.length() ),
			angleB = Math.asin( width / this.length() ),
			heightX = Math.round( Math.sin( angleB ) * ( strokeWidth / 2 ) )
			widthX  = Math.round( Math.sin( angleA ) * ( strokeWidth / 2 ) )			
	
		return {
				   height: heightX,
				   width: widthX
			   }
	},
	
	fixCanvas: function()
	{
		var top = this._origin.y,
			left = this._origin.x,
			height = Math.abs( this._conclusion.y - this._origin.y ),
			width = this._conclusion.x - this._origin.x,
			padding = this.padding()
		
		if ( this._origin.y > this._conclusion.y)
		{
			top = 0
		}
			
		this.setStyle
		({
			top: top -padding.height +'px',
			left: left -padding.width +'px',
			width: width + (padding.width*2),
			height: height + (padding.height*2)
		})
	}
})