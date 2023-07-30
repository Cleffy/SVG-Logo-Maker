const inquirer = require('inquirer');
const fs = require('fs');
const CSSNamedColors = require('../data/CSSNamedColors.json');

/**
 * 
 */
class SVGLogoMaker{
    constructor(){
        this.initials;
        this.color;
    }
    /**
     * 
     */
    async buildLogo(){
        try{
            await this.getInitials();
            await this.getColor();
            console.log(this.initials);
            console.log(this.color);
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
        await inquirer.prompt([
            {
                type: 'input',
                name: 'initials',
                message: "Enter up to three characters to place in the center of the logo."
            }
        ]).then(async (answer) => {
            if(answer.initials.length < 1){
                console.log("You didn't enter any characters.");
                await this.getInitials();
            }
            else if(answer.initials.length > 3){
                console.log("You entered more than 3 characters.");
                await this.getInitials();
            }
            else{
                this.initials = answer.initials;
            }
        });
    }

    /**
     * getColor()
     * Prompts the user to enter a valid CSS color
     * Returns the color
     */
    async getColor(){
        await inquirer.prompt([
            {
                type: 'input',
                name: 'color',
                message: "Enter a CSS color keyword or hexadecimal value."
            }
        ]).then(async (answer) => {
            let inputedColor = answer.color.toLowerCase();
            inputedColor = inputedColor.replace(/ \s/g, '');
            if(inputedColor.length === 6 && !isNaN(Number('0x' + inputedColor))){
                this.color = this.hexToRGBA('#' + inputedColor);
            }
            else if(inputedColor.length === 7 && inputedColor.startsWith('#') && !isNaN(Number('0x' + inputedColor.substring(1, 6)))){
                this.color = this.hexToRGBA(inputedColor);
            }
            else if(CSSNamedColors[inputedColor] != undefined){
                this.color = this.hexToRGBA(CSSNamedColors[inputedColor].hex);
            }
            else{
                let rgbaCheck = inputedColor.replace(/ [^0-9,.]/g, '').split(',');
                if(rgbaCheck.length === 3){
                    rgbaCheck.push(1);
                }
                if(rgbaCheck.length === 4 && rgbaCheck[0] < 256 && rgbaCheck[1] < 256 && rgbaCheck[2] < 256 && rgbaCheck[3] <= 1){
                    for(let i = 0; i < rgbaCheck.length; i++){
                        rgbaCheck[i] = Number(rgbaCheck[i]);
                    }
                    if(rgbaCheck[0] <= 1 && rgbaCheck[1] <= 1 && rgbaCheck[2] <= 1){
                        rgbaCheck[0] *= 255;
                        rgbaCheck[1] *= 255;
                        rgbaCheck[2] *= 255;
                    }
                    this.color = rgbaCheck;
                }
                else{
                    console.log("You did not enter a valid color keyword or hexadecimal value.");
                    await this.getColor();
                }
            }
        });
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
}

module.exports = { SVGLogoMaker };