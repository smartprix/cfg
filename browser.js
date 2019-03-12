/* eslint-env browser */
import get from 'lodash/get';
import set from 'lodash/set';

let config = {};

// include default config
try {
	// `@` or `~` should be set as `sourcePath` alias in webpack config
	// this is already done in sm-webpack-config and vue-cli
	// eslint-disable-next-line global-require
	config = require('@/config.js');
}
catch (e) {
	try {
		// eslint-disable-next-line global-require
		config = require('~/config.js');
	}
	catch (e1) {
		// module not found
		// ignore
	}
}

const env = function () {
	return window.NODE_ENV || process.env.NODE_ENV || 'development';
};

/**
 * These are all available through cfg
 * @see cfg
 * @namespace config
 */

function isObject(obj) {
	return obj === Object(obj);
}

// merge configs, takes care of getters while merging
function merge(obj, src) {
	if (!src) return obj;

	Object.keys(src).forEach((key) => {
		const objVal = Object.getOwnPropertyDescriptor(obj, key);
		const srcVal = Object.getOwnPropertyDescriptor(src, key);

		if (
			objVal &&
			!objVal.get &&
			!srcVal.get &&
			isObject(srcVal.value) &&
			isObject(objVal.value)
		) {
			merge(obj[key], src[key]);
			return;
		}

		Object.defineProperty(obj, key, srcVal);
	});

	return obj;
}

/**
 * Reads a config value
 * @param {string} key key to read, can be nested like `a.b.c`
 * @param {*} defaultValue value to return if key is not found
 * @return {any}
 */
function cfg(key, defaultValue) {
	return get(config, key, defaultValue);
}

/**
 * @memberof config
 * @param {string} key
 * @param {any} defaultValue
 * @return {any}
 */
cfg.get = function (key, defaultValue) {
	return cfg(key, defaultValue);
};

/** set values in global config
 * you can also give key as an object to assign all key values from it
 * @memberof config
 * @return {any}
 */
cfg.set = function (key, value) {
	// if key is Object then merge it with existing config
	if (value === undefined && key instanceof Object) {
		Object.assign(config, key);
		Object.assign(config, key[`$env_${env()}`]);
		return null;
	}

	const prev = get(config, key);
	set(config, key, value);
	return prev;
};

/**
 * set values in global config with an object to assign all key values from it
 * if a key already exists then it is merged with new value
 * if obj is not an Object then nothing happens
 * @memberof config
 * @return {void}
 */
cfg.merge = function (obj) {
	if (obj instanceof Object) {
		merge(config, obj);
		merge(config, obj[`$env_${env()}`]);
	}
};

/**
 * set values in global config with an object to assign all key values from it
 * if a key already exists then it is assigned with new value
 * if obj is not an Object then nothing happens
 * @memberof config
 * @param {object} obj
 * @return {void}
 */
cfg.assign = function (obj) {
	if (obj instanceof Object) {
		Object.assign(config, obj);
		Object.assign(config, obj[`$env_${env()}`]);
	}
};

/**
 * @memberof config
 * @return {void}
 */
cfg.delete = function (key) {
	delete config[key];
};

/**
 * @memberof config
 * @return {boolean}
 */
cfg.isProduction = function () {
	return env() === 'production';
};

/**
 * @memberof config
 * @return {boolean}
 */
cfg.isStaging = function () {
	return env() === 'staging';
};

/**
 * Returns true if env is production or staging
 * @memberof config
 * @return {boolean}
 */
cfg.isProductionLike = function () {
	return (env() === 'production') || (env() === 'staging');
};

/**
 * @memberof config
 * @return {boolean}
 */
cfg.isTest = function () {
	return env() === 'test';
};

/**
 * @memberof config
 * @return {boolean}
 */
cfg.isDev = function () {
	return (env() !== 'production') && (env() !== 'staging');
};

/**
 * @memberof config
 * @returns {string}
 */
cfg.env = env;
/**
 * @memberof config
 * @return {string}
 */
cfg.getEnv = env;

cfg.isProd = cfg.isProduction;
cfg.isProdLike = cfg.isProductionLike;
cfg.isDevelopment = cfg.isDev;

export default cfg;
