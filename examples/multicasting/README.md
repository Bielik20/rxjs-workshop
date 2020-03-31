# Multicast Cheatsheet

* `publish()` = `multicast(() => new Subject())`
* `share()` = `publish()` + `refCount()`
* `publishReplay(x)` = `multicast(() => new ReplaySubject(x))`
* `shareReplay(x)` ~= `publishReplay(x)`
* `shareReplay({ bufferSize: x, refCount: true })` ~= `publishReplay(x)` + `refCount()`
