---
title: Maps4News Basic API Usage

language_tabs:
  - javascript--wrapper: Wrapper
  - php: PHP

toc_footers:
  - <a href='https://api.maps4news.com/register'>Sign Up for Maps4News</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>

includes:
  - directory

search: true
---

# Introduction

...


# Return Data

> For Success Responses

```json
{
  "success": true,
  "data": {}
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

All JSON responses from the API a wrapper in a base object.

Be sure to include an `Accept: application/json` header, otherwise errors like `401, 403 & 404` will either return HTML or redirect you to the login page.


# Query Parameters

The API has a few query parameters available that you can use to help find the resources you need.

All three of these query parameters are only available on listing endpoints, so endpoints that return an array of items.

## Pagination

> As Query Parameter

```
?page=1&per_page=50
```

> As Header

```
X-Page: 1
X-Per-Page: 50
```

By default de API returns 12 items per page. This can be increased to a maximum of 50 items per page.

## Sorting

> Sort ID Descending and Name Ascending

```
?sort=-id,name
```

The API supports sorting ascending or descending sorting on multiple columns (seperated by a comma) on the resources.

**Sortable columns are whitelisted inside the API, there is currently no documentation on what columns are whitelisted**

## Searching

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
 - Or no operator, that will result in a `LIKE` statement

# Keywords

There are a few keywords throughout the API that you can use in the url as shortcuts to certain resources.

```
GET /users/me
```

For example, you can use `me` as an keyword for a user. This will return the resource of the logged in user.

<br/>

```
GET /organisations/mine
```

A manager can use the `mine` keyword to get a list of organisations he/she manages.

<br/>

```
GET /jobs/1/revisions/last
```

To get the last revision for a job, you can use the `last` keyword.
