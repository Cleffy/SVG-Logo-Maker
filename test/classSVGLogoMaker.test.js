
const SVGLogoMaker = require('../lib/classSVGLogoMaker');
const inquirer = require('inquirer');

jest.mock('inquirer');

describe('SVGLogoMaker', () => {
    const svgLogoMaker = new SVGLogoMaker.SVGLogoMaker();

    it("Adds a 3 character initial to svgLogoMaker.", async () => {
        inquirer.prompt = jest.fn().mockResolvedValue({ initials: 'ABC'});
        await svgLogoMaker.getInitials();
        expect(svgLogoMaker.initials).toBe('ABC');
    });
    /* Infinite loop
    it("Function should reiterate.", async () => {
        inquirer.prompt = jest.fn().mockResolvedValue({ initials: 'ABCD'});
        expect(svgLogoMaker.getInitials()).toHaveBeenCalled();
    });
    */
});