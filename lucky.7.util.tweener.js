/*
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright © 2001 Robert Penner All rights reserved.

easeNone, easeIn, easeOut, easeBoth
easeInStrong, easeOutStrong, easeBothStrong
bounceIn, bounceOut, bounceBoth
backIn, backOut, backBoth
elasticIn, elasticOut, elasticBoth
*/
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('j={O:e(t,b,c,d){6 c*t/d+b},B:e(t,b,c,d){6 c*(t/=d)*t+b},C:e(t,b,c,d){6-c*(t/=d)*(t-2)+b},P:e(t,b,c,d){8((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},I:e(t,b,c,d){6 c*(t/=d)*t*t*t+b},J:e(t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},D:e(t,b,c,d){8((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},K:e(t,b,c,d,a,p){8(t==0)6 b;8((t/=d)==1)6 b+c;8(!p)p=d*.3;8(!a||a<9.r(c)){a=c;h s=p/4}i h s=p/(2*9.g)*9.u(c/a);6-(a*9.n(2,l*(t-=1))*9.k((t*d-s)*(2*9.g)/p))+b},Q:e(t,b,c,d,a,p){8(t==0)6 b;8((t/=d)==1)6 b+c;8(!p)p=d*.3;8(!a||a<9.r(c)){a=c;h s=p/4}i h s=p/(2*9.g)*9.u(c/a);6 a*9.n(2,-l*t)*9.k((t*d-s)*(2*9.g)/p)+c+b},F:e(t,b,c,d,a,p){8(t==0)6 b;8((t/=d/2)==2)6 b+c;8(!p)p=d*(.3*1.5);8(!a||a<9.r(c)){a=c;h s=p/4}i h s=p/(2*9.g)*9.u(c/a);8(t<1)6-.5*(a*9.n(2,l*(t-=1))*9.k((t*d-s)*(2*9.g)/p))+b;6 a*9.n(2,-l*(t-=1))*9.k((t*d-s)*(2*9.g)/p)*.5+c+b},N:e(t,b,c,d,s){8(v s==\'o\')s=1.q;6 c*(t/=d)*t*((s+1)*t-s)+b},G:e(t,b,c,d,s){8(v s==\'o\')s=1.q;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},z:e(t,b,c,d,s){8(v s==\'o\')s=1.q;8((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.y))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.y))+1)*t+s)+2)+b},x:e(t,b,c,d){6 c-j.w(d-t,0,c,d)+b},w:e(t,b,c,d){8((t/=d)<(1/2.f)){6 c*(7.m*t*t)+b}i 8(t<(2/2.f)){6 c*(7.m*(t-=(1.5/2.f))*t+.f)+b}i 8(t<(2.5/2.f)){6 c*(7.m*(t-=(2.E/2.f))*t+.H)+b}i{6 c*(7.m*(t-=(2.L/2.f))*t+.M)+b}},A:e(t,b,c,d){8(t<d/2)6 j.x(t*2,0,c,d)*.5+b;6 j.w(t*2-d,0,c,d)*.5+c*.5+b}}',53,53,'||||||return||if|Math|||||function|75|PI|var|else|Easing|sin|10|5625|pow|undefined||70158|abs|||asin|typeof|bounceOut|bounceIn|525|backBoth|bounceBoth|easeIn|easeOut|easeBothStrong|25|elasticBoth|backOut|9375|easeInStrong|easeOutStrong|elasticIn|625|984375|backIn|easeNone|easeBoth|elasticOut'.split('|'),0,{}))
/*
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

Tweener = new new Caste // Singleton
( ArrayRegistry, 
 {	
	initialize: function() 
	{
		this.onStop = new CustomEvent()
		
		this.thread = null
		this.fps = 200
		
		ArrayRegistry.prototype.initialize.apply( this )
		
		this.registerTweenListener = this.registerTween.bind( this )
		this.onRegister.listeners.push( this.registerTweenListener )
		
		this.unregisterTweenListener = this.unregisterTween.bind( this )
		this.onUnregister.listeners.push( this.unregisterTweenListener )
		
		this.stopListener = this.stop.bind( this )
		this.onStop.listeners.push( this.stopListener )

	},
	
	registerTween: function(tween) 
	{
		tween.onStart.fire()
      	this.start()
   	},
   
   	unregisterTween: function( tween ) 
   	{
		tween.onComplete.fire()
		if (this.registry.length <= 0)
			this.onStop.fire()
   	},
   
   	start: function() 
   	{
      if (this.thread === null)
	  	this.thread = setInterval(this.run.bind( this ), 1 )
   	},
	
	stop: function( tween ) 
	{
      	if (!tween) 
      	{
         	clearInterval(this.thread);
         	for (var i = 0, len = this.registry.length; i < len; ++i)
            	if ( this.registry[i].tweened() )
               		this.unregister( this.registry[i] )
					
        	this.purge
        	this.thread = null
      	}
      	else
         	this.unregister(tween)
   	},
   
   	run: function() 
   	{
		for (var i = 0, len = this.registry.length; i < len; ++i) {
         	var tween = this.registry[i]
         	if ( !tween || !tween.tweened )
		 		continue
         	if ( tween.currentFrame < tween.totalFrames || tween.totalFrames === null ) {
				tween.currentFrame += 1
            	this.correctFrame( tween )   
            	tween.actualFrames +=1
            	tween.onTween.fire( tween.ease( tween.currentFrame, 0, 1, tween.totalFrames ) )
         	}
         	else 
		 		this.onStop.fire( tween )
	
   		}
	},

   	correctFrame: function(tween) 
   	{
      	var frames = tween.totalFrames,
      		frame = tween.currentFrame,
      		expected = ( tween.currentFrame * tween.duration * 1000 / tween.totalFrames ),
      		elapsed = ( new Date() - tween.startTime ),
      		tweak = 0

      	if (elapsed < tween.duration * 1000) { // check if falling behind
         	tweak = Math.round((elapsed / expected - 1) * tween.currentFrame)
      	} else { // went over duration, so jump to end
         	tweak = frames - (frame + 1)
      	}
      	if (tweak > 0 && isFinite(tweak)) { // adjust if needed
         	if (tween.currentFrame + tweak >= frames) {// dont go past last frame
            	tweak = frames - (frame + 1)
         	}

         	tween.currentFrame += tweak
      	}
   	}
})()

Tween = new Caste
({	
	initialize: function( time, easement ) 
	{
		this.onTween = new CustomEvent()
		this.onStart = new CustomEvent()
		this.onComplete = new CustomEvent()
		
		this.tweened = false
		this.startTime = null
		this.duration = time || 1
		this.ease = easement || Easing.easeNone
		this.currentFrame = 0
		this.actualFrames = 0
		this.totalFrames = 0
		
		this.startListener = this.start.bind( this )
		this.onStart.listeners.push( this.startListener )
		
		this.completeListener = this.complete.bind( this )
		this.onComplete.listeners.push( this.completeListener )
	},
    
	go: function() 
	{
        if ( this.tweened )
			return false;

        this.currentFrame = 0

        this.totalFrames = Math.ceil( Tweener.fps * this.duration )

    	Tweener.register( this )
	},
	
	start: function() 
	{
        this.tweened = true
        this.actualFrames = 0
    	this.startTime = new Date()
	},
	
	complete: function() 
	{
        this.tweened = false
    	this.actualFrames = 0
    }

})

/*----------------------------------------------------------------------------------------*/

Tweenie = new Caste
({
	initialize: function( element, property, tween )
	{
		this.element = element
		this.property = property
		this.tween = tween
		
		this.tweenListener = this.tweenie.bind( this )
        tween.onTween.listeners.push( this.tweenListener )
	}
})

ColorTweenie = new Caste
( Tweenie,
 {    
    initialize: function( element, property, original, newColor, tween ) 
    {
        Tweenie.prototype.initialize.apply( this, [ element, property, tween ] )
        this.original = original
        this.newColor = newColor
    },
    
    tweenie: function ( value ) 
    {
        var r = ( this.original.r + ( ( this.newColor.r - this.original.r ) * value ) )
        var g = ( this.original.g + ( ( this.newColor.g - this.original.g ) * value ) )
        var b = ( this.original.b + ( ( this.newColor.b - this.original.b ) * value ) )
        this.element.style[ this.property ] = new Color( r.toColorPart() + g.toColorPart() + b.toColorPart() ).toHex()
    }
    
})

RangeTweenie = new Caste
( Tweenie,
 {   
    initialize: function( element, property, origin, conclusion, tween )
    {
    	Tweenie.prototype.initialize.apply( this, [ element, property, tween ] )
        this.suffix = origin.unit()
        this.origin = parseFloat( origin )
        this.conclusion = parseFloat( conclusion ) 
        this.distance = this.conclusion - this.origin
    },
    
    tweenie: function( value ) 
	{
        this.element.style[ this.property ] = ( this.origin + ( this.distance * value ) + this.suffix )
    }
})

/*----------------------------------------------------------------------------------------*/

/*
RangeTween = new Caste
( Tween, 
 {   
    initialize: function( origin, conclusion, time, easement )
    {
        this.origin = origin
        this.conclusion = conclusion
        this.distance = conclusion - origin
        
        this.onRangeTween = new CustomEvent()
        
        Tween.prototype.initialize.apply( this, [ time, easement ] )
        
        this.tweenListener = this.rangeTween.bind( this )
        this.onTween.listeners.push( this.tweenListener )
    },
    
    rangeTween: function( value ) 
    {
        this.onRangeTween.fire( this.origin + ( this.distance * value ) )
    }

} )

ColorTween = new Caste
( Tween, 
 {    
    initialize: function( original, newColor, time, easement ) 
    {
        this.original = original
        this.newColor = newColor
        
        this.onColorTween = new CustomEvent()
        
        Tween.prototype.initialize.apply( this, [ time, easement ] )
        
        this.tweenListener = this.colorTween.bind( this )
        this.onTween.listeners.push( this.tweenListener )
    },
    
    colorTween: function ( value ) 
    {
        var r = ( this.original.r + ( ( this.newColor.r - this.original.r ) * value ) )
        var g = ( this.original.g + ( ( this.newColor.g - this.original.g ) * value ) )
        var b = ( this.original.b + ( ( this.newColor.b - this.original.b ) * value ) )
        this.onColorTween.fire( new Color( r.toColorPart() + b.toColorPart() + g.toColorPart() ) )
    }
    
})
*/


