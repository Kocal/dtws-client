/**
 * Created by kocal on 17/05/16.
 */

describe('TornadoWebSocket instances shortcuts', function () {

    it('`tws()` should be an instance of TornadoWebSocket', function () {
        var ws = tws('/foo');
        expect(ws instanceof TornadoWebSocket).toBeTruthy()
    });

    it('`TornadoWebSocket()` should be an instance of TornadoWebSocket', function () {
        var ws = TornadoWebSocket('/foo');
        expect(ws instanceof TornadoWebSocket).toBeTruthy()
    });

    // In case of :^)
    it('`new TornadoWebSocket()` should be an instance of TornadoWebSocket', function () {
        var ws = new TornadoWebSocket('/foo');
        expect(ws instanceof TornadoWebSocket).toBeTruthy()
    });

});

describe('`TornadoWebSocket::constructor(path, options)', function () {

    it('should raise a ReferenceError exception because there is no "path" parameter', function () {
        expect(function () {
            return new TornadoWebSocket
        }).toThrowError(ReferenceError, 'You must pass "path" parameter during "TornadoWebSocket" instantiation.')
    });

    it('should be using default options', function () {
        var ws = new TornadoWebSocket('my_app');

        expect(ws.options).toEqual({
            host: 'localhost',
            port: 8000,
            secure: false
        });
    });

    it('should be merging options', function () {
        var ws = new TornadoWebSocket('my_app', {
            host: 'my.host.fr',
            port: 8080
        });

        expect(ws.options).toEqual({
            host: 'my.host.fr',
            port: 8080,
            secure: false
        });
    });

    it('should be overide options', function () {
        var ws = new TornadoWebSocket('my_app', {
            host: 'my.host.fr',
            port: 8080,
            secure: true
        });

        expect(ws.options).toEqual({
            host: 'my.host.fr',
            port: 8080,
            secure: true
        });
    });

    it('should suffix path by "/"', function () {
        var ws = new TornadoWebSocket('my_app');
        expect(ws.path).toBe('/my_app');
        expect(ws.path).not.toBe('my_app')
    });

    it('should not suffix path by "/"', function () {
        var ws = new TornadoWebSocket('/my_app');
        expect(ws.path).toBe('/my_app');
        expect(ws.path).not.toBe('//my_app')
    });

});

describe('`TornadoWebSocket::getUrl()`', function () {

    it('using default options with suffixed path', function () {
        var ws = new TornadoWebSocket('/my_app');

        expect(ws.getUrl(), 'ws://localhost:8000/ws/my_app')
    });

    it('using default options with not suffixed path', function () {
        var ws = new TornadoWebSocket('my_app');

        expect(ws.getUrl(), 'ws://localhost:8000/ws/my_app')
    });

    it('using secure websocket connection', function () {
        var ws = new TornadoWebSocket('/my_app', {
            secure: true
        });

        expect(ws.getUrl(), 'wss://localhost:8000/ws/my_app')
    });

    it('using custom host and port', function () {
        var ws = new TornadoWebSocket('/my_app', {
            host: 'my_host.fr',
            port: 8080
        });

        expect(ws.getUrl(), 'ws://my_host.fr:8080/ws/my_app')
    });

});
