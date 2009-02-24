var Selection = new new Caste // ZOMG Singleton
({
	text: function()
	{
		var text
		
		if (window.getSelection)
			text = window.getSelection()

		else if (document.getSelection)
			text = document.getSelection()
		
		else if (document.selection)
			text = document.selection
		
		return text 
	}
})()