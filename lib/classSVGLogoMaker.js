const inquirer = require('inquirer');
const fs = require ('fs');

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
        ]).then((answer) => {
            if(answer.initials.length < 1){
                console.log("You didn't enter any characters.");
                this.initials = this.getInitials();
            }
            else if(answer.initials.length > 3){
                console.log("You entered more than 3 characters.");
                this.initials = this.getInitials();
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
        ]).then((answer) => {
            let potentialColor;
            if(answer.color.length === 6 && !isNaN(Number('0x' + answer.color))){
                potentialColor = '#' + answer.color;
            }
            else{
                potentialColor = answer.color;
            }
            if(('color', potentialColor)){
                this.color = potentialColor;
            }
            else{
                console.log("You did not enter a valid color keyword or hexadecimal value.");
                this.color = this.getColor();
            }
        });
    }
}

module.exports = { SVGLogoMaker };