module.exports.wrap = function wrap(body, time) {
    return function() {
        var args = Array.prototype.slice.call(arguments);
        var cb = args.pop();

        var timeout = setTimeout(timedOut, time);
        var tooLate = false;
        body.apply(body, args.concat(finished));

        function finished() {
            if (!tooLate) {
                tooLate = true;
                clearTimeout(timeout);
                cb.apply(null, arguments);
            }
        }

        function timedOut() {
            finished(new Error('Method ' + body.name + ' Timed out after ' + time + 'ms'));
        }
    }
}

