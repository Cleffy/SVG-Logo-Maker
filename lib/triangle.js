const { Shape } = require('./shape');

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y
    }
}
class Triangle extends Shape{
    constructor(color, pointA, pointB, pointC){
        super(color);
        if(!Array.isArray(pointA) || (isNaN(pointA[0]) || pointA[0] == null || isNaN(pointA[1]) || pointA[1] == null)) {
            this.pointA = new Point(1, 0);
        }
        else {
            this.pointA = new Point(pointA[0], pointA[1]);
        }
        if(!Array.isArray(pointB) || (isNaN(pointB[0]) || pointB[0] == null || isNaN(pointB[1]) || pointB[1] == null)) {
            this.pointB = new Point(0, 2);
        }
        else {
            this.pointB = new Point(pointB[0], pointB[1]);
        }
        if(!Array.isArray(pointC) || (isNaN(pointC[0]) || pointC[0] == null || isNaN(pointC[1]) || pointC[1] == null)) {
            this.pointC = new Point(2, 2);
        }
        else {
            this.pointC = new Point(pointC[0], pointC[1]);
        }
    }
    render(){
        return `<polygon points = "${this.pointA.x}, ${this.pointA.y} ${this.pointB.x}, ${this.pointB.y} ${this.pointC.x}, ${this.pointC.y}" fill="${this.color.getColor()}"/>`;
    }
}

module.exports = { Triangle };