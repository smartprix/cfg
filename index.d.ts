declare module '@smpx/cfg' {

	/**
	 * Reads a config value
	 * @param key key to read, can be nested like `a.b.c`
	 * @param defaultValue value to return if key is not found
	 */
	function cfg<T = any>(key: string, defaultValue?: T): Readonly<T>

	// NOTE: Illegal function name 'delete' can't be used separately in namespace
	cfg.delete = (key: string) => void;

	namespace cfg {
		/**
		 * Reads a config value
		 * @param key
		 * @param defaultValue
		 */
		function get<T = any>(key: string, defaultValue?: T): Readonly<T>;

		/**
		 * Get the whole config object
		 * **NOTE:** Is not immutable, so don't write anything to it
		 */
		function _getConfig(): Readonly<{[key: string]: any}>;

		/**
		 * set values in global config
		 * returns previous value
		 */
		function set(key: string, value: any): any;

		/**
		 * set values in global config
		 * @param obj an object to assign all key values from it
		 */
		function set(obj: {[key: string]: any}): null;
		/**
		 * set values in global config with an object to assign all key values from it
		 * if a key already exists then it is merged with new value
		 * if obj is not an Object then nothing happens
		 */
		function merge(obj: {[key: string]: any}): null;

		/**
		 * set values in global config with an object to assign all key values from it
		 * if a key already exists then it is assigned with new value
		 * if obj is not an Object then nothing happens
		 */
		function assign(obj: {[key: string]: any}): null;
		/**
		 * **NOT AVAILABLE IN BROWSER**
		 * read config from a file, and merge with existing config
		 * @param file path of the file to read (only absolute paths)
		 * @param options
		 * @param options.ignoreErrors ignore all errors
		 * @param options.ignoreNotFound ignore if file not found
		 * @param options.overwrite Overwrite config not merge
		 */
		function file(file: string, options?: {
			ignoreErrors?: boolean,
			ignoreNotFound?: boolean,
			overwrite?: boolean
		}): void;

		/**
		 * **NOT AVAILABLE IN BROWSER**
		 * read the file specified by the key, and then cache it
		 * @param key
		 */
		function read(key: string): any;

		/**
		 * Returns current env
		 */
		function getEnv(): string;
		/**
		 * Returns current env
		 */
		function env(): string;

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

		/**
		 * returns true when process.env.CI is truthy
		 */
		function isCI(): boolean;
	}

	export default cfg;
}
