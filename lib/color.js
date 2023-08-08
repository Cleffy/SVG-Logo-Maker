/**
 * @class Color
 * @classdesc Holds RGBA Data
 * @property {Number} r     -Red Value of the color
 * @property {Number} g     -Green Value of the color
 * @property {Number} b     -Blue Value of the color
 * @property {Number} a     -Alpha Value of the color
 * @method getColor()       -Returns the rgba color as a string
 */
class Color{
    constructor(r, g, b, a){
        r <= 255 && r >= 0 ? this.r = r : this.r = 255;
        g <= 255 && g >= 0 ? this.g = g : this.g = 0;
        b <= 255 && b >= 0 ? this.b = b : this.b = 255;
        a <= 1 && a >= 0 ? this.a = a : this.a = 1;
    }
    getColor(){
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}

module.exports = { Color };