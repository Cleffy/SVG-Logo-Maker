const { Shape } = require('./shape');

/**
 * @class Rectangle extends Shape
 * @classdesc Holds dimension, position and color information for an SVG rectangle and builds the svg/xml text
 * @property {Color} color      -Color of the Rectangle
 * @property {Number} x         -The x coordinate of the upper left corner of the Rectangle
 * @property {Number} y         -The y coordinate of the upper left corner of the Rectangle
 * @property {Number} width     -The width of the Rectangle
 * @property {Number} height    -The height of the Rectangle
 * @method render()             -Returns the svg/xml text to draw this Rectangle
 */
class Rectangle extends Shape{
    constructor(color, x, y, width, height){
        super(color);
        isNaN(x) || x == null ? this.x = 0: this.x = x;
        isNaN(y) || y == null ? this.y = 0: this.y = y;
        isNaN(width) || width == null ? this.width = 1: this.width = width;
        isNaN(height) || height == null ? this.height = 1: this.height = height;
    }
    render(){
        return `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="${this.color.getColor()}"/>`;
    }
}

module.exports = { Rectangle };