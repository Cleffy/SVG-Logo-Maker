const { Color } = require('../lib/color');

describe('Color', () => {
    //Tests to see if a valid color is created.
    describe('Create a valid color.', () => {
        it("Creates a new color.", () => {
            let color = new Color(255, 255, 255, 1);
            expect(color).toEqual({r: 255, g: 255, b: 255, a: 1});
        });
    });
    //Tests to see if an invalid color creates a default color.
    describe('Create an invalid color.', () => {
        it("Creates default values if incorrect parameters are inputted.", () => {
            let color = new Color(256, -12, 322, 2);
            expect(color).toEqual({r: 255, g: 0, b: 255, a: 1});
        });
    });
    //Tests to see if a valid color is returned with getColor().
    describe('Get a valid color.', () => {
        it("Returns the correct color.", () => {
            let color = new Color(255, 255, 255, 1);
            expect(color.getColor()).toEqual('rgba(255, 255, 255, 1)');
        });
    });
    //Tests to see if a default color is returned with getColor().
    describe('Get an invalid color.', () => {
        it("Returns default values.", () => {
            let color = new Color(256, -12, 322, 2);
            expect(color.getColor()).toEqual('rgba(255, 0, 255, 1)');
        });
    });
});