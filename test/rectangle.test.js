const { Rectangle } = require('../lib/rectangle');
const { Color } = require('../lib/color');

describe('Rectangle', () => {
    describe('Create a valid Rectangle.', () => {
        it("Creates a new Rectangle.", () => {
            let rectangle = new Rectangle(new Color(255, 255, 255, 1), 1, 1, 100, 100);
            expect(rectangle).toEqual({color: {r: 255, g: 255, b: 255, a: 1}, x: 1, y: 1, width: 100, height: 100});
        });
    });

    describe('Create an invalid Rectangle.', () => {
        it("Creates a default Rectangle.", () => {
            let rectangle = new Rectangle('Red', 'one', new Rectangle(new Color(255, 255, 255, 1), 1, 1, 100, 100), 'foo', null);
            expect(rectangle).toEqual({color: {r: 255, g: 0, b: 255, a: 1}, x: 0, y: 0, width: 1, height: 1});
        });
    });

    describe('Valid Render()', () => {
        it("Returns SVG element as a string.", () => {
            let rectangle = new Rectangle(new Color(255, 255, 255, 1), 1, 1, 100, 100);
            expect(rectangle.render()).toEqual('<rect x="1" y="1" width="100" height="100" fill="rgba(255, 255, 255, 1)"/>');
        });
    });

    describe('Invalid Render()', () => {
        it("Returns default SVG element as a string.", () => {
            let rectangle = new Rectangle('Red', 'one', new Rectangle(new Color(255, 255, 255, 1), 1, 1, 100, 100), 'foo', null);
            expect(rectangle.render()).toEqual('<rect x="0" y="0" width="1" height="1" fill="rgba(255, 0, 255, 1)"/>');
        });
    });
});