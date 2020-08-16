const Datastore = require('nedb-promises');
const path = require('path');
const kc = require('kebab-case');

module.exports = {
  stores: {},

  create({stores = ['default'], location = null}) {
    stores.forEach(name => {
    const dbLoc = location ? kc(path.join(location, name)) : null;
      this.stores[name] = Datastore.create(dbLoc);
    })

    return this;
  },

  listStores() {
    return Object.keys(this.stores);
  }
}