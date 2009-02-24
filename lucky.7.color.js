/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license Use it if you like it
 */
 
Color = new Caste
({	
    initialize: function( color_string ) 
    {
    	
        if(!color_string)
            color_string = '#' + Number.randomInt({ upperBound: 255, lowerBound: 0}).toColorPart()
                               + Number.randomInt({ upperBound: 255, lowerBound: 0}).toColorPart()
                               + Number.randomInt({ upperBound: 255, lowerBound: 0}).toColorPart()	
        
        this.ok = false;
    
        // strip any leading #
        if (!color_string.charAt)
        	return false;
        if (color_string.charAt(0) == '#') { // remove # if any
            color_string = color_string.substr(1,6);
        }
    
        color_string = color_string.replace(/ /g,'');
        color_string = color_string.toLowerCase();
    
        // array of color definition objects
        var color_defs = [
            {
                re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
                example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
                process: function (bits){
                    return [
                        parseInt(bits[1]),
                        parseInt(bits[2]),
                        parseInt(bits[3])
                    ];
                }
            },
            {
                re: /^(\w{2})(\w{2})(\w{2})$/,
                example: ['#00ff00', '336699'],
                process: function (bits){
                    return [
                        parseInt(bits[1], 16),
                        parseInt(bits[2], 16),
                        parseInt(bits[3], 16)
                    ];
                }
            },
            {
                re: /^(\w{1})(\w{1})(\w{1})$/,
                example: ['#fb0', 'f0f'],
                process: function (bits){
                    return [
                        parseInt(bits[1] + bits[1], 16),
                        parseInt(bits[2] + bits[2], 16),
                        parseInt(bits[3] + bits[3], 16)
                    ];
                }
            }
        ];
    
        // search through the definitions to find a match
        for (var i = 0; i < color_defs.length; i++) {
            var re = color_defs[i].re;
            var processor = color_defs[i].process;
            var bits = re.exec(color_string);
            if (bits) {
                channels = processor(bits)
                this.r = channels[0]
                this.g = channels[1]
                this.b = channels[2]
                // make sure the color is really ok
                if ( !isNaN( this.r + this.g + this.b ) )
                	this.ok = true
            }
    
        }

		this.validate()
    },
    
    // validates color
    validate: function()
    {
	    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
	    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
	    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
    },

	// returns rgb notation of color
    toRGB: function () 
    {
    	this.validate()
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')'
    },
    
    // returns hashed hex value of color
    toHex: function () 
    {
    	this.validate()
        var r = this.r.toString(16)
        var g = this.g.toString(16)
        var b = this.b.toString(16)
        if (r.length == 1) r = '0' + r
        if (g.length == 1) g = '0' + g
        if (b.length == 1) b = '0' + b
        return '#' + r + g + b
    },
    
    // inverts color, returns self
    invert: function() 
    {
    	this.validate()
    	this.r = 255 - this.r
    	this.g = 255 - this.g
    	this.b = 255 - this.b
    	return this
    }
    
})