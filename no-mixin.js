const cancelable = promise => {
    let cancelled = false;
    return {
        promise: promise.then(val => {
            if (cancelled) return Promise.reject(new Error('canceled'))
            return val;
        }),
        cancel: () => {
            cancelled = true
        }
    }
}

{
    const {cancel, promise} = cancelable(new Promise(resolve => {
        setTimeout(()=>{
            resolve('first');
        }, 10)
    }))
    promise.then(console.log).catch(console.log);
    console.dir({promise, cancel})
}
{
    const {cancel, promise} = cancelable(new Promise(resolve => {
        setTimeout(()=>{
            resolve('second');
        }, 10)
    }))
    cancel()
    promise.then(console.log).catch(console.log);
    console.dir({promise, cancel})
}
