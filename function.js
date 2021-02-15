const cancelable = fn => {
    const wrapper = (...args) => {
        if (fn) return fn(...args)
    }
    wrapper.cancel = () => fn = null
    return wrapper;
}

// usage

const fn = par => {
    console.log('function', par)
}
const f = cancelable(fn);
setTimeout(()=> {
    f('first');
    f.cancel();
},10)
setTimeout(f,20,'second')
