const Datastore = require('nedb-promises');
const path = require('path');
const kc = require('kebab-case');

module.exports = {
  stores: {},

  createStore({ name = 'default', location = '.', persistent = true }) {
    const dbLoc = persistent ? kc(path.join(location, name)) : null;
    this.stores[name] = Datastore.create(dbLoc);
    return this.stores;
  },
}