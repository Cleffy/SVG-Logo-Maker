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
            if(answer.color.length === 6 && !isNaN(Number('0x' + answer.color))){
                this.color = '#' + answer.color;
            }
            else if(CSSNamedColors[answer.color] != undefined){
                this.color = CSSNamedColors[answer.color].hex;
            }
            else if(answer.color.length === 7 && answer.color.startsWith('#') && !isNaN(Number('0x' + answer.color.substring(1, 6)))){
                this.color = answer.color;
            }
            else{
                console.log("You did not enter a valid color keyword or hexadecimal value.");
                await this.getColor();
            }
        });
    }
}

module.exports = { SVGLogoMaker };