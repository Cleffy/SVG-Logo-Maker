const { Shape } = require('./shape');

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