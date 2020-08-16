# nedb-man

nedb-man is a (very) thin wrapper around nedb-promises, which, of course, is a thin wrapper around neDB.

I wrote this for a specific use case where I wanted easy access to the list of my stores without having to manually build a separate array to track them. After using it for a while in that project, I realized how useful it was and decided to make a public repo for it.

## Dependencies
Obviously, it requires [nedb](https://github.com/louischatriot/nedb) and [nedb-promises](https://github.com/bajankristof/nedb-promises).

It also uses `path` and [kebab-case](https://www.npmjs.com/package/kebab-case) to create an OS-compatible path to your persistent stores (if required).

## Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install nedb-man.

```bash
npm i mcasto/nedb-man
```

```bash
yarn add mcasto/nedb-man
```

## Usage

```js
const db = require('nedb-man');

// For persistence, include a location
db.create({ stores: ['persistent', 'stuff'], location: '/path/to/data'});

/* NOTE:

If you're running in Node, this will create a physical folder structure on your drive. In browser, it just uses the location as the key to the store in IndexedDB, WebSQL, or localStorage, whichever is determined most suitable by neDB. 

*/

// For in-memory only, you can just designate the store list
db.create({ stores: ['memory', 'only', 'stuff'] })

// You can access these created objects as you would any neDB(-promises) store
db.stores.memory.insert({
'name': 'mike',
'age': 49
});

db.stores.memory.find({}).then( data => console.log(data) );

// Of course, you can also use with async/await
const adb = async()=>{
  const ret = await db.stores.memory.find({});
  return ret.map(item=>item.name);
};
adb().then(data=>console.log(data));

// Easily retrieve the list of stores
const storeList = db.listStores();
console.log(storeList);
```

## Note about in-browser usage
As noted above, in a browser, the `location` parameter for the `create()` function can be an empty string since neDB will use `localStorage`, `IndexedDB`, or `WebSQL` (depending on the browser), and there is no physical location.

You must specify a truthy `location` parameter for persistence, though, otherwise it will create an in-memory-only store.

## Documentation
Full documentation for neDB can be found at [nedb](https://github.com/louischatriot/nedb). This wrapper only manages the list of stores, like a clearing house. Consequently, all of neDB's functionality is available. Since I prefer working with Promises to Cursors, it returns promises as described at [nedb-promises](https://github.com/bajankristof/nedb-promises).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)