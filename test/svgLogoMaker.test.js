
const { SVGLogoMaker } = require('../lib/svgLogoMaker');
const inquirer = require('inquirer');
const CSSNamedColors = require('../data/CSSNamedColors.json');

jest.mock('inquirer');

describe('SVGLogoMaker', () => {
    const svgLogoMaker = new SVGLogoMaker();

    describe('Valid getInitials() user answer.', () => {
        it("Adds a 3 character initial to svgLogoMaker.", async () => {
            inquirer.prompt = jest.fn().mockResolvedValueOnce({initials: 'ABC'});
            let initials = await svgLogoMaker.getInitials();
            expect(initials).toBe('ABC');
        });
    });
    describe('Invalid getInitials() user answer.', () => {
        it("Function should reiterate until true.", async () => {
            const spy = jest.spyOn(svgLogoMaker, "getInitials");
            console.log = jest.fn();
            inquirer.prompt = jest.fn()
                .mockResolvedValueOnce({initials: 'ABCD'})
                .mockResolvedValueOnce({initials: ''})
                .mockResolvedValueOnce({initials: 'ABC'});
            let initials = await svgLogoMaker.getInitials();
            expect(console.log).toHaveBeenCalledWith(expect.stringMatching("You entered more than 3 characters."));
            expect(console.log).toHaveBeenCalledWith(expect.stringMatching("You didn't enter any characters."));
            expect(initials).toBe('ABC');
            expect(spy).toHaveBeenCalledTimes(3);
        });
    });

    describe('Valid getColor() user answer from CSS Named Color.', () => {
        let cssColors = Object.keys(CSSNamedColors);
        cssColors.forEach((cssColor) => {
            it("Creates a 4 variable array equivalent to an RGBA Color.", async () => {
                inquirer.prompt = jest.fn().mockResolvedValueOnce({color: cssColor});
                let color = await svgLogoMaker.getColor('test');
                let predictedColor = svgLogoMaker.hexToRGBA(CSSNamedColors[cssColor].hex);
                expect(color).toStrictEqual(predictedColor);
            });
            it("Creates a 4 variable array equivalent to an RGBA Color.", async () => {
                inquirer.prompt = jest.fn().mockResolvedValueOnce({color: cssColor.toUpperCase()});
                let color = await svgLogoMaker.getColor('test');
                let predictedColor = svgLogoMaker.hexToRGBA(CSSNamedColors[cssColor].hex);
                expect(color).toStrictEqual(predictedColor);
            });
        });
    });
    describe('Valid getColor() user answer from RGB int format.', () => {
        it("Creates a 4 variable array equivalent to an RGBA Color.", async () => {
            inquirer.prompt = jest.fn().mockResolvedValueOnce({color: '255, 0, 128'});
            let color = await svgLogoMaker.getColor('test');
            let predictedColor = [255, 0, 128, 1];
            expect(color).toEqual(predictedColor);
        });
    });
    describe('Valid getColor() user answer from RGBA int format.', () => {
        it("Creates a 4 variable array equivalent to an RGBA Color.", async () => {
            inquirer.prompt = jest.fn().mockResolvedValueOnce({color: '255, 0, 128, 1'});
            let color = await svgLogoMaker.getColor('test');
            let predictedColor = [255, 0, 128, 1];
            expect(color).toEqual(predictedColor);
        });
    });
    describe('Valid getColor() user answer from negative RGBA int format.', () => {
        it("Creates a 4 variable array equivalent to an RGBA Color.", async () => {
            inquirer.prompt = jest.fn().mockResolvedValueOnce({color: '-255, -0, -128, -1'});
            let color = await svgLogoMaker.getColor('test');
            let predictedColor = [255, 0, 128, 1];
            expect(color).toEqual(predictedColor);
        });
    });
    describe('Valid getColor() user answer from RGB float format.', () => {
        it("Creates a 4 variable array equivalent to an RGBA Color.", async () => {
            inquirer.prompt = jest.fn().mockResolvedValueOnce({color: '1, 0, 0.5'});
            let color = await svgLogoMaker.getColor('test');
            let predictedColor = [255, 0, 127.5, 1];
            expect(color).toEqual(predictedColor);
        });
    });
    describe('Valid getColor() user answer from RGBA float format.', () => {
        it("Creates a 4 variable array equivalent to an RGBA Color.", async () => {
            inquirer.prompt = jest.fn().mockResolvedValueOnce({color: '1, 0, 0.5, 1'});
            let color = await svgLogoMaker.getColor('test');
            let predictedColor = [255, 0, 127.5, 1];
            expect(color).toEqual(predictedColor);
        });
    });
    describe('Valid getColor() user answer from #hex format.', () => {
        it("Creates a 4 variable array equivalent to an RGBA Color.", async () => {
            inquirer.prompt = jest.fn().mockResolvedValueOnce({color: '#ff0080'});
            let color = await svgLogoMaker.getColor('test');
            let predictedColor = [255, 0, 128, 1];
            expect(color).toEqual(predictedColor);
        });
    });
    describe('Valid getColor() user answer from hex format.', () => {
        it("Creates a 4 variable array equivalent to an RGBA Color.", async () => {
            inquirer.prompt = jest.fn().mockResolvedValueOnce({color: 'ff0080'});
            let color = await svgLogoMaker.getColor('test');
            let predictedColor = [255, 0, 128, 1];
            expect(color).toEqual(predictedColor);
        });
    });
    describe('Invalid getColor() user answer.', () => {
        it("Function should reiterate until true.", async () => {
            const spy = jest.spyOn(svgLogoMaker, "getColor");
            console.log = jest.fn();
            inquirer.prompt = jest.fn()
                .mockResolvedValueOnce({color: 'fg0080'})
                .mockResolvedValueOnce({color: 'Berry'})
                .mockResolvedValueOnce({color: ''})
                .mockResolvedValueOnce({color: '256, 0, 128'})
                .mockResolvedValueOnce({color: '255, 0, 128, 1, 10'})
                .mockResolvedValueOnce({color: '255, 0, 128, 2'})
                .mockResolvedValueOnce({color: '255, 0, 128, 1'});
            let color = await svgLogoMaker.getColor('test');
            let predictedColor = [255, 0, 128, 1];
            expect(console.log).toHaveBeenCalledWith(expect.stringMatching("You did not enter a valid color keyword or hexadecimal value."));
            expect(color).toEqual(predictedColor);
            expect(spy).toHaveBeenCalledTimes(7);
        });
    });

    describe('Circle getShape() user answer.', () => {
        it("Returns 'Circle'.", async () => {
            inquirer.prompt = jest.fn().mockResolvedValueOnce({shape: 'Circle'});
            let shape = await svgLogoMaker.getShape();
            expect(shape).toEqual('Circle');
        });
    });
    describe('Triangle getShape() user answer.', () => {
        it("Returns 'Triangle'.", async () => {
            inquirer.prompt = jest.fn().mockResolvedValueOnce({shape: 'Triangle'});
            let shape = await svgLogoMaker.getShape();
            expect(shape).toEqual('Triangle');
        });
    });
    describe('Square getShape() user answer.', () => {
        it("Returns 'Square'.", async () => {
            inquirer.prompt = jest.fn().mockResolvedValueOnce({shape: 'Square'});
            let shape = await svgLogoMaker.getShape();
            expect(shape).toEqual('Square');
        });
    });
});