
import SVGLogoMaker from '../lib/classSVGLogoMaker.js';
import inquirer from 'inquirer';
import sinon from 'sinon';

describe('SVGLogoMaker', () => {
    const svgLogoMaker = new SVGLogoMaker.SVGLogoMaker();

    it("Adds a 3 character initial to svgLogoMaker.", () => {
        const inquirerSpy = sinon.spy();
        await inquirer.prompt();
        expect(svgLogoMaker.initials).toBe('ABC');
    });

});
