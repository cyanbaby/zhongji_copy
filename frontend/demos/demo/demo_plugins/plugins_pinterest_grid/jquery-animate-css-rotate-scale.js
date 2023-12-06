/*!
/**
 * Monkey patch jQuery 1.3.1+ to add support for setting or animating CSS
 * scale and rotation independently.
 * https://github.com/zachstronaut/jquery-animate-css-rotate-scale
 * Released under dual MIT/GPL license just like jQuery.
 * 2009-2012 Zachary Johnson www.zachstronaut.com
 */
(function ($) {
    // Updated 2010.11.06
    // Updated 2012.10.13 - Firefox 16 transform style returns a matrix rather than a string of transform functions.  This broke the features of this jQuery patch in Firefox 16.  It should be possible to parse the matrix for both scale and rotate (especially when scale is the same for both the X and Y axis), however the matrix does have disadvantages such as using its own units and also 45deg being indistinguishable from 45+360deg.  To get around these issues, this patch tracks internally the scale, rotation, and rotation units for any elements that are .scale()'ed, .rotate()'ed, or animated.  The major consequences of this are that 1. the scaled/rotated element will blow away any other transform rules applied to the same element (such as skew or translate), and 2. the scaled/rotated element is unaware of any preset scale or rotation initally set by page CSS rules.  You will have to explicitly set the starting scale/rotation value.
    
    function initData($el) {
        var _ARS_data = $el.data('_ARS_data');
        if (!_ARS_data) {
            _ARS_data = {
                rotateUnits: 'deg',
                scale: 1,
                rotate: 0
            };
            
            $el.data('_ARS_data', _ARS_data);
        }
        
        return _ARS_data;
    }
    
    function setTransform($el, data) {
        $el.css('transform', 'rotate(' + data.rotate + data.rotateUnits + ') scale(' + data.scale + ',' + data.scale + ')');
    }
    
    $.fn.rotate = function (val) {
        var $self = $(this), m, data = initData($self);
                        
        if (typeof val == 'undefined') {
            return data.rotate + data.rotateUnits;
        }
        
        m = val.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);
        if (m) {
            if (m[3]) {
                data.rotateUnits = m[3];
            }
            
            data.rotate = m[1];
            
            setTransform($self, data);
        }
        
        return this;
    };
    
    // Note that scale is unitless.
    $.fn.scale = function (val) {
        var $self = $(this), data = initData($self);
        
        if (typeof val == 'undefined') {
            return data.scale;
        }
        
        data.scale = val;
        
        setTransform($self, data);
        
        return this;
    };

    // fx.cur() must be monkey patched because otherwise it would always
    // return 0 for current rotate and scale values
    var curProxied = $.fx.prototype.cur;
    $.fx.prototype.cur = function () {
        if (this.prop == 'rotate') {
            return parseFloat($(this.elem).rotate());
            
        } else if (this.prop == 'scale') {
            return parseFloat($(this.elem).scale());
        }
        
        return curProxied.apply(this, arguments);
    };
    
    $.fx.step.rotate = function (fx) {
        var data = initData($(fx.elem));
        $(fx.elem).rotate(fx.now + data.rotateUnits);
    };
    
    $.fx.step.scale = function (fx) {
        $(fx.elem).scale(fx.now);
    };
    
    /*
    
    Starting on line 3905 of jquery-1.3.2.js we have this code:
    
    // We need to compute starting value
    if ( unit != "px" ) {
        self.style[ name ] = (end || 1) + unit;
        start = ((end || 1) / e.cur(true)) * start;
        self.style[ name ] = start + unit;
    }
    
    This creates a problem where we cannot give units to our custom animation
    because if we do then this code will execute and because self.style[name]
    does not exist where name is our custom animation's name then e.cur(true)
    will likely return zero and create a divide by zero bug which will set
    start to NaN.
    
    The following monkey patch for animate() gets around this by storing the
    units used in the rotation definition and then stripping the units off.
    
    */
    
    var animateProxied = $.fn.animate;
    $.fn.animate = function (prop) {
        if (typeof prop['rotate'] != 'undefined') {
            var $self, data, m = prop['rotate'].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
            if (m && m[5]) {
                $self = $(this);
                data = initData($self);
                data.rotateUnits = m[5];
            }
            
            prop['rotate'] = m[1];
        }
        
        return animateProxied.apply(this, arguments);
    };
})(jQuery);



/*!
 * jQuery Color Animations v@VERSION
 * https://github.com/jquery/jquery-color
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: @DATE
 */
 
(function( root, factory ) {
    if ( typeof define === "function" && define.amd) {
 
        // AMD. Register as an anonymous module.
        define( [ "jquery" ], factory);
    } else if ( typeof exports === "object" ) {
        module.exports = factory( require( "jquery" ) );
    } else {
        factory( root.jQuery );
    }
})( this, function( jQuery, undefined ) {
 
    var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
 
    // plusequals test for += 100 -= 100
    rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
    // a set of RE's that can match strings and generate color tuples.
    stringParsers = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function( execResult ) {
                return [
                    execResult[ 1 ],
                    execResult[ 2 ],
                    execResult[ 3 ],
                    execResult[ 4 ]
                ];
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function( execResult ) {
                return [
                    execResult[ 1 ] * 2.55,
                    execResult[ 2 ] * 2.55,
                    execResult[ 3 ] * 2.55,
                    execResult[ 4 ]
                ];
            }
        }, {
            // this regex ignores A-F because it's compared against an already lowercased string
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function( execResult ) {
                return [
                    parseInt( execResult[ 1 ], 16 ),
                    parseInt( execResult[ 2 ], 16 ),
                    parseInt( execResult[ 3 ], 16 )
                ];
            }
        }, {
            // this regex ignores A-F because it's compared against an already lowercased string
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function( execResult ) {
                return [
                    parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
                    parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
                    parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
                ];
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function( execResult ) {
                return [
                    execResult[ 1 ],
                    execResult[ 2 ] / 100,
                    execResult[ 3 ] / 100,
                    execResult[ 4 ]
                ];
            }
        }],
 
    // jQuery.Color( )
    color = jQuery.Color = function( color, green, blue, alpha ) {
        return new jQuery.Color.fn.parse( color, green, blue, alpha );
    },
    spaces = {
        rgba: {
            props: {
                red: {
                    idx: 0,
                    type: "byte"
                },
                green: {
                    idx: 1,
                    type: "byte"
                },
                blue: {
                    idx: 2,
                    type: "byte"
                }
            }
        },
 
        hsla: {
            props: {
                hue: {
                    idx: 0,
                    type: "degrees"
                },
                saturation: {
                    idx: 1,
                    type: "percent"
                },
                lightness: {
                    idx: 2,
                    type: "percent"
                }
            }
        }
    },
    propTypes = {
        "byte": {
            floor: true,
            max: 255
        },
        "percent": {
            max: 1
        },
        "degrees": {
            mod: 360,
            floor: true
        }
    },
    support = color.support = {},
 
    // element for support tests
    supportElem = jQuery( "<p>" )[ 0 ],
 
    // colors = jQuery.Color.names
    colors,
 
    // local aliases of functions called often
    each = jQuery.each;
 
// determine rgba support immediately
supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;
 
// define cache name and alpha properties
// for rgba and hsla spaces
each( spaces, function( spaceName, space ) {
    space.cache = "_" + spaceName;
    space.props.alpha = {
        idx: 3,
        type: "percent",
        def: 1
    };
});
 
function clamp( value, prop, allowEmpty ) {
    var type = propTypes[ prop.type ] || {};
 
    if ( value == null ) {
        return (allowEmpty || !prop.def) ? null : prop.def;
    }
 
    // ~~ is an short way of doing floor for positive numbers
    value = type.floor ? ~~value : parseFloat( value );
 
    // IE will pass in empty strings as value for alpha,
    // which will hit this case
    if ( isNaN( value ) ) {
        return prop.def;
    }
 
    if ( type.mod ) {
        // we add mod before modding to make sure that negatives values
        // get converted properly: -10 -> 350
        return (value + type.mod) % type.mod;
    }
 
    // for now all property types without mod have min and max
    return 0 > value ? 0 : type.max < value ? type.max : value;
}
 
function stringParse( string ) {
    var inst = color(),
        rgba = inst._rgba = [];
 
    string = string.toLowerCase();
 
    each( stringParsers, function( i, parser ) {
        var parsed,
            match = parser.re.exec( string ),
            values = match && parser.parse( match ),
            spaceName = parser.space || "rgba";
 
        if ( values ) {
            parsed = inst[ spaceName ]( values );
 
            // if this was an rgba parse the assignment might happen twice
            // oh well....
            inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];
            rgba = inst._rgba = parsed._rgba;
 
            // exit each( stringParsers ) here because we matched
            return false;
        }
    });
 
    // Found a stringParser that handled it
    if ( rgba.length ) {
 
        // if this came from a parsed string, force "transparent" when alpha is 0
        // chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
        if ( rgba.join() === "0,0,0,0" ) {
            jQuery.extend( rgba, colors.transparent );
        }
        return inst;
    }
 
    // named colors
    return colors[ string ];
}
 
color.fn = jQuery.extend( color.prototype, {
    parse: function( red, green, blue, alpha ) {
        if ( red === undefined ) {
            this._rgba = [ null, null, null, null ];
            return this;
        }
        if ( red.jquery || red.nodeType ) {
            red = jQuery( red ).css( green );
            green = undefined;
        }
 
        var inst = this,
            type = jQuery.type( red ),
            rgba = this._rgba = [];
 
        // more than 1 argument specified - assume ( red, green, blue, alpha )
        if ( green !== undefined ) {
            red = [ red, green, blue, alpha ];
            type = "array";
        }
 
        if ( type === "string" ) {
            return this.parse( stringParse( red ) || colors._default );
        }
 
        if ( type === "array" ) {
            each( spaces.rgba.props, function( key, prop ) {
                rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
            });
            return this;
        }
 
        if ( type === "object" ) {
            if ( red instanceof color ) {
                each( spaces, function( spaceName, space ) {
                    if ( red[ space.cache ] ) {
                        inst[ space.cache ] = red[ space.cache ].slice();
                    }
                });
            } else {
                each( spaces, function( spaceName, space ) {
                    var cache = space.cache;
                    each( space.props, function( key, prop ) {
 
                        // if the cache doesn't exist, and we know how to convert
                        if ( !inst[ cache ] && space.to ) {
 
                            // if the value was null, we don't need to copy it
                            // if the key was alpha, we don't need to copy it either
                            if ( key === "alpha" || red[ key ] == null ) {
                                return;
                            }
                            inst[ cache ] = space.to( inst._rgba );
                        }
 
                        // this is the only case where we allow nulls for ALL properties.
                        // call clamp with alwaysAllowEmpty
                        inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
                    });
 
                    // everything defined but alpha?
                    if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {
                        // use the default of 1
                        inst[ cache ][ 3 ] = 1;
                        if ( space.from ) {
                            inst._rgba = space.from( inst[ cache ] );
                        }
                    }
                });
            }
            return this;
        }
    },
    is: function( compare ) {
        var is = color( compare ),
            same = true,
            inst = this;
 
        each( spaces, function( _, space ) {
            var localCache,
                isCache = is[ space.cache ];
            if (isCache) {
                localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];
                each( space.props, function( _, prop ) {
                    if ( isCache[ prop.idx ] != null ) {
                        same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );
                        return same;
                    }
                });
            }
            return same;
        });
        return same;
    },
    _space: function() {
        var used = [],
            inst = this;
        each( spaces, function( spaceName, space ) {
            if ( inst[ space.cache ] ) {
                used.push( spaceName );
            }
        });
        return used.pop();
    },
    transition: function( other, distance ) {
        var end = color( other ),
            spaceName = end._space(),
            space = spaces[ spaceName ],
            startColor = this.alpha() === 0 ? color( "transparent" ) : this,
            start = startColor[ space.cache ] || space.to( startColor._rgba ),
            result = start.slice();
 
        end = end[ space.cache ];
        each( space.props, function( key, prop ) {
            var index = prop.idx,
                startValue = start[ index ],
                endValue = end[ index ],
                type = propTypes[ prop.type ] || {};
 
            // if null, don't override start value
            if ( endValue === null ) {
                return;
            }
            // if null - use end
            if ( startValue === null ) {
                result[ index ] = endValue;
            } else {
                if ( type.mod ) {
                    if ( endValue - startValue > type.mod / 2 ) {
                        startValue += type.mod;
                    } else if ( startValue - endValue > type.mod / 2 ) {
                        startValue -= type.mod;
                    }
                }
                result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
            }
        });
        return this[ spaceName ]( result );
    },
    blend: function( opaque ) {
        // if we are already opaque - return ourself
        if ( this._rgba[ 3 ] === 1 ) {
            return this;
        }
 
        var rgb = this._rgba.slice(),
            a = rgb.pop(),
            blend = color( opaque )._rgba;
 
        return color( jQuery.map( rgb, function( v, i ) {
            return ( 1 - a ) * blend[ i ] + a * v;
        }));
    },
    toRgbaString: function() {
        var prefix = "rgba(",
            rgba = jQuery.map( this._rgba, function( v, i ) {
                return v == null ? ( i > 2 ? 1 : 0 ) : v;
            });
 
        if ( rgba[ 3 ] === 1 ) {
            rgba.pop();
            prefix = "rgb(";
        }
 
        return prefix + rgba.join() + ")";
    },
    toHslaString: function() {
        var prefix = "hsla(",
            hsla = jQuery.map( this.hsla(), function( v, i ) {
                if ( v == null ) {
                    v = i > 2 ? 1 : 0;
                }
 
                // catch 1 and 2
                if ( i && i < 3 ) {
                    v = Math.round( v * 100 ) + "%";
                }
                return v;
            });
 
        if ( hsla[ 3 ] === 1 ) {
            hsla.pop();
            prefix = "hsl(";
        }
        return prefix + hsla.join() + ")";
    },
    toHexString: function( includeAlpha ) {
        var rgba = this._rgba.slice(),
            alpha = rgba.pop();
 
        if ( includeAlpha ) {
            rgba.push( ~~( alpha * 255 ) );
        }
 
        return "#" + jQuery.map( rgba, function( v ) {
 
            // default to 0 when nulls exist
            v = ( v || 0 ).toString( 16 );
            return v.length === 1 ? "0" + v : v;
        }).join("");
    },
    toString: function() {
        return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
    }
});
color.fn.parse.prototype = color.fn;
 
// hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021
 
function hue2rgb( p, q, h ) {
    h = ( h + 1 ) % 1;
    if ( h * 6 < 1 ) {
        return p + (q - p) * h * 6;
    }
    if ( h * 2 < 1) {
        return q;
    }
    if ( h * 3 < 2 ) {
        return p + (q - p) * ((2/3) - h) * 6;
    }
    return p;
}
 
spaces.hsla.to = function ( rgba ) {
    if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
        return [ null, null, null, rgba[ 3 ] ];
    }
    var r = rgba[ 0 ] / 255,
        g = rgba[ 1 ] / 255,
        b = rgba[ 2 ] / 255,
        a = rgba[ 3 ],
        max = Math.max( r, g, b ),
        min = Math.min( r, g, b ),
        diff = max - min,
        add = max + min,
        l = add * 0.5,
        h, s;
 
    if ( min === max ) {
        h = 0;
    } else if ( r === max ) {
        h = ( 60 * ( g - b ) / diff ) + 360;
    } else if ( g === max ) {
        h = ( 60 * ( b - r ) / diff ) + 120;
    } else {
        h = ( 60 * ( r - g ) / diff ) + 240;
    }
 
    // chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
    // otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
    if ( diff === 0 ) {
        s = 0;
    } else if ( l <= 0.5 ) {
        s = diff / add;
    } else {
        s = diff / ( 2 - add );
    }
    return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
};
 
spaces.hsla.from = function ( hsla ) {
    if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
        return [ null, null, null, hsla[ 3 ] ];
    }
    var h = hsla[ 0 ] / 360,
        s = hsla[ 1 ],
        l = hsla[ 2 ],
        a = hsla[ 3 ],
        q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
        p = 2 * l - q;
 
    return [
        Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
        Math.round( hue2rgb( p, q, h ) * 255 ),
        Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
        a
    ];
};
 
 
each( spaces, function( spaceName, space ) {
    var props = space.props,
        cache = space.cache,
        to = space.to,
        from = space.from;
 
    // makes rgba() and hsla()
    color.fn[ spaceName ] = function( value ) {
 
        // generate a cache for this space if it doesn't exist
        if ( to && !this[ cache ] ) {
            this[ cache ] = to( this._rgba );
        }
        if ( value === undefined ) {
            return this[ cache ].slice();
        }
 
        var ret,
            type = jQuery.type( value ),
            arr = ( type === "array" || type === "object" ) ? value : arguments,
            local = this[ cache ].slice();
 
        each( props, function( key, prop ) {
            var val = arr[ type === "object" ? key : prop.idx ];
            if ( val == null ) {
                val = local[ prop.idx ];
            }
            local[ prop.idx ] = clamp( val, prop );
        });
 
        if ( from ) {
            ret = color( from( local ) );
            ret[ cache ] = local;
            return ret;
        } else {
            return color( local );
        }
    };
 
    // makes red() green() blue() alpha() hue() saturation() lightness()
    each( props, function( key, prop ) {
        // alpha is included in more than one space
        if ( color.fn[ key ] ) {
            return;
        }
        color.fn[ key ] = function( value ) {
            var vtype = jQuery.type( value ),
                fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),
                local = this[ fn ](),
                cur = local[ prop.idx ],
                match;
 
            if ( vtype === "undefined" ) {
                return cur;
            }
 
            if ( vtype === "function" ) {
                value = value.call( this, cur );
                vtype = jQuery.type( value );
            }
            if ( value == null && prop.empty ) {
                return this;
            }
            if ( vtype === "string" ) {
                match = rplusequals.exec( value );
                if ( match ) {
                    value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
                }
            }
            local[ prop.idx ] = value;
            return this[ fn ]( local );
        };
    });
});
 
// add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
color.hook = function( hook ) {
    var hooks = hook.split( " " );
    each( hooks, function( i, hook ) {
        jQuery.cssHooks[ hook ] = {
            set: function( elem, value ) {
                var parsed, curElem,
                    backgroundColor = "";
 
                if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
                    value = color( parsed || value );
                    if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
                        curElem = hook === "backgroundColor" ? elem.parentNode : elem;
                        while (
                            (backgroundColor === "" || backgroundColor === "transparent") &&
                            curElem && curElem.style
                        ) {
                            try {
                                backgroundColor = jQuery.css( curElem, "backgroundColor" );
                                curElem = curElem.parentNode;
                            } catch ( e ) {
                            }
                        }
 
                        value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
                            backgroundColor :
                            "_default" );
                    }
 
                    value = value.toRgbaString();
                }
                try {
                    elem.style[ hook ] = value;
                } catch( e ) {
                    // wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
                }
            }
        };
        jQuery.fx.step[ hook ] = function( fx ) {
            if ( !fx.colorInit ) {
                fx.start = color( fx.elem, hook );
                fx.end = color( fx.end );
                fx.colorInit = true;
            }
            jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
        };
    });
 
};
 
color.hook( stepHooks );
 
jQuery.cssHooks.borderColor = {
    expand: function( value ) {
        var expanded = {};
 
        each( [ "Top", "Right", "Bottom", "Left" ], function( i, part ) {
            expanded[ "border" + part + "Color" ] = value;
        });
        return expanded;
    }
};
 
// Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
colors = jQuery.Color.names = {
    // 4.1. Basic color keywords
    aqua: "#00ffff",
    black: "#000000",
    blue: "#0000ff",
    fuchsia: "#ff00ff",
    gray: "#808080",
    green: "#008000",
    lime: "#00ff00",
    maroon: "#800000",
    navy: "#000080",
    olive: "#808000",
    purple: "#800080",
    red: "#ff0000",
    silver: "#c0c0c0",
    teal: "#008080",
    white: "#ffffff",
    yellow: "#ffff00",
 
    // 4.2.3. "transparent" color keyword
    transparent: [ null, null, null, 0 ],
 
    _default: "#ffffff"
};
 
});
