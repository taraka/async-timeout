async-timeout
=============

Add timeouts to async functions in nodejs


## Quick Examples

```javascript

var wrap = require('async-timeout').wrap;

function asyncFn(cb) {
    setTimeout(cb, 30);
}

wrap(asyncFn, 10)(function(err) {
    if (err) throw err;
    console.log('Done');
});

```