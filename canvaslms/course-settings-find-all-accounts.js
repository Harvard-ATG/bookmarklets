(function() {
    "use strict";

    var accounts = [];
    var fetchOptions = {
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json'
        }
    };

    function fetchCourse(course_id) {
        return fetch("/api/v1/courses/" + course_id, fetchOptions).then(function(r) {
            return r.json()
        });
    }

    function fetchAccount(account_id) {
        return fetch("/api/v1/accounts/" + account_id, fetchOptions).then(function(r) {
            return r.json()
        });
    }

    function recurseAccount(account) {
        accounts.push(account);
        if (account.parent_account_id) {
            return fetchAccount(account.parent_account_id).then(recurseAccount);
        }
        return accounts;
    }

    function getAccountsPath(accounts) {
        var accounts = accounts.slice(0);
        accounts.reverse();
        return accounts.map(function(account) {
            return account.name;
        }).join(" > ");
    }

    function annotateSettingsPage(text) {
        var el = document.getElementById("course_account_id").parentNode;
        var span = document.createElement("span");
        if (el) {
            span.style.display = "block";
            span.style.backgroundColor = "lightyellow";
            span.style.padding = ".5em";
            span.style.marginBottom = "1em";
            span.appendChild(document.createTextNode(text));
            el.appendChild(span);
        }
        return text;
    }

    function main() {
        var match = window.location.pathname.match(/^\/courses\/(\d+)\/settings/);
        var course_id = (match ? match[1] : null);
        if (course_id) {
            console.log("Script executing...");
            fetchCourse(course_id)
                .then(function(course) {
                    return fetchAccount(course.account_id);
                })
                .then(recurseAccount)
                .then(function(accounts) {
                    var path = getAccountsPath(accounts);
                    console.log("Accounts: ", path);
                    return path;
                })
                .then(annotateSettingsPage);
        } else {
            console.log("Script not executed because URL does not match /courses/:id/settings")
        }
    }

    main();
})();