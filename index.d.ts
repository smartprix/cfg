/**
 * Reads a config value
 * @param key key to read, can be nested like `a.b.c`
 * @param defaultValue value to return if key is not found
 */
function cfg(key: string, defaultValue?: any): any;

namespace cfg {
	/**
	 * Reads a config value
	 * @param key
	 * @param defaultValue
	 */
	function get(key: string, defaultValue: any): any;

	/**
	 * Get the whole config object
	 * Is not immutable, so don't write anything to it
	 */
	function _getConfig(): object;

	/**
	 * set values in global config
	 * you can also give key as an object to assign all key values from it
	 */
	function set(key: object | string, value: any): any;

	/**
	 * set values in global config with an object to assign all key values from it
	 * if a key already exists then it is merged with new value
	 * if obj is not an Object then nothing happens
	 */
	function merge(obj: object): void;

	/**
	 * set values in global config with an object to assign all key values from it
	 * if a key already exists then it is assigned with new value
	 * if obj is not an Object then nothing happens
	 */
	function assign(obj: object): void;

	/* Illegal function name 'delete' can't be used here
	delete: (key: string) => void;
	*/

	/**
	 * read config from a file, and merge with existing config
	 * @param file path of the file to read (only absolute paths)
	 * @param options
	 * @param options.ignoreErrors ignore all errors
	 * @param options.ignoreNotFound ignore if file not found
	 * @param options.overwrite Overwrite config not merge
	 */
	function file(file: string, options: {
		ignoreErrors: boolean,
		ignoreNotFound: boolean,
		overwrite: boolean
	}): void;

	/**
	 * read the file specified by the key, and then cache it
	 * @param key
	 */
	function read(key: string): any;

	/**
	 * Returns current env
	 */
	function env(): string;
	function getEnv(): string;

	/**
	 * Returns true if env is production
	 */
	function isProduction(): boolean;
	function isProd(): boolean;
	function isStaging(): boolean;

	/**
	 * Returns true if env is production or staging
	 */
	function isProductionLike(): boolean;
	function isProdLike(): boolean;

	function isTest(): boolean;

	/**
	 * returns true in environments not 'staging' or 'production'
	 */
	function isDev(): boolean;
	function isDevelopment(): boolean;
}
