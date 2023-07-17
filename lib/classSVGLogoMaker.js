const inquirer = require('inquirer');
const fs = require ('fs');

/**
 * 
 */
class SVGLogoMaker{
    constructor(){
        this.initials;
    }
    /**
     * 
     */
    async buildLogo(){
        try{
            await this.getInitials();
            console.log(this.initials);
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
                message: 'Enter up to three characters to place in the center of the logo.',
            },
        ]).then((answers) => {
            if(answers.initials.length < 1){
                console.log("You didn't enter any characters.");
                return this.getInitials();
            }
            else if(answers.initials.length > 3){
                console.log("You entered more than 3 characters.");
                return this.getInitials();
            }
            else{
                this.initials = answers.initials;
            }
        });
    }
}

module.exports = { SVGLogoMaker };