---
title: Maps4News API Documentation

language_tabs:
  - javascript--wrapper: Wrapper
  - php: PHP

toc_footers:
  - <a href='https://api.maps4news.com/register'>Sign up for Maps4News</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>

includes:
  - models

search: true
---

# Introduction

Welcome to the API documentation for Maps4News.

Our API allows you to manage everything about your Maps4News account and your organisation. As well as generate Maps.

## Authentication

> To authorize, use this code:

```javascript--wrapper
import { ImplicitFlow, Maps4News } from '@mapcreator/maps4news';

const API_CLIENT_ID = 0;
const API_HOST = 'https://api.maps4news.com';
const REDIRECT_URL = 'http://localhost/';

const auth = new ImplicitFlow(API_CLIENT_ID, REDIRECT_URL);
const api = new Maps4News(auth, API_HOST);

// Somewhere in your application
api.authenticate();

// Get the user's information
api.users.get('me').then(console.log);
```

```php
This example uses the guzzlehttp package from composer.

<?php

$host = "https://api.maps4news.com/v1";
$client_id = 0;
$secret = "secret";
$redirect_uri = "http://localhost/callback";

////////////////////////////
// /login route in your app.

// Prepare redirect to API login page.
$query = http_build_query([
    'client_id' => $client_id,
    'redirect_uri' => $redirect_uri,
    'response_type' => 'code'
]);

// Redirect user.
header("Location: $host/oauth/authorize?$query");

//////////////////////////////
// /callback route in your app.

$http = new GuzzleHttp\Client();

// Get the user's access_token.
$response = $http->post("$host/oauth/token", [
    'form_params' => [
        'grant_type' => 'authorization_code',
        'client_id' => $client_id,
        'client_secret' => $secret,
        'redirect_uri' => $redirect_uri,
        'code' => $_POST['code']
    ]
]);

// Get the access token.
$token = json_decode((string) $response->getBody(), true)['access_token'];

// Request the user's info.
$response = $http->get("$host/v1/users/me", [
    'headers' => [
        'Authorization' => "Bearer $token",
        'Accept' => 'application/json'
    ]
]);

// Display the user's information
print_r(json_decode((string) $response->getBody()));
```

> Make sure the <code>client_id</code>, <code>host</code> and <code>redirect_url</code> are correctly filled in.

The Maps4News API is an OAuth2 API. We support implicit and password flows.

<aside class="notice">You need a OAuth Client or Personal Access Token to use the API.</aside>

# API

To register an OAuth Client or Personal Access Token, please [log into the API](https://api.beta.maps4news.com) register one via your account settings.

Have a look at our [OpenAPI spec](/v1/api), the spec contains all the endpoints, info about how resources look and what each endpoint requires you to submit.

To Log in and try it out hit the "Try out" button.

## Return Data

> For Success Responses

```json
{
  "success": true,
  "data": {
    ...
  }
}
```

> For Error Responses

```json
{
  "success": false,
  "error": {
    "type": "HttpNotFoundException",
    "message": "Page Not Found"
  }
}
```

> For Error Responses With Validation Errors

```json
{
  "success": false,
  "error": {
    "type": "ValidationException",
    "message": "Input data failed to pass validation",
    "validation_errors": {
      "attribute": [
        "validation error for the attribute"
      ]
    }
  }
}
```

> For Error Responses With JSON Schema Errors (Current only used when creating a Job Revision)

```json
{
  "success": false,
  "error": {
    "type": "ValidationException",
    "message": "Input data failed to pass validation",
    "validation_errors": {
      "attribute": [
        "validation error for the attribute"
      ]
    },
    "schema_errors": [
      {
        "property": "data.meta",
        "pointer": "/data/meta",
        "message": "The propery meta is required",
        "constraint": "required",
        "context": 1
      }
    ]
  }
}
```

All JSON responses from the API is wrapped in a base object.

Be sure to include an `Accept: application/json` header, otherwise errors like `401`, `403` & `404` will either return HTML or redirect you to the login page.

<aside class="warning">
The current version (1.4.2) returns `validation_errors` as an array of strings, this behavior will change the one described on the right in the next version 1.4.3. (there is currently no release ETA). The new behavior is available on beta.
</aside>


## Headers

### Exposed Headers

- `Content-Type`(`application/json` or the filetype, e.g. `image/png`)
- `Content-Disposition` (only for files, defaults to `inline`)

### For Pagination
See [pagination](#pagination)

- `X-Paginate-Total`
- `X-Paginate-Pages`
- `X-Paginate-Offset`

### For HTTP Caching

- `Cache-Control`
- `Last-Modified`
- `ETag` [(weak)](https://en.wikipedia.org/wiki/HTTP_ETag#Strong_and_weak_validation)

> Create Route

```
/v1/users
```
> Update Route

```
/v1/users/1
```

All returned model resources have an `ETag` and `Last-Modified` header.

`ETag` headers are returned from GET, Create & Update requests.
Because the ETags are weak they can also be used on other routes.

For example, when getting a resource the API will return a `ETag` header, the value of the `ETag` header can be used on the update route prevent [the lost update problem](https://www.morpheusdata.com/blog/2015-02-21-lost-update-db).

### Exposed CORS Headers

- `Access-Control-Allow-Origin` (default `*`)
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`
- `Access-Control-Expose-Headers`
- `Access-Control-Max-Age`

### Accepted Headers

- `Authorization`
- `Accept` (should be set to `application/json` for all API requests)
- `Content-Type`
- `X-No-CDN-Redirect` (Tells the API to not redirect the user to the CDN but instead fetch the item itself, default `false`)

### For Pagination
See [pagination](#pagination)

- `X-Page`
- `X-Per-Page`
- `X-Offset`

### For Midair Collision Prevention

- [`If-Match`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match)
- [`If-Unmodified-Since`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Unmodified-Since)

We follow the standard as described on mozilla developer network

If you submit any of these headers the API will assume you only want to update a resource when the header condition is met, omit these if you do not care about preventing [the lost update problem](https://www.morpheusdata.com/blog/2015-02-21-lost-update-db)

## Query Parameters

The API has a few query parameters available that you can use to help find the resources you need.

All three of these query parameters are only available on listing endpoints, so endpoints that return an array of items.

### Pagination

> As Query Parameter

```
?page=1&per_page=50&offset=0
```

> As Header

```
X-Page: 1
X-Per-Page: 50
X-Offset: 0
```

By default the API returns 12 items per page and defaults to page 1.

The number of items per page can be increased to a maximum of 50 items.

### Offset

`offset` is a special parameter within our pagination system, the `offset` will remove the first `n` items from the list you are querying. `offset` can be used to work around getting duplicate data.

So, for example: if the list has 600 items and the `offset` is set to 100, the `X-Paginate-Total` will report 500 items, other headers like `X-Paginate-Pages` will also be calculated from the new total.

### Sorting

> Sort ID Descending and Name Ascending

```
?sort=-id,name
```

The API supports sorting ascending or descending sorting on multiple columns (separated by a comma) on the resources.

**Sortable columns are whitelisted inside the API, look in the model list below for supported columns**

### Searching

> Search for name LIKE "Kevin" and company That Ends With "4News"

```
?search[name]=Kevin&search[company]=$:4News
```

Searching can be done on multiple columns, we use the URL array syntax for this.

The basic syntax is `operator:value`, so: `=:Maps4News`

**The same is for searchable columns, these are whitelisted per resource**

The available operators are:

 - `!`: Not operator
 - `=`: Equals operator
 - `>`: Bigger than operator
 - `<`: Smaller than operator
 - `>=`: Bigger than or equals operator
 - `<=`: Smaller than or equals operator
 - `^`: Starts with operator
 - `$`: Ends with operator
 - `~`: Or no operator, that will result in a `LIKE` statement

## Keywords

There are a few keywords throughout the API that you can use in the url as shortcuts to certain resources.

```
GET /v1/users/me
```

For example, you can use `me` as an keyword for a user. This will return the resource of the logged in user.

<br/>

```
GET /v1/organisations/mine
```

A manager can use the `mine` keyword to get a list of organisations he/she manages.

<br/>

```
GET /v1/jobs/1/revisions/last
```

To get the last revision for a job, you can use the `last` keyword.

# Wrapper

> You can install the library using:

```
npm install @mapcreator/maps4news
```

If you are using JavaScript to develop your app then you are in luck.
We have created a query builder-like library that is able to do everything our API offers. It even does the Oauth login for you, in redirect, popup or password flow.

The library is freely available on [github](https://github.com/MapCreatorEU/api-wrapper) and [npm](https://www.npmjs.com/package/@mapcreator/maps4news).

Have a look at the Wrapper's [ESDoc API documentation](/wrapper/index.html).

## Installation

```
// Using npm
npm install --save @mapcreator/maps4news
```

Installation can be done either through a node package manager, such as npm or yarn, or by including the browser bundle.

### NodeJS

```js
var m4n = require('@mapcreator/maps4news');

// Do stuff
var auth = new m4n.ImplicitFlow(1);
var api = new m4n.Maps4News(auth);
```

After installation the package can be imported as follows

<br/><br/>

### ES6

```js
import { Maps4News, DummyFlow } from '@mapcreator/maps4news';

// Do stuff
var auth = new DummyFlow();
var api = new Maps4News(auth);
```

Or when using ES6 import statements

<br/><br/>

### Browser Script Tag

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

## Authentication

Authentication is done through OAuth. This library provides multiple OAuth flow
implementations for authentication. A client id can be obtained through a support
ticket but this is planned to change in the near future. The client will first
check if any tokens can be found in the cache before requiring authentication.
If one can be found the `api.authenticate()` method will instantly resolve without
any side-effects. The variable `api.authenticated` will be set to true if a token
has been found and is still valid.

Tokens are stored in HTTPS cookies if possible and using `localStorage` when the
browser is not using a HTTPS connection. NodeJS uses a file named `.m4n_token` to store the token.

## Authentication Web

Multiple flows are supported for web browsers. All the web examples assume the web
build of the library has been included in the target page.

### Machine token
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

This will create a pop-up window containing the login page.
Once the pop-up redirects back to the callback it will resolve the promise.
The callback can be an empty page hosted on the same domain.

Callback url is set to the current url by default.
The script is smart enough close the page if it detects that it's a child after authentication.
This means that either the current page can be set as the callback (default) or a blank page.
The callback must be hosted on the same domain as the application to allow for cross window communication.

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

## Basics

These examples assume that an instance of the api exists and is authenticated.
See the node and web authentication examples for more information on authenticating.

```js
const me = await api.users.get('me');
const colors = await me.colors.list();
```

> Which is the same as

```js
const colors = await api.users.select('me').colors.list();
```

The wrapper exposes relations which return proxies.
These proxies can be used to either build a route to a resource or to fetch resources.
This means that `api.users.get('me')` is the same as calling the route `/v1/users/me`.
All proxies expose the methods `new`, `list` and `lister`.
Most proxies expose the methods `select` and `get`.

<br/><br/>

```js
// Case translation
const data = {
  foo_bar_baz: 123
};

const test = api.static().new(data);

test.fooBarBaz === 123; // true
```

The wrapper will transform snake_case named variables returned from the api into camelCase named variables.
This means that for example `place_name` will be transformed into `placeName`.

Async methods return a `Promise` this means that both `then/catch` and `await/async` syntax are supported.

## Getting a resource

> Fetch resource and all its properties

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

Resources are bound to the base api class by default. Resources can be fetched in two ways;
by selecting them (`.select`) or by fetching them (`.get`). Selecting them will only set the
object's id to its properties. Fetching a resource returns a `Promise` that will resolve with the requested resource.

Selection is only useful as a stepping stone to related resources that can be easily obtained using the id of the parent.

Please refer to the [api documentation](/wrapper/class/src/proxy/ResourceProxy.js~ResourceProxy.html) for further reference.

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

# Examples

## Building a Map

### Prerequisites:

 - You have an authenticated Wrapper instance or Token that you can use for authentication.

### Notes:

 - For JS this example uses our Wrapper
 - For PHP this example uses `GuzzleHttp`
 - We're gonna build the map defined in [this json file](/assets/map.json)

To build a map via our system, you first need to create a few resources.

```javascript--wrapper
const api = new Maps4News(token);

// 1. Job
const job = await api.jobs.new({
  jobTypeId: 1,
  title: 'My Map'
}).save();

// 2. Job Revision
import * as mapObject from './map.json'; // NodeJS

const revision = await job.revisions.new({
  languageCode: 'eng',
  mapstyleSetId: 1
}).save(mapObject);

// 3. Building
const build = await revision.build('http://example.com/callback');

// 4. Job Result
const result = await revision.result();

// 5. Getting the preview
const preview = await result.downloadPreview();

window.location = preview;
```

```php
<?php

$http = new GuzzleHttp\Client([
    'base_uri' => 'https://api.maps4news.com',
    'headers' => [
        'Authorization' => "Bearer $token",
        'Content-Type' => 'application/json',
        'Accept' => 'application/json',
    ],
]);

// 1. Job
$jobResponse = $http->post('v1/jobs', [
    GuzzleHttp\RequestOptions::JSON => [
        'job_type_id' => 1, // Annotation Map
        'title' => 'My Map',
    ],
]);

$job = json_decode($jobResponse->getBody());

// 2. Job Revision
$mapObject = file_get_contents('./map.json'); // As a string

$revisionResponse = $http->post("/v1/jobs/$job->id/revisions", [
    GuzzleHttp\RequestOptions::JSON => [
        'language_code' => 'eng',
        'mapstyle_set_id' => 60, // Here Mapstyle
        'object' => $mapObject,
    ],
]);

$revision = json_decode($revisionResponse->getBody());

// 3. Building
$buildResponse = $http->post("/v1/jobs/$job->id/revisions/$revision->revision/build");

$build = json_decode($buildResponse->getBody());

// 4. Job Result
$resultResponse = $http->get("/v1/jobs/$job->id/revisions/$revision->revision/result");

$result = json_decode($resultResponse->getBody());

// 5. Getting the Preview
$previewResponse = $http->get("/v1/jobs/$job->id/revisions/$revision->revision/result/preview");

header('Content-Type: image/png');
echo $previewResponse->getBody();
```

### Steps

 - 0. Let's setup the basis for our application.

<br/>

 - 1. Firstly we are gonna create a `Job` instance. A Job is a project on the Maps4News platform.<br/>
We're gonna create an Annotation Map (`job_type_id`) which is a normal map with icons on it, and we're also giving out our map a title. 

<br/>

 - 2. Second a `Job Revision`. A Revision is a point-in-time that the user decided to save his/her current progress in designing their map.

A `Revision` requires us to give it a `language_code`, these are 3 character strings, (eng, ger, ita, dut, etc.) as well a `mapstyle_set_id` and the map json as a string.

(A list of available mapstyle sets can be gotten from `/users/me/mapstyle-sets`)

A map object must be given to each revision. Revisions can not be updated, each save will result in a new revision.

Details about how to make a map object can be found on the [map object page](dispatcher.html).

<br/>

 - 3. If your map object was valid and the revision was created we can queue a build of your map. This will create a `JobResult` resource for that revision.

<br/>

 - 4. You can access your result via the `result` method on the revision.<br/>
Expect your result to be queued or processing if you get your result directly after queueing a build.<br/>
It generally takes a few seconds to a few minutes to generate a map.

 <br/>

 - 5. The last step in this example is to get the preview image for the map. The API will return an `image/png` for all previews.

### The Final Result

![Map Preview](/images/map_preview.png)
