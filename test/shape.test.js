const { Color } = require('../lib/color');
const { Shape } = require('../lib/shape');

describe('Shape', () => {
    //Tests to see if a shape is properly created.
    describe('Create a valid shape', () => {
        it("Creates default values when it doesn't receive a color.", () => {
            let shape = new Shape('A Color');
            expect(shape.color).toEqual({r: 255, g: 0, b: 255, a: 1});
        });
    });
    //Tests to see if an invalid shape has default values.
    describe('Create an invalid shape', () => {
        it("Creates default values when it doesn't receive a color.", () => {
            let shape = new Shape(new Color(255, 255, 255, 1));
            expect(shape.color).toEqual({r: 255, g: 255, b: 255, a: 1});
        });
    });
    //Tests to see if a valid color is properly passed to setColor().
    describe('Set a valid new color', () => {
        it("Sets a new color to the shape.", () => {
            let shape = new Shape(new Color(255, 255, 255, 1));
            shape.setColor(new Color(128, 128, 128, 1));
            expect(shape.color).toEqual({r: 128, g: 128, b: 128, a: 1});
        });
    });
    //Tests to see if an invalid color passed to setColor() doesn't change the color.
    describe('Set invalid new color', () => {
        it("Ignores an invalid input.", () => {
            let shape = new Shape(new Color(255, 255, 255, 1));
            shape.setColor('A Color');
            expect(shape.color).toEqual({r: 255, g: 255, b: 255, a: 1});
        });
    });
});