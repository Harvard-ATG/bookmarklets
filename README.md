# Bookmarklets

This is a repository of bookmarklets or mini apps that you can store in your browser bookmarks and run with one click.  

Want to know more about bookmarklets?

- [Mozilla: Use bookmarklets to quickly perform common web page tasks](https://support.mozilla.org/en-US/kb/bookmarklets-perform-common-web-page-tasks)
- [Wikiedia: Bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet)

_Note: This was created as a [ShipIt](https://www.atlassian.com/company/shipit) project in HUIT AT._

## Canvas LMS

### Course Settings 

**Task:**

> When examining the Settings of a Canvas course in the residential instance, it's not always possible to tell which school a course is associated with. It's easy to identify the school if the course lives in a school sub-folder. But if a course lives in a sub-sub-folder, i.e. a department within a school, there's no way to tell which school the department and course belongs to. The outcome of this project would a be a self-service tool that makes it easy to **identify which school a course belongs to**, which can be important when responding to support tickets. 

**Bookmark Name:** 

```
canvaslms-course-settings-find-accounts.js
```

**Bookmark URL:**
```
javascript:!function(){"use strict";var e,n,t,o=[],c={credentials:"same-origin",headers:{Accept:"application/json"}};function r(e){return fetch("/api/v1/accounts/"+e,c).then(function(e){return e.json()})}function i(e){return o.push(e),e.parent_account_id?r(e.parent_account_id).then(i):o}function u(e){var n=document.getElementById("course_account_id").parentNode,t=document.createElement("span");return n&&(t.style.display="block",t.style.backgroundColor="lightyellow",t.style.padding=".5em",t.style.marginBottom="1em",t.appendChild(document.createTextNode(e)),n.appendChild(t)),e}n=window.location.pathname.match(/^\/courses\/(\d+)\/settings/),(t=n?n[1]:null)?(console.log("Script executing..."),(e=t,fetch("/api/v1/courses/"+e,c).then(function(e){return e.json()})).then(function(e){return r(e.account_id)}).then(i).then(function(e){var n,t=((n=(n=e).slice(0)).reverse(),n.map(function(e){return e.name}).join(" > "));return console.log("Accounts: ",t),t}).then(u)):console.log("Script not executed because URL does not match /courses/:id/settings")}();
```

**Usage:**

1. Add the bookmark.
2. Navigate to a course settings page in canvas.
3. Run the code by clicking on the bookmark.
4. If it worked, you should see something like this:

| Before | After |
|---|---|
| ![Before](images/canvaslms-course-settings-find-accounts-before.png) | ![After](images/canvaslms-course-settings-find-accounts-after.png) |


## Development Process

1. Write some javascript to implement a task.
2. Test javascript (e.g. developer console).
3. Iterate until javascript is done.
4. Commit JS file to git repository.
5. Compress JS file so that it can be used as a bookmarklet (e.g. https://jscompress.com/).
6. Update the README with a description of the bookmarklet and the compressed version of the JS.
7. Test and validate bookmarklet.