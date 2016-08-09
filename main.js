'use strict';

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
            // response = JSON.parse(response);
            var degree = form.elements[1].value;
            var promises = [];

            while(degree) {
                console.log('booom');
                promises.push(fetch('https://api.github.com/users/helfi92/followers', {
                    method: 'GET'
                }));
                degree -= 1;
            }

            Promise.all(promises).then(function (values) {
                return values[0].json();
            }).then(function(values){
                console.log('values: ', values);
            }, function (err) {
                console.log('err: ', err);
            });
        };

        form.onsubmit = function(e) {
            e.preventDefault();
            handleFormCallback();
        };
    }

    init();
};
