clone( Number,
{
	randomInt: function( params )
	{
		var lowerBound = params.lowerBound ? params.lowerBound : 0,
			upperBound = params.upperBound ? params.upperBound : 1
	 	return Math.round( Math.random() * ( upperBound - lowerBound ) ) + lowerBound
	}
})

clone( Number.prototype,
{
	toColorPart: function()
	{
	    var digits = Math.floor( this ).toString( 16 )
    	if ( this < 16 ) return '0' + digits
    	return digits
	},
	
	radianToAngle: function()
	{
		return this * ( 180 / Math.PI )
	},
	
	isOdd: function()
	{
		return this % 2 == 1 
	},
	
	isEven: function()
	{
		return this % 2 == 0 
	}
})

clone( Math,
{
	distance: function( origin, conclusion )
	{
		
		var begin = conclusion.x > origin.x ? conclusion.x - origin.x : origin.x - conclusion.x,
			end   = conclusion.y > origin.y ? conclusion.y - origin.y : origin.y - conclusion.y
		return Math.sqrt( ( begin*begin ) + ( end*end ) )
	},
	
	exponent: function( base, exp )
	{
		var result = base,
			neg = false
		
	   	if ( exp < 0 ) 
	   	{
	   		neg = true
	   		exp = -1 * exp 
	   	}
	   	
	   	for ( var i = 1; i < Math.abs( exp ); i++ ) result *= base
	
	    if ( neg ) result = 1 / result  
	    else if ( exp == 0 ) result = 1
	     
	    return result
	},
	
	soh: function( opposite, hypotenuse )
	{
		return Math.asin( opposite / hypotenuse )
	},
	
	cah: function( adajecent, hypotenuse )
	{
		return Math.acos( adjacent / hypotenuse )
	},
	
	toa: function( opposite, adjacent )
	{
		return Math.atan( opposite / adjacent)
	}
})