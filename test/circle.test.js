const { Circle } = require('../lib/circle');
const { Color } = require('../lib/color');

describe('Circle', () => {
    //Test to see if the circle was created.
    describe('Create a valid Circle.', () => {
        it("Creates a new Circle.", () => {
            let circle = new Circle(new Color(255, 255, 255, 1), 100, 100, 100);
            expect(circle).toEqual({color: {r: 255, g: 255, b: 255, a: 1}, centerX: 100, centerY: 100, radius: 100});
        });
    });
    //Test to see if the circle was improperly created and created a default Circle.
    describe('Create an invalid Circle.', () => {
        it("Creates a default Circle.", () => {
            let circle = new Circle('Red', 'one', new Color(255, 255, 255, 1), null);
            expect(circle).toEqual({color: {r: 255, g: 0, b: 255, a: 1}, centerX: 1, centerY: 1, radius: 1});
        });
    });
    //Test to see if the expected svg/xml text is returned.
    describe('Valid Render()', () => {
        it("Returns SVG element as a string.", () => {
            let circle = new Circle(new Color(255, 255, 255, 1), 100, 100, 100);
            expect(circle.render()).toEqual('<circle cx="100" cy="100" r="100" fill="rgba(255, 255, 255, 1)"/>');
        });
    });
    //Test to see if the improperly created circle returns default svg/xml text.
    describe('Invalid Render()', () => {
        it("Returns default SVG element as a string.", () => {
            let circle = new Circle('Red', 'one', new Color(255, 255, 255, 1), null);
            expect(circle.render()).toEqual('<circle cx="1" cy="1" r="1" fill="rgba(255, 0, 255, 1)"/>');
        });
    });
});