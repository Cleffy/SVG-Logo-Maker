const { Color } = require('./color');

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