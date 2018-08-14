---
title: API Wrapper

toc_footers:
  - <a href='https://api.maps4news.com/register'>Sign Up for Maps4News</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>
  
includes:
  - v1/directory

search: true
---

# Installation

```
// Using npm
npm install --save @mapcreator/maps4news
```

Installation can be done either through a node package manager, such as npm or yarn, or by including the browser bundle.

## NodeJS

```js
var m4n = require('@mapcreator/maps4news');

// Do stuff
var auth = new m4n.ImplicitFlow(1);
var api = new m4n.Maps4News(auth);
```

After installation the package can be imported as follows

## ES6

```js
import { Maps4News, DummyFlow } from '@mapcreator/maps4news';

// Do stuff
var auth = new DummyFlow();
var api = new Maps4News(auth);
```

Or when using ES6 import statements

## Browser Script Tag

```html
<script src="https://unpkg.com/@mapcreator/maps4news/dist/bundle.browser.min.js"></script>
```

> This html tag can be used without any other dependency in your html.

```js
const { Maps4News, DummyFlow } = window.maps4news;

// Do stuff
var auth = new DummyFlow();
var api = new Maps4News(auth);
```

You can also include the wrapper via a script tag in your html file.

# Authentication

Authentication is done through OAuth. This library provides multiple OAuth flow
implementations for authentication. A client id can be obtained through a support
ticket but this is planned to change in the near future. The client will first
check if any tokens can be found in the cache before requiring authentication.
If one can be found the `api.authenticate()` method will instantly resolve without 
any side-effects. The variable `api.authenticated` will be set to true if a token
has been found and is still valid. 

Tokens are stored in HTTPS cookies if possible and using `localStorage` when the
browser is not using a HTTPS connection. NodeJS uses a file named `.m4n_token` to store the token.

# Authentication Web

Multiple flows are supported for web browsers. All the web examples assume the web
build of the library has been included in the target page.

## Machine token
```js
const token = "...";
const api = new Maps4News(token);
```

A machine token can be used directly while instantiating the api instance. 

## Implicit flow

```js
// Obtained client id
var clientId = 1;

// Callback url is set to the current url by default
var auth = new ImplicitFlow(clientId);
var api = new Maps4News(auth);

// This will hijack the page if no authentication cache can
// be found. Smartest thing to do is to just let it happen
// and initialize any other code afterwards.
api.authenticate().then(function() {
  // Save the token
  api.saveToken();
  
  // Get the current user and dump the result to the console.
  api.users.get('me').then(console.dir);
});
```

A client id is required to use the implicit flow. The redirect url *must* be the 
same as the one linked to the client id. The callback url is automatically 
guessed if none is provided.

## Implicit flow pop-up

> index.html

```js
var clientId = 1;
var callbackUrl = 'https://example.com/callback.html';

var auth = new ImplicitFlowPopup(clientId);
var api = new Maps4News(auth);

api.authenticate().then(function() {
  // Save the token
  api.saveToken();
  
  // Get the current user and dump the result to the console.
  api.users.get('me').then(console.dir);
});
```

> callback.html

```html
<html><body>
  <h1>Nothing to see here 👻</h1>
</body></html>
```


This will create a pop-up window containing the login page. Once the pop-up redirects back to the callback it will resolve the promise. The callback can be an empty page hosted on the same domain.

Callback url is set to the current url by default. The script is smart enough close the page if it detects that it's a child after authentication. This means that either the current page can be set as the callback (default) or a blank page. The callback must be hosted on the same domain as the application to allow for cross window communication.

## Dummy flow

```js
var auth = new DummyFlow();
var api = new Maps4News(auth);

// Manually check if we're logged in
if (api.authenticated) {
    console.log('Found authentication token in cache!');
}

api.authenticate().then(function() {
    // Will only resolve if a token was found
    console.log("We're authenticated");
}).catch(function(err) {
    // This will be called if `api.authenticated` is false
    console.log(err.toString());
});
```

The dummy flow can be used when a token *should* be present in the cache. 

# Basics

```js
const me = await api.users.get('me');
const colors = await me.colors.list();
``` 

> Which is the same as

```js
const colors = await api.users.select('me').colors.list();
```

These examples assume that an instance of the api exists and is authenticated. 
See the node and web authentication examples for more information on authenticating.

The wrapper exposes relations which return proxies. These proxies can be used to either build a route to a resource or to fetch resources. This means that `api.users.get('me')` is the same as calling the route `/v1/users/me`. All proxies expose the methods `new`, `list` and `lister`. Most proxies expose the methods `select` and `get`.   

```js
// Case translation
const data = {
  foo_bar_baz: 123
};

const test = api.static().new(data);

test.fooBarBaz === 123;
```

The wrapper will transform snake_case named variables returned from the api into camelCase named variables. This means that for example `place_name` will be transformed into `placeName`. 

Async methods return a `Promise` this means that both `then/catch` and `await/async` syntax are supported.


## Getting a resource

> Fetch resource and all it's properties

```js
api.colors.get(1).then(function(color) {
    console.log(color.id + " " + color.name + ": " + color.hex);
});
```

> Select the current user to quickly obtain related mapstyle sets

```js
api.users.select('me').mapstyleSets.list().then(function(sets) {
    for (const set of sets.data) {
        console.log(`[${set.id}] ${set.name}`);
    }
});
```

Resources are bound to the base api class by default. Resources can be fetched in 
two ways; by selecting them (`.select`) or by fetching them (`.get`). Selecting them will only set the
object's id to it's properties. Fetching a resource

Selection is only useful as a stepping stone to related resources that can be easily obtained 
using the id of the parent. Please refer to the api documentation for further reference.

## Create a new resource

```js
var data = { name: 'Smurf', hex: '88CCFF' };
api.colors.new(data).save().then(console.dir);
```

Create a new color and dump the new resource to the console after saving

## Modify a resource

```js
api.users.get('me').then(me => {
  me.profession = 'Developer';
  
  me.save(); // Optional chaining to get the updated resource
});
```

Change profession of the current user and save it.

## Clone a resource

```js
api.colors.get(1).then(color => {
  color.id = null;
  color.save();
});
```

Setting the id to null forces the creation of a new object upon saving. 

## Creating a new job and revision

```js
const object = {}; // Should contain the map definition

const job = await api.jobs.new({
  title: "api map", 
  jobTypeId: 1
}).save();

const revision = await job.revisions.new({
  mapstyleSetId: 1
}).save(object);

// Will resolve when the request finishes. Not when the build is done. 
await revision.build("https://example.com/callback"); 
```

Creating a new job and building it is pretty straight forward.
Revisions are slightly different then other resource instances.
Their save function requires the new map definition as an argument.
This is to make it easier to re-use the same revision instance.

## Pagination

> Listing resources with pagination. First page with 5 items per page

```js
api.colors.list(1, 5).then(page => {
  console.log('Got resources:');

  for (var i = 0; i < page.data.length; i++) {
    console.log(page.data[i].toString());
  }
});
``` 

> Loop over every page and print the result to the console

```js
function parsePages(page) {
  for (var i = 0; i < page.data.length; i++) {
    console.log(page.data[i].toString());
  }  
    
  if (page.hasNext) {
    console.log('Grabbing page ' + (page.page + 1));
    page.next().then(parsePage);
  }
}

api.colors
   .list(1, 50)
   .then(parsePages);
```

> Loop over all pages and return the data in a promise

```js
function parsePages(page) {
  var data = [];

  function parse(page) {
      data = data.concat(page.data);
      
      if(page.hasNext) {
          return page.next().then(parse);
      } else {
          return data;
      }
  }

  return parse(page);
}

api.colors
   .list(1, 50)
   .then(parsePages)
   .then(d => console.log('Total rows: ' + d.length));
```

> Select current user but do not fetch any info to make fetching resources easier

```js
api.users.select('me').colors.list().then(page => {
  console.dir(page.data);
});
```

**warning**: The paginatedResourceListing is in the progress of being deprecated.

## Searching

> Resource lists can be queried to search for specific records as follows

```js
var query = {
  name: '^:test',
  scale_min: ['>:1', '<:10'],
}

api.layers.search(query).then(console.dir);
```

**deprecated** - Will change soon.

The `search` method is an extension of `list`. This means that `.search({})` is the same as 
`list()`. More information about search query formatting can be found in the api documentation.
 
[api documentation]: https://api.beta.maps4news.com/docs/
