var TornadoWebSocket, tws;

tws = function(path, options) {
    return new TornadoWebSocket(path, options);
};

TornadoWebSocket = (function() {

    /**
     * Initialize a new WebSocket object with given options.
     * @param {string}  path            Url of a django-tornado-websockets application
     * @param {Object}  options         Object options
     * @param {string}  options.host    Host used for connection
     * @param {number}  options.port    Port user for connection
     * @param {boolean} options.secure  Using 'ws' or 'wss' protocol
     */
    function TornadoWebSocket(path, options) {
        if (!(this instanceof TornadoWebSocket)) {
            return new TornadoWebSocket(path, options);
        }
        if (path === void 0) {
            throw new ReferenceError('You must pass "path" parameter during "TornadoWebSocket" instantiation.');
        }

        /**
         * WebSocket instance
         * @type {WebSocket}
         */
        this.websocket = null;

        /**
         * Configuration values
         * @type {object}
         * @private
         */
        this.options = _.merge({
            host: 'localhost',
            port: 8000,
            secure: false
        }, options);

        /**
         * Path of a django-tornado-websockets application
         * @type {string}
         * @private
         */
        this.path = path.trim();
        this.path = this.path[0] !== '/' ? '/' + this.path : this.path;

        /**
         * Registered events
         * @type {object}
         * @private
         */
        this.events = {};
        this.connect();
    }

    TornadoWebSocket.prototype.connect = function() {
        return this.websocket = null;
    };

    return TornadoWebSocket;

})();