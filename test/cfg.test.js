/* eslint-disable no-unused-expressions */
/* eslint-env mocha, node */

const {expect} = require('chai');
const cfg = require('../index');

describe('cfg', () => {
	it('should get and set values', async () => {
		cfg.set('a.b', 'c');
		expect(cfg('a')).to.deep.equal({b: 'c'});
		expect(cfg('a.b')).to.equal('c');
		expect(cfg('a.b.c', 'd')).to.equal('d');
	});

	it('should merge values', () => {
		cfg.file(`${__dirname}/config.json`);
		expect(cfg('a.b')).to.equal('c');
		expect(cfg('test')).to.equal('data');
	});

	it('should overwrite values', () => {
		cfg.file(`${__dirname}/config.json`, {overwrite: true});
		expect(cfg('a.b')).to.equal(undefined);
		expect(cfg('test')).to.equal('data');
	});

	it('should return correct env', () => {
		expect(cfg.env()).to.equal('test');
		expect(cfg.isTest()).to.equal(true);
		expect(cfg.isDev()).to.equal(true);
		expect(cfg.isCI()).to.equal(!!process.env.CI);
	});

	it('should allow to change env', () => {
		process.env.NODE_ENV = 'production';
		expect(cfg.isDev()).to.equal(false);
		expect(cfg.isProd()).to.equal(true);
		expect(cfg.isProdLike()).to.equal(true);
		process.env.CI = '1';
		expect(cfg.isCI()).to.equal(true);
		process.env.NODE_ENV = 'test';
		process.env.CI = '';
		expect(cfg.isProd()).to.equal(false);
		expect(cfg.isCI()).to.equal(false);
	});

	it('should get whole config object', async () => {
		expect(cfg._getConfig()).to.deep.equal({
			test: 'data',
		});
	});

	it('should correctly merge objects & arrays', () => {
		cfg.merge({
			testMerge: {
				a: {
					a1: [1, {a11: 2}, 3],
					a2: 'a21',
					a3: {a31: 'x', a32: [1, 2]}
				},
				get b() { return {b1: 1} },
				c: 1,
			},
		});
		cfg.merge({
			testMerge: {
				a: {
					a1: [{a11: 3}],
					a3: {a32: [1, 2], a33: 'x'},
				},
				get b() { return {b2: this.a.a1[0].a11} },
				c: {c1: 1},
			},
		});
		expect(cfg('testMerge')).to.deep.equal({
			a: {
				a1: [{a11: 3}],
				a2: 'a21',
				a3: {a31: 'x', a32: [1, 2], a33: 'x'},
			},
			b: {b2: 3},
			c: {c1: 1},
		});
	});
});
