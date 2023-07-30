const shape = require('./shape');

class Circle extends shape.Shape{
    constructor(color, centerX, centerY, radius){
        super(color);
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }
    render(){
        return `<circle cx="${this.centerX}" cy="${this.centerY}" r="${this.radius}" fill="${this.color.getColor()}"/>`;
    }
}

module.exports = { Circle };