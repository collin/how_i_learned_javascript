clone( String.prototype,
{
	unit: function()
	{
		return this.slice( this.length - ( this.length - String( parseFloat( this ) ).length ) )
	}
})