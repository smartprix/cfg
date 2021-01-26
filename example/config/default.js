const config = {
	$privateConfigFile: `${__dirname}/app/${process.env.APP_NAME}`,
	configSrc: 'default',
};

/** @typedef {typeof config} ConfigType */
/** @typedef {Partial<ConfigType>} ConfigOverride */

module.exports = config;
