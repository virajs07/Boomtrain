import Freezer from 'freezer-js'

var rawData = {};

var store = new Freezer(rawData);

store.reset = function(path){
    var value = rawData[path] || null;
    store.get().set(path,value);
}

window.__store = store;
module.exports = store;