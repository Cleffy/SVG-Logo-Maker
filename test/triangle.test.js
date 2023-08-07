const { Triangle } = require('../lib/triangle');
const { Color } = require('../lib/color');

describe('Triangle', () => {
    describe('Create a valid Triangle.', () => {
        it("Creates a new Triangle.", () => {
            let triangle = new Triangle(new Color(255, 255, 255, 1), [1, 0], [0,2], [2,2]);
            expect(triangle).toEqual({color: {r: 255, g: 255, b: 255, a: 1}, pointA: {x: 1, y: 0}, pointB: {x: 0, y: 2}, pointC: {x: 2, y: 2}});
        });
    });
});