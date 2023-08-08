const { Color } = require('./color');

/**
 * @class Shape
 * @classdesc Parent of other shapes, holds color data
 * @property {Color} color  -Color of the shape.
 * @method setColor(color)  -Sets a new color for the shape.
 */
class Shape{

    constructor(color){
        if(color instanceof Color){
            this.color = color;
        }
        else{
            this.color = new Color(255, 0, 255, 1);
        }
    }
    setColor(color){
        if(color instanceof Color){
            this.color = color;
        }
    }
}

module.exports = { Shape };