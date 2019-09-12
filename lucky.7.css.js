var StyleSheet = new new Caste
({
	initialize: function() 
	{
		this.documentLoadListener = this.loadRules.bind( this )
		window.onLoad.listeners.push( this.documentLoadListener )
		this.classes = {}
		this.ids     = {}
		this.tags    = {}
	},
	
	// Returns a style object like an Element#style object
	getRules: function()
	{
		if ( this.rules )
		{
			return $A( this.rules ) // IE
		}
		else
		{
			return $A( this.cssRules ) // W3C standard
		}
	},
	
	loadRules: function()
	{
		var className
		
		$A( document.styleSheets ).each( function( sheet ) 
		{
			this.getRules.apply( sheet ).each( function( rule )
			{	
				_rule = clone( {}, rule )
				switch ( _rule.selectorText.charAt(0) )
				{
				case '.':
					className = _rule.selectorText.replace( '.', '' )
					_rule['animatable'] = CSSRule.animatable( _rule, className )
					this.classes[ className ] = _rule
					break
				case '#':
					this.ids[ _rule.selectorText.replace( '#', '' ) ] = _rule
					break
				default:
					this.tags[ _rule.selectorText ] = _rule
				}
			}.bind( this ))
		}.bind( this ))
	}
	
	// we can set up to add and remove rules should we want to
	// help for syntax here: http://www.javascriptkit.com/domref/stylesheet.shtml
})() // ZOMG it's a singleton!

CSSRule = new Caste({})

clone( CSSRule,
{
	animatable: function( rule, className )
	{
		var nullo = new NullElement('div'),
			withRule = new NullElement('div'),
			animatable

		withRule.classNames.register( className )
		
		document.body.appendChild( nullo )
		document.body.appendChild( withRule )

		animatable = $H( nullo.computedStyles() ).inject( $H(), function( animators, style )
		{
			if ( 
					withRule.computedStyles()[ style.key ]  
				&&  withRule.computedStyles()[ style.key ] != style.value
				&&	isNaN( style.key ) 
				&&  isNaN( style.value )
				)
				{
					animators[ style.key ] = withRule.computedStyles()[ style.key ]
				}
				return animators
		})
	
		document.body.removeChild( nullo )
		document.body.removeChild( withRule )
		return animatable
	}
})
