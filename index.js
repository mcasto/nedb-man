const Datastore = require('nedb-promises');
const path = require('path');
const kc = require('kebab-case');

module.exports = {
  stores: {},

  createStore({ name = 'default', location=null }) {
    const dbLoc = location ? kc(path.join(location, name)) : null;
    this.stores[name] = Datastore.create(dbLoc);
    return this.stores[name];
  },

  listStores() {
    return Object.keys(this.stores);
  }
}