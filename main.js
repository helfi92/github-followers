'use strict';
//
// (function () {
//     // return {
//     //     formOnSubmit: function(e) {
//     //         e.preventDefault();
//     //         var handleFormCallback = function(response) {
//     //             console.log('form clicked', JSON.parse(response)[0]);
//     //         };
//     //
//     //         var response = httpGetAsync('https://api.github.com/users/helfi92/followers', handleFormCallback);
//     //     }
//     // };
// }());


window.onload = function(event) {
    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }

    function init() {
        setupGithubForm();
    }

    function setupGithubForm() {
        var form = document.getElementById('github-form');
        var handleFormCallback = function (response) {
            console.log('form clicked', JSON.parse(response)[0]);
        };

        form.onsubmit = function(e) {
            e.preventDefault();
            httpGetAsync('https://api.github.com/users/' + e.target.elements[0].value + '/followers', handleFormCallback);
        };
    }

    init();
};
