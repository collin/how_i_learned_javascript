clone( Function.prototype,
{
	bind: function()
	{	
		var method = this, args = $A( arguments ), scope = args.shift()	
		return function()
		{
			method.apply( scope, args.concat( $A( arguments ) ) )
		}
	},
	
	bindAsEventListener: function()
	{
  		var method = this, args = $A( arguments ), scope = args.shift()
  		return function( event ) 
  		{
  			_event = [ $E( event ) ]
    		return method.apply( scope, _event.concat( args ).concat( $A( arguments ).reject( function( atom ){ atom = event } ) ) )
  		}
	}
})