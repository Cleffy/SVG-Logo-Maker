const { Shape } = require('./shape');

/**
 * @class Circle extends Shape
 * @classdesc Holds dimension, position and color information for an SVG circle and builds the svg/xml text
 * @property {Color} color      -Color of the Circle
 * @property {Number} centerX   -The x coordinate for the center of the Circle
 * @property {Number} centerY   -The y coordinate for the center of the Circle
 * @property {Number} radius    -The radius of the Circle
 * @method render()             -Returns the svg/xml text to draw this Circle
 */
class Circle extends Shape{
    constructor(color, centerX, centerY, radius){
        super(color);
        isNaN(centerX) || centerX == null ? this.centerX = 1 : this.centerX = centerX;
        isNaN(centerY) || centerY == null ? this.centerY = 1 : this.centerY = centerY;
        isNaN(radius) || radius == null ? this.radius = 1 : this.radius = radius;
    }
    render(){
        return `<circle cx="${this.centerX}" cy="${this.centerY}" r="${this.radius}" fill="${this.color.getColor()}"/>`;
    }
}

module.exports = { Circle };