const { Shape } = require('./shape');

class Rectangle extends Shape{
    constructor(color, x, y, width, height){
        super(color);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    render(){
        return `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="${this.color.getColor()}"/>`;
    }
}

module.exports = { Rectangle };