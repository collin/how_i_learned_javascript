var Metric = new new Caste // ZOMG SINGLETON
({
	initialize: function()
	{
		this.alphabet = "abcdefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()',.<>"
		this.stage = new Div()
	},
	
	text: function( container, text )
	{
			
	},
	
	getAvgCharWidth: function( container )
	{
		this.stage = 
		this.stage.classNames = container.classNames
		this.stage.style.whiteSpace = 'nowrap'
		this.stage.innerHTML = this.alphabet
		this.cacheMetrics()
		return parseFloat( this.metrics.width ) / this.alphabet.length + this.metrics.width.unit()
	},
	
	cacheMetrics: function()
	{
		document.body.appendChild( this.stage )
		this.metrics = $H( this.stage.computedStyles() )
		document.body.removeChild( this.stage )
	}
})()