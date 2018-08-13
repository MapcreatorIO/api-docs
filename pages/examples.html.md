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

# Examples

## Building a Map

```Wrapper
const api = window.api;
```

To build a map via our system, you first need to create a few resources.

<br/>

```javascript--wrapper
const job = await api.jobs.new({
  jobTypeId: 1,
  title: "My Map"
}).save();
```

First a [`Job`](/api/index.html#JobCreateRequest). A Job is a project on the Maps4News Platform.

<br/><br/><br/><br/>

```javascript--wrapper
const revision = await job.revisions.new({
  languageCode: "eng",
  mapstyleSetId: 1
}).save(mapObject);
```

Second a [`Job Revision`](/api/index.html#JobRevisionCreateRequest). A Revision is a point-in-time that the user decided to save his/her current progress in designing their map.

A map object must be given to each revision. Revisions can not be updated, each save will result in a new revision.

Details about how to build a map object can be found on the [map object page](/dispatcher.html).

<br/>

```javascript--wrapper
await revision.build();
```

Lastly, we can queue a build of your map. This will create a `JobResult` resource for that revision.

<br/>

```javascript--wrapper
const result = await revision.result();
```

You can access your result via the `result` method on your revision. Except your result to be queued or processing if you get your result directly after queueing a build. It generally takes a few seconds to a few minutes to generate a map.
