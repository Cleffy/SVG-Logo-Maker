
const { describe } = require('node:test');
const index = require('../index.js');
const inquirer = require('inquirer');

jest.mock('inquirer');
describe('Index', () => {
    describe('getInitials', () => {
        it("Should successfully return three initials", () => {
            inquirer.prompt = jest.fn().mockResolvedValue({ initials: 'ABC' });

            expect(index.getInitials()).toBe('ABC');
        });
    });
});