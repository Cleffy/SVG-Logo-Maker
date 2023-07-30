const inquirer = require('inquirer');
const fs = require('fs');
const CSSNamedColors = require('../data/CSSNamedColors.json');
const triange = require('./triangle');
const circle = require('./circle');
const rectangle = require('./square');

/**
 * Color
 * Holds RGBA Data
 */
class Color{
    constructor(r, g, b, a){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    getColor(){
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}

/**
 * 
 */
class SVGLogoMaker{
    constructor(){
        this.initials;
        this.initialsColor;
        this.shape;
        this.shapeColor;
    }
    /**
     * 
     */
    async buildLogo(){
        try{
            this.initials = await this.getInitials();
            this.initialsColor = new Color(...await this.getColor('initials'));
            let pickedShape = await this.getShape();
            this.shapeColor = new Color(...await this.getColor('shape'));
            switch(pickedShape){
                case 'Circle':
                    this.shape = new circle.Circle(this.shapeColor, 128, 128, 64);
                    break;
                case 'Triangle':
                    this.shape = new triange.Triangle(this.shapeColor, [128, 0], [0, 256], [256, 256]);
                    break;
                case 'Square':
                    this.shape = new rectangle.Square(this.shapeColor, 1, 1, 256, 256);
                    break;
            }
            this.render();
            console.log(this.initials);
            console.log(this.initialsColor);
            console.log(this.shape);
            console.log(this.shapeColor);
        }
        catch(error){
            console.log(error);
        }
    }
    /**
     * getInitials()
     * Prompts the user to enter three characters
     * Returns three characters
     */
    async getInitials(){
        let pickedInitials;
        await inquirer.prompt([
            {
                type: 'input',
                name: 'initials',
                message: "Enter up to three characters to place in the center of the logo."
            }
        ]).then(async (answer) => {
            if(answer.initials.length < 1){
                console.log("You didn't enter any characters.");
                pickedInitials = await this.getInitials();
            }
            else if(answer.initials.length > 3){
                console.log("You entered more than 3 characters.");
                pickedInitials = await this.getInitials();
            }
            else{
                pickedInitials = answer.initials;
            }
        });
        return pickedInitials;
    }

    /**
     * getColor()
     * Prompts the user to enter a valid CSS color
     * Returns the color
     */
    async getColor(category){
        let pickedColor;
        await inquirer.prompt([
            {
                type: 'input',
                name: 'color',
                message: `Enter a CSS color keyword or hexadecimal value for the ${category}.`
            }
        ]).then(async (answer) => {
            let formattedAnswer = answer.color.toLowerCase().replace(/ \s/g, '');
            if(formattedAnswer.length === 6 && !isNaN(Number('0x' + formattedAnswer))){
                formattedAnswer = '#' + formattedAnswer;
            }
            if(CSSNamedColors[formattedAnswer] != undefined){
                formattedAnswer = CSSNamedColors[formattedAnswer].hex;
            }
            if(formattedAnswer.length === 7 && formattedAnswer.startsWith('#') && !isNaN(Number('0x' + formattedAnswer.substring(1, 6)))){
                pickedColor = this.hexToRGBA(formattedAnswer);
            }
            else{
                pickedColor = formattedAnswer.replace(/[^0-9,.]/g, '');
                pickedColor = pickedColor.split(',');
                console.log(pickedColor);
                if(pickedColor.length === 3){
                    pickedColor.push(1);
                }
                if(pickedColor.length === 4 && pickedColor[0] <= 255 && pickedColor[1] <= 255 && pickedColor[2] <= 255 && pickedColor[3] <= 1){
                    for(let i = 0; i < pickedColor.length; i++){
                        pickedColor[i] = Number(pickedColor[i]);
                    }
                    if(pickedColor[0] >= 1 || pickedColor[1] >= 1 || pickedColor[2] >= 1){
                        pickedColor[0] /= 255;
                        pickedColor[1] /= 255;
                        pickedColor[2] /= 255;
                    }
                }
                else{
                    console.log("You did not enter a valid color keyword or hexadecimal value.");
                    pickedColor = await this.getColor();
                }
            }
        });
        return pickedColor;
    }
    /**
     * hexToRGBA
     * parses a hex in a 3 dimensional array into an RGBA array
     * @param {*} hex 3-dimensional array with a hex value
     * @returns an RGBA array
     */
    hexToRGBA(hex){
        let r = parseInt(hex.slice(1,3), 16) / 255;
        let g = parseInt(hex.slice(3,5), 16) / 255;
        let b = parseInt(hex.slice(5,7), 16) / 255;
        return [r, g, b, 1];
    }

    async getShape(){
        let pickedShape;
        await inquirer.prompt([
            {
                type: 'list',
                name: 'shape',
                message: "Pick a shape for the SVG Image.",
                choices: ['Circle', 'Triangle', 'Square']
            }
        ]).then( (answer) => {
            pickedShape = answer.shape;
        });
        return pickedShape;
    }
    render(){
        let xmlText = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

            ${this.shape.render()}
            <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.color.getColor()}">${this.initials}</text>

        </svg>`;
        console.log(xmlText);
    }
}

module.exports = { SVGLogoMaker };