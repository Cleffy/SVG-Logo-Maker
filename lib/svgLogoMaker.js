const inquirer = require('inquirer');
const fs = require('fs');
const CSSNamedColors = require('../data/CSSNamedColors.json');
const { Triangle } = require('./triangle');
const { Circle } = require('./circle');
const { Rectangle } = require('./rectangle');
const { Color } = require('./color');

/**
 * @class SVGLogoMaker
 * @classdesc Asks user for information on an SVG Logo, and builds it.
 * @property {string} initials      -Text for svg logo
 * @property {Color} initialsColor  -Color of initials
 * @property {Number} initialsX     -X coordinate of initials
 * @property {Number} initialsY     -Y coordinate of initials
 * @property {Shape} shape          -Shape for svg logo
 * @property {Color} shapeColor     -Color of shape
 * @method buildLogo()              -Orders each method to build a Logo
 * @method getInitials()            -Asks the user for up to 3 characters
 * @method getColor()               -Asks the user for a color as a CSS color name, hex, or RGB
 * @method hexToRGBA()              -Converts hex to RGBA
 * @method getShape()               -Asks the user for the shape.
 * @method render()                 -Creates svg/xml format text and writes it to a .svg file
 */
class SVGLogoMaker{
    constructor(){
        this.initials;
        this.initialsColor;
        this.initialsX;
        this.initialsY;
        this.shape;
        this.shapeColor;
    }
    /**
     * buildLogo()
     * Orders each method to build a Logo
     */
    async buildLogo(){
        try{
            this.initials = await this.getInitials();
            this.initialsColor = new Color(...await this.getColor('initials'));
            let pickedShape = await this.getShape();
            this.shapeColor = new Color(...await this.getColor('shape'));
            switch(pickedShape){
                case 'Circle':
                    this.shape = new Circle(this.shapeColor, 150, 100, 64);
                    this.initialsX = 150;
                    this.initialsY = 100;
                    break;
                case 'Triangle':
                    this.shape = new Triangle(this.shapeColor, [150, 36], [86, 164], [214, 164]);
                    this.initialsX = 150;
                    this.initialsY = 145;
                    break;
                case 'Square':
                    this.shape = new Rectangle(this.shapeColor, 86, 36, 128, 128);
                    this.initialsX = 150;
                    this.initialsY = 100;
                    break;
            }
            this.render();
        }
        catch(error){
            console.log(error);
        }
    }
    /**
     * getInitials()
     * Prompts the user to enter three characters
     * @returns up to three characters
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
     * @param {string} category -initials or shape
     * @returns an RGBA array
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
                    //known issue 1,1,1 will create white if the user intended barely not black
                    if(pickedColor[0] <= 1 && pickedColor[0] >= 0){
                        if(pickedColor[1] <= 1 && pickedColor[1] >= 0){
                            if(pickedColor[2] <= 1 && pickedColor[2] >= 0){ 
                                pickedColor[0] *= 255;
                                pickedColor[1] *= 255;
                                pickedColor[2] *= 255;
                            }
                        }
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
        let r = parseInt(hex.slice(1,3), 16);
        let g = parseInt(hex.slice(3,5), 16);
        let b = parseInt(hex.slice(5,7), 16);
        return [r, g, b, 1];
    }

    /**
     * getShape()
     * Asks the user for the shape
     * @returns 'Circle', 'Triangle', or 'Square'
     */
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

    /**
     * render()
     * creates ../examples/logo.svg
     */
    render(){
        let xmlText = 
`<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="white" />
    ${this.shape.render()}
    <text x="${this.initialsX}" y="${this.initialsY}" font-size="48" text-anchor="middle" dominant-baseline="central" font-family="serif" fill="${this.initialsColor.getColor()}">${this.initials}</text>

</svg>`;
        fs.writeFile(__dirname + '/../examples/logo.svg' , xmlText, (error) => {
            if(error){
                console.error(error);
            }
            else{
                console.log('Generated logo.svg');
            }
        });
    }
}

module.exports = { SVGLogoMaker };