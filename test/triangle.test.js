const { Triangle } = require('../lib/triangle');
const { Color } = require('../lib/color');

describe('Triangle', () => {
    //Test to see if the triangle was created.
    describe('Create a valid Triangle.', () => {
        it("Creates a new Triangle.", () => {
            let triangle = new Triangle(new Color(255, 255, 255, 1), [50, 0], [0,100], [100,100]);
            expect(triangle).toEqual({color: {r: 255, g: 255, b: 255, a: 1}, pointA: {x: 50, y: 0}, pointB: {x: 0, y: 100}, pointC: {x: 100, y: 100}});
        });
    });
    //Test to see if the triangle was improperly created and created a default Triangle.
    describe('Create an invalid Triangle.', () => {
        it("Creates a default Triangle.", () => {
            let triangle = new Triangle([1, 0], new Color(255, 255, 255, 1), 'center', null);
            expect(triangle).toEqual({color: {r: 255, g: 0, b: 255, a: 1}, pointA: {x: 1, y: 0}, pointB: {x: 0, y: 2}, pointC: {x: 2, y: 2}});
        });
    });
    //Test to see if the expected svg/xml text is returned.
    describe('Valid Render()', () => {
        it("Returns SVG element as a string.", () => {
            let triangle = new Triangle(new Color(255, 255, 255, 1), [50, 0], [0,100], [100,100]);
            expect(triangle.render()).toEqual('<polygon points = "50, 0 0, 100 100, 100" fill="rgba(255, 255, 255, 1)"/>');
        });
    });
    //Test to see if the improperly created triangle returns default svg/xml text.
    describe('Invalid Render()', () => {
        it("Returns SVG element as a string.", () => {
            let triangle = new Triangle([1, 0], new Color(255, 255, 255, 1), 'center', null);
            expect(triangle.render()).toEqual('<polygon points = "1, 0 0, 2 2, 2" fill="rgba(255, 0, 255, 1)"/>');
        });
    });
});