
const { SVGLogoMaker } = require('../lib/svgLogoMaker');
const inquirer = require('inquirer');

jest.mock('inquirer');

describe('SVGLogoMaker', () => {
    const svgLogoMaker = new SVGLogoMaker();

    it("Adds a 3 character initial to svgLogoMaker.", async () => {
        inquirer.prompt = jest.fn().mockResolvedValue({ initials: 'ABC'});
        let initials = await svgLogoMaker.getInitials();
        expect(initials).toBe('ABC');
    });
    /* Infinite loop
    it("Function should reiterate.", async () => {
        inquirer.prompt = jest.fn().mockResolvedValue({ initials: 'ABCD'});
        expect(svgLogoMaker.getInitials()).toHaveBeenCalled();
    });
    */
});