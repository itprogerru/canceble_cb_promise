const cancelable = promise => {
    let cancelled = false;
    const next = promise.then(val => {
        if (cancelled) return Promise.reject(new Error('canceled'))
        return val;
    })
    next.cancel = () => {
        cancelled = true
    }
    return next
}
// usage
{
    const promise = cancelable(new Promise(resolve => {
        setTimeout(()=>{
            resolve('first');
        }, 10)
    }))
    promise.then(console.log).catch(console.log);
    console.dir({promise})
}
{
    const promise = cancelable(new Promise(resolve => {
        setTimeout(()=>{
            resolve('first');
        }, 10)
    }))
    promise.cancel()
    promise.then(console.log).catch(console.log);
    console.dir({promise})
}
