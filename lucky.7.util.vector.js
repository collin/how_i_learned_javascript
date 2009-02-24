var Vector = new Caste({})

// Caste Methods
clone( Vector,
{
	zoneIntersect: function( zoneA, zoneB )
	{
		var verticalOverlap = zoneA.height - ( Math.abs( zoneA.origin.y - zoneB.origin.y ) ),
			horizontalOverlap = zoneA.width - ( Math.abs( zoneA.origin.x - zoneB.origin.x ) )
		return  verticalOverlap * horizontalOverlap
	},
	
	pointIntersect: function( zone, point )
	{
		if ( point.x > zone.origin.x 
		  && point.x < zone.origin.x + zone.width
		  && point.y > zone.origin.y
		  && point.y < zone.origin.y + zone.height )
			return true
		return false
	}
})