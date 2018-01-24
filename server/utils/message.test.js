var expect = require('expect');

var {generateMessage} = require('./message');

describe('Generate Message', () => {
	it('should generate the correct message object', () => {
		var message = generateMessage('omar', 'text');
		expect(message.from).toBe('omar');
		expect(message.text).toBe('text');
		expect(typeof message.createdAt).toBe('number');
	});
});