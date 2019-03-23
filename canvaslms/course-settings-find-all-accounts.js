(function() {
    "use strict";

    var ACCOUNTS = [];
    var FETCH_OPTIONS = {
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json'
        }
    };

    function fetchCourse(course_id) {
        return fetch("/api/v1/courses/" + course_id, FETCH_OPTIONS).then(handleResponse);
    }

    function fetchAccount(account_id) {
        return fetch("/api/v1/accounts/" + account_id, FETCH_OPTIONS).then(handleResponse);
    }

    function fetchCourseAccount(course) {
        return fetchAccount(course.account_id);
    }

    function fetchAccountParents(account) {
        ACCOUNTS.push(account);
        if (account.parent_account_id) {
            return fetchAccount(account.parent_account_id).then(fetchAccountParents);
        }
        return ACCOUNTS;
    }

    function handleResponse(response) {
        if(response.ok) {
            return response.json();
        }
        throw new Error('API request ' + response.url + ' failed with status code ' + response.status);
    }

    function processAccounts(accounts) {
        var accounts_reversed = accounts.slice(0);
        accounts_reversed = accounts.reverse();
        var text = accounts_reversed.map(function(account) {
            return account.name;
        }).join(" > ");
        return text;
    }

    function annotatePage(text, style) {
        style = style || {};
        style.color = style.color || "#000";
        style.backgroundColor = style.backgroundColor || "#fff3cd";
        var span, el = document.getElementById("course_account_id").parentNode;
        if (el) {
            span = document.createElement("span");
            span.style.display = "block";
            span.style.color = style.color;
            span.style.backgroundColor = style.backgroundColor;
            span.style.padding = ".5em";
            span.style.marginBottom = "1em";
            span.appendChild(document.createTextNode(text));
            el.appendChild(span);
        }
        return text;
    }

    function handleError(errorObject) {
        var errorText = "Error: " + errorObject.message;
        annotatePage(errorText, {color: "#721c24", backgroundColor: "#f8d7da"});
        return errorObject;
    }

    function main() {
        var match = window.location.pathname.match(/^\/courses\/(\d+)\/settings/);
        var course_id = (match ? match[1] : null);
        if (course_id) {
            console.log("Script executing...");
            fetchCourse(course_id)
                .then(fetchCourseAccount)
                .then(fetchAccountParents)
                .then(processAccounts)
                .then(annotatePage)
                .catch(handleError);
        } else {
            var msg = "Script not executed. Please run this on the Canvas Course Settings page (e.g. /courses/:id/settings).";
            console.log(msg);
            alert(msg);
        }
    }

    main();
})();