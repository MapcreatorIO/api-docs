---
title: API Wrapper

toc_footers:
  - <a href='https://api.maps4news.com/register'>Sign Up for Maps4News</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>
  
includes:
  - directory

search: true
---

# Installation

```
// Using npm
npm install --save @mapcreator/maps4news

// Using yarn
yarn add @mapcreator/maps4news
```

Installation can be done through either npm or yarn.

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
<script src="https://unpkg.com/@mapcreator/maps4news@1.4.22/dist/bundle.browser.min.js"></script>
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

```js
// Obtained client id
var clientId = 1;

// Callback url is set to the current url by default. The
// script is smart enough close the page if it detects that
// it's a child after authentication. This means that either
// the current page can be set as the callback (default) or
// a custom page that just contains `api.authenticate()`
// that uses ImplicitFlowPopup as the auth parameter.
var auth = new ImplicitFlowPopup(clientId);
var api = new Maps4News(auth);

// This will create a pop-up window containing the log in
// page. Once the pop-up redirects back to the callback it
// will resolve the promise. The callback page should contain
api.authenticate().then(function() {
  // Save the token
  api.saveToken();
  
  // Get the current user and dump the result to the console.
  api.users.get('me').then(console.dir);
});
```

Just like the Implicit Flow a client id is required. 

## Implicit flow pop-up (advanced)

> index.html

```js
var clientId = 1;
var callbackUrl = 'https://example.com/callback.html';

var auth = new ImplicitFlowPopup(clientId);
var api = new Maps4News(auth);

// This will resolve once the callback page has been loaded
api.authenticate().then(function() {
  // Save the token
  api.saveToken();
  
  // Get the current user and dump the result to the console.
  api.users.get('me').then(console.dir);
});
```

> callback.html

```js
var clientId = 1;

// This will instantly detect the token and close the page
new ImplicitFlowPopup(clientId);
```

Due to the nature of the implicit flow pop-up (referred to as IFP from now on)
method the callback page can be set to a blank page that just grabs the token 
and then closes. This can be done in the following way.

## Password flow (dangerous)

```js
var clientId = 1; // client id
var secret = ''; // secret
var username = 'user@example.com'; // email is used for authentication
var password = 'Password1!'; // password

// Secret will be leaked if this is used on a webpage. Please only use
// this for non-web applications.
var auth = new PasswordFlow(clientId, secret, username, password);
var api = new Maps4News(auth);

// This will resolve once the authentication has completed
api.authenticate().then(function() {
  // Get the current user and dump the result to the console.
  api.users.get('me').then(console.dir);
});
```

The password flow is **NOT** intended to be used in the browser. If you do 
decide to use the password flow then it is recommended to make sure that 
the site is **NOT** public facing and using HTTPS. Leaking the secret is
a very bad idea.

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

# Authentication NodeJS
The library currently only supports the password flow and the dummy flow
for nodeJS. Other flows might be added in the future.

## Password Flow

```js
var clientId = 1; // client id
var secret = ''; // secret
var username = 'user@example.com'; // email is used for authentication
var password = 'Password1!'; // password

var auth = new PasswordFlow(clientId, secret, username, password);
var api = new Maps4News(auth);

// This will resolve once the authentication has completed
api.authenticate().then(function() {
  // Get the current user and dump the result to the console.
  api.users.get('me').then(console.dir);
});
```

Make sure to store your secret somewhere safe and to only store the token
and **never** the unencrypted user password.

## Dummy flow

```js
var auth = new DummyFlow();
var api = new Maps4News(auth);

var token = {
  token: "eyJ0eXAiOiJKV1...",
  type: "Bearer",
  expires: "Thu, 18 May 2017 14:14:38 GMT"
};

// Set the token
api.auth.token = OAuthToken.fromResponseObject(token);

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

The dummy flow can also be used when a token is known.

# Basics
These examples assume that an instance of the api exists and is authenticated. 
See the node and web authentication examples for more information on authenticating.

## Getting a resource

> Fetch resource and all it's properties

```js
api.colors.get(1).then(function(color) {
    console.log(color.id + " " + color.name + ": " + color.hex);
});
```

> Select the current user to quickly obtain related mapstyle sets

```js
api.users.select('me').mapstyleSets().then(function(sets) {
    for(var i = 0; i < sets.data.length; i++) {
        console.log(sets.data[i].name);
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
 
[api documepntation]: https://api.beta.maps4news.com/docs/
