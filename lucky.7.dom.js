var ElementCaste = function( properties )
{ 
	var tag, element, i
	
	// no tag name provided, check ancestry for a tag
	if ( !properties.tag && properties.inheritance )
	{
		tag = properties.inheritance.find( function( ancestor ) 
		{
			return ancestor.tag != undefined
		}).tag	
	}
	else // tag is otherwise expected
		tag = properties.tag

	// no xml namespace provided, check ancestor for one
	if ( !properties.xmlns && properties.inheritance )
	{
		var _xmlns = properties.inheritance.find( function( konstructor ) {
			return konstructor.xmlns != undefined
		})
		var xmlns = _xmlns && _xmlns.xmlns ? _xmlns.xmlns : null
	}
	else // xmlns is found from properties. okay if this null
		var xmlns = properties.xmlns
	
	var constructor = function()
	{	
		// create element from namespace or in a standard fashion
		element = !xmlns ? document.createElement( tag )
		                 : document.createElementNS( xmlns, tag )	
		
		// give element the Element and Node instance methods
		clone( element, Element.prototype )
		clone( element, Node.prototype )
		Element.prototype.initialize.apply( element )
		clone( element, this )
		element.initialize.apply( element, arguments )
		return element
	}
	
	// store these on the constructor for inheritance purposes
	constructor.tag = tag
	constructor.xmlns = xmlns || null
	
	
	// if inheritance is provided, inherit instance methods from each ancestor
	properties.inheritance ? properties.inheritance.each( function( ancestor )
	{
		clone( constructor.prototype, ancestor.prototype )
	}) : null 
	
	// clone last argument, which contains instance methods
	clone( constructor.prototype, arguments[arguments.length - 1] )

	return constructor	
}

Element = new Caste
({
	initialize: function() {
		// for storing css class names
		this.classNames = new SplitArrayRegistry()
		
		// when class names are registered we need to rewrite the property
		this.setClassNamesListener = this.setClassNames.bind( this )
		
		this.classNames.onRegister.listeners.push( this.setClassNamesListener )
		this.classNames.onUnregister.listeners.push( this.setClassNamesListener )
		this.classNames.onPurge.listeners.push( this.setClassNamesListener )
	},
	
	setStyle: function( styles )
	{
		// explicitly set inline styles
		clone( this.style, styles )
		return this
	},

	setClassNames: function()
	{	
		// set the className from the classNames registry
		this.className = this.classNames.registry.join(' ')
	},
	
	area: function()
	{
		return this.offsetHeight * this.offsetWidth
	},
	
	intersecting: function( element )
	{
		return Vector.zoneIntersect
		({
			width: this.offsetWidth,
			height: this.offsetHeight,
			origin: {
						x: this.offsetLeft,
						y: this.offsetTop
					}
		 },
		 {
			width: element.offsetWidth,
			height: element.offsetHeight,
			origin: {
						x: element.offsetLeft,
						y: element.offsetTop
					}	
		}) / this.area()
	},
	
	computedStyles: function()
	{
		// figure out what the actual styling of an element is
		if ( this.currentStyle ) 
			return this.currentStyle // IE
			
		else if ( document.defaultView.getComputedStyle )
			return document.defaultView.getComputedStyle( this, null ) // Standard
	},
	
	animate: function( params  )
	{
		var toClass = params.to,
			fromClass = params.from ? params.from : '',
			classTween = new Tween( params.duration, params.easement ),
			targetStyles = $H(),
			sourceStyles = $H(),
			cleanupListener
			
		this.classNames.register( fromClass )
		this.classNames.unregister( toClass )
		
		// merge source animatable styles together
		fromClass.split(' ').compact().each( function( className )
		{
			clone( sourceStyles, StyleSheet.classes[ className ].animatable )		
		})

		// merge target animatable styles together
		toClass.split(' ').compact().each( function( className )
		{
			clone( targetStyles, StyleSheet.classes[ className ].animatable )
		})
		
		// overload with styles from this node
		targetStyles.each( function( style ) 
		{
			if ( this.computedStyles()[ style.key ] != style.value )
			{
				sourceStyles[ style.key ] = this.computedStyles()[ style.key ]
			}
		}.bind( this ))
		
		targetStyles.each( function( style )
		{
			// Don't want to animate between two styles that are the same.
			if ( style.value != this.computedStyles()[ style.key ] )
			{	
				// are we dealing with a color?
				if ( new Color( style.value ).ok && new Color( sourceStyles[ style.key ] ).ok )
				{
					new ColorTweenie( this, style.key, new Color( sourceStyles[ style.key ] ), new Color( style.value ), classTween )
				}
				// or a range ?
				else
				{
					new RangeTweenie( this, style.key, sourceStyles[ style.key ], style.value, classTween )
				}
			}
		}.bind( this ))
		// cleanup classNames and inline styles
		cleanupListener = function()
		{
			this.classNames.unregister( fromClass )
			this.classNames.register( toClass )
			targetStyles.each( function( style )
			{
				this.style[ style.key ] = null
			}.bind( this ))
		}.bind( this )
		
		classTween.onComplete.listeners.push( cleanupListener )
		classTween.go()
	},
	
	toggleClassName: function( className )
	{
		className.split( this.classNames.splitString ).compact().each( function( _className )
		{
			if ( this.classNames.registry.includes( _className) )
				this.classNames.unregister( _className )
			else
				this.classNames.register( _className )	
		}.bind( this ))
	},
	
	setAttributes: function( attributes )
	{
		$H(attributes).each( function( pair )
		{
			this.setAttribute( pair.key, pair.value )
		}.bind( this ))
	}
})

var Node = new Caste
({
	nearestCommonAncestor: function( element )
	{
		var elementAncestry = element.ancestry()
		return this.ancestry().find( function( ancestor )
		{
			return elementAncestry.include( ancestor )
		})
	},
	
	ancestry: function()
	{
		var ancestry = [], ancestor = this
		while ( ancestor.parentNode )
		{
			ancestry.push( ancestor.parentNode )
			ancestor = ancestor.parentNode
		}
		return ancestry
	}
})

var $ = function( tag )
{
	return new ElementCaste
	({
		tag:tag
	 },
	 {
	 	initialize: function()
		{
			
		} 
	})
}

'a img div span dd dt'.split(' ').each( function( tagName )
{
	this[ '$' + tagName ] = $( tagName )
}.bind( this ))

var $N = function( node )
{
	return clone( node, Node.prototype )	
}

var NullElement = new ElementCaste
({
	tag: 'null'
 },
 {
	initialize: function() {}
})

var Div = new ElementCaste
({
	tag: 'div'
 },
 {
	initialize: function(){} 	
})