/**
 * Copy properties from one object to another. If no target is provided
 * an empty object, {}, is used. If no source is provided, an empty
 * object, {}, is used.
 * 
 * @param target 	Object properties are being copied to.
 * @param source 	Object properties are being copied from.
 * @return			target
 * @author          Collin Miller
 */

var clone = function( target, source )
{
	var targ = target || {},
	    src  = source || {}
	    
	for ( var property in src )
	//	if ( src.hasOwnProperty( property ) ) --> removed shallow cloning for ElementCaste
			targ[property] = src[property]
			
	return targ
}

/**
 * Create a Caste. New instances of this Caste may be instantiated.
 * 
 * @param ancestry  Optional, Caste inherits instance methods from this list of Castes.
 * @param methods 	Last argument. These are instance methods.
 * @return			a contructor function
 * @author          Collin Miller
 */

var Caste = function()
{
	// If no initialize supplied, offer up an empty function in place.
	if ( !arguments[ arguments.length -1 ].initialize )
		arguments[ arguments.length -1 ].initialize = function(){}
	
	var constructor = function()
	{   // When constructor is called, instance method initalize is called with arugments.
		return this.initialize.apply( this, arguments )
	}
	
	// More than one argument. Inheritance has been specified.
	if ( arguments[1] )
		for ( var i = 0; i < arguments.length - 1; i++ ) 
			clone( constructor.prototype, arguments[i].prototype ) // clone instance methods from ancestry
			
	// clone instance methods from last argument		
	clone( constructor.prototype, arguments[arguments.length - 1] ) 

	return constructor
}