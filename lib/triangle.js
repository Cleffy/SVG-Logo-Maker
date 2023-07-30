const shape = require('./shape');
class Point{
    constructor(x, y){
        this.x = x;
        this.y = y
    }
}
class Triangle extends shape.Shape{
    constructor(color, pointA, pointB, pointC){
        super(color);
        this.pointA = new Point(pointA[0], pointA[1]);
        this.pointB = new Point(pointB[0], pointB[1]);
        this.pointC = new Point(pointC[0], pointC[1]);
    }
    render(){
        return `<polygon points = "${this.pointA.x}, ${this.pointA.y} ${this.pointB.x}, ${this.pointB.y} ${this.pointC.x}, ${this.pointC.y}" fill="${this.color.getColor()}"/>`;
    }
}

module.exports = { Triangle };