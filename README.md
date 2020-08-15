# nedb-man

nedb-man is a (very) thin wrapper around nedb-promises, which, of course, is a thin wrapper around neDB.

I wrote this for a specific use case where I wanted easy access to the list of my stores without having to manually build a separate array to track them.

## Dependencies
Obviously, it requires [nedb](https://github.com/louischatriot/nedb) and [nedb-promises](https://github.com/bajankristof/nedb-promises).

It also uses `path` to create an OS-compatible path to your persistent stores (if required).

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
const persistent_db = db.createStore({ 
  name: 'pers', 
  location: '/path/to/my/stores'
});

// For in-memory only, you can just designate the name
const memory_db = db.createStore({ name: 'mem' })

// You can access these created objects as you would any neDB(-promises) store
memory_db.insert({
'name': 'mike',
'age': 49
});

memory_db.find({}).then( data => console.log(data) );

// Of course, you can also use with async/await
const adb = async()=>{
  const ret = await memory_db.find({});
  return ret.map(item=>item.name);
};
adb().then(data=>console.log(data));

// Access the stores directly through the database object
db.stores.mem.find({}).then(data=>console.log(data));

// Easily retrieve the list of stores
const storeList = db.listStores();
console.log(storeList);
```

## Note about in-browser usage
I have not tested this in a browser. It *should* work because neDB and nedb-promises work in browsers.

In a browser, the `location` parameter for the `createStore()` function can be an empty string since neDB will use `localStorage`, `IndexedDB`, or `WebSQL` (depending on the browser), and there is no physical location.

You must specify a truthy `location` parameter for persistence, though.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)