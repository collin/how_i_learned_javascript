SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

var SvgElement = new ElementCaste
({
	tag: 'svg',
	xmlns: SVG_NAMESPACE
 },
 {
	initialize: function()
	{
	    this.setAttributes
	    ({ 	
	    	version: '1.1',
	     	baseProfile: 'full',
	     	width: '100%',
	     	height: '100%'
		})
     	this.style.position = 'absolute'
	}
})

var GElement = new ElementCaste
({
	tag: 'g',
	inheritance: [ SvgElement ]
 },
 {
 	initialize: function()
 	{
 	}
})

var Shape = new Caste
({
	inheritance: []
 },
 {
	initialize: function( shape )
	{
		this.svg = new SvgElement()
		this.g = new GElement()
		this.svg.appendChild( this.g )
		this.shape = shape
		this.g.appendChild( shape )
		document.body.appendChild( this.svg )
		
		 		
 		this.setAttributes
 		({ 
 			stroke: new Color('000').toRGB(),
 		    'stroke-width': '3'
 		})
	},
	
	strokeColor: function( color )
	{
		this.setAttribute( 'stroke', color.toRGB() )
		this.draw.apply( this )
	},
	
	strokeWidth: function( width )
	{	
		this.setAttribute( 'stroke-width', width )
		this.strokeStyle()
		this.draw.apply( this )
	},
	
	strokeStyle: function( style )
	{	
		this._strokeStyle = this._strokeStyle || null,
			minWidth = this.getAttribute( 'stroke-width' ) || 1,
			DOTTED = [ minWidth, minWidth ].join(', ')
			DASHED = [ minWidth*3, minWidth*3 ].join(', ')
			DASHDOT =[ minWidth *3, minWidth, minWidth ].join(', ')
		
		if ( style )
		{ 
			this._strokeStyle = ( style.each )        ? style.join(',')  : null
			this._strokeStyle = ( style == 'dotted' ) ? DOTTED 	        : null
			this._strokeStyle = ( style == 'dashed' ) ? DASHED    		: null
			this._strokestyle = ( style == 'dashdot' )? DASHDOT	 		: null
		}
		
		this.setAttribute('stroke-dasharray', this._strokeStyle )
	},
	
	fill: function( filler )
	{
		if ( filler.toRGB )
			this.setAttribute( 'fill', filler.toRGB() )
	}
	
})

var Line = new ElementCaste
({
	tag: 'line',
	inheritance: [Shape, SvgElement]
 },
 {
 	initialize: function( origin, conclusion, options )
 	{
 		Shape.prototype.initialize.apply( this, [ this ] )

 		this.origin = origin || this.origin || {x:0,y:0}
 		this.conclusion = conclusion || this.conclusion || {x:0,y:0}
 	},
 	
 	length: function()
 	{
 		return Math.distance( this.origin, this.conclusion )
 	},
 	
 	set: function( end, coords )
 	{
 		coords.x ? this[ end ].x = coords.x : null
 		coords.y ? this[ end ].y = coords.y : null
 		this.draw()
 	},
 	
 	draw: function()
	{			
		this.inversion()
		

 		this.setAttribute( 'x1', this.begin().x )
 		this.setAttribute( 'y1', this.begin().y )
 		
 		this.setAttribute( 'x2', this.end().x )
 		this.setAttribute( 'y2', this.end().y )
		
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
			height = this._conclusion.y - this._origin.y,
			width = this._conclusion.x - this._origin.x,
			padding = this.padding()
		
		if ( this._origin.y > this._conclusion.y )
		{
			top = 0
		}
		
		if ( this._origin.y > this._conclusion.y )
		{
			var height = this._origin.y
			var width = this._conclusion.x - this._origin.x
		}
			
		this.svg.setStyle
		({
			top: top -padding.height +'px',
			left: left -padding.width +'px',
		})
		
		this.svg.setAttributes
		({
			width: width + (padding.width*2),
			height: height + (padding.height*2)
		})
	}
})

var Circle = new ElementCaste
({
	tag: 'circle',
	inheritance: [Shape, SvgElement]
 },
 {
 	initialize: function( center, radius )
 	{
 		Shape.prototype.initialize.apply( this, [ this ] )
 		this.origin( center || { x: 0,y: 0 } )
 		this.radius( radius || 15 )	
 		this.draw.apply( this )
 	},
 	
 	origin: function( coords )
 	{
 		this._origin = coords
 		this.draw()
 	},
 	
 	radius: function( radius )	
	{
		this._radius = radius * 2
		this.draw()
	},
	
	draw: function()
	{
		var padding = Number(this.getAttribute('stroke-width')/2)
 		this.setAttribute( 'cx', this._radius+padding )
 		this.setAttribute( 'cy', this._radius+padding )
		this.setAttribute( 'r', this._radius )
		this.fixCanvas()	
	},
	
	fixCanvas: function()
	{
		var strokeWidth = Number( this.getAttribute( 'stroke-width' ) ),
			top = this._origin.y - this._radius - (strokeWidth/2),
			left= this._origin.x - this._radius - (strokeWidth/2),
			width = height = (  this._radius * 2 ) + strokeWidth
		
		this.svg.setStyle
		({
			top: top +'px',
			left: left +'px'
		})
		
		this.svg.setAttributes
		({
			width: width,
			height: height
		})		
	}
})

Path = new ElementCaste
({
	tag: 'path',
	inheritance: [Shape, SvgElement, ArrayRegistry]
 },
 {
 	initialize: function( origin )
 	{
 		Shape.prototype.initialize.apply( this, [this] )
 		SvgElement.prototype.initialize.apply( this )
 		ArrayRegistry.prototype.initialize.apply( this )
 		
 		this.origin = origin		
 	},
 	
 	draw: function()
 	{
 		var pathString = this.registry.map( function( segment ) {
 			return segment.toPathString()
 		})
 		
 		var path = 'M' +this.origin.x +','+this.origin.y + pathString.join('')
 		this.setAttribute('d', path)
 	}
}) 

LinePathSegment = new Caste
({
 	initialize: function( path, coords )
 	{
		this.path = path
		path.register( this )
 		this.conclusion = coords
 	},
 	
 	set: function( params )
	{
		$H( params ).each( 
		function( param ){
			param.value.x ? this[ param.key ].x = param.value.x : null
			param.value.y ? this[ param.key ].y = param.value.y : null
		}.bind( this ))
		this.path.draw()
	},
	
 	toPathString: function()
 	{
 		return ' L' + this.conclusion.x +','+ this.conclusion.y + ' '
 	}	
})
 
BezierPathSegment = new Caste
({
	initialize: function( path, coords, controlA, controlB )
 	{
 		this.path = path
 		path.register( this )
 		this.conclusion = coords
 		this.controlA = controlA
 		this.controlB = controlB
 	},
 	
 	set: function( params )
	{
		$H( params ).each( 
		function( param ){
			param.value.x ? this[ param.key ].x = param.value.x : null
			param.value.y ? this[ param.key ].y = param.value.y : null
		}.bind( this ))	
		this.path.draw()
	},
	
 	toPathString: function()
 	{
 		return ' C' + this.controlA.x +','+ this.controlA.y +' '+ this.controlB.x +','+ this.controlB.y +' '+ this.conclusion.x +','+ this.conclusion.y + ' '
 	}
})