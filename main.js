window.onload = function(event) {
    var printRelation = (function (nodeA, nodeB) {
        var gv = document.getElementById('github-visualize');

        return function(nodeA, nodeB) {
            var div = document.createElement('div');

            div.innerHTML = nodeA + ' --> ' + nodeB;
            gv.appendChild(div);
        }
    }());

    function setupGithubForm() {
        var form = document.getElementById('github-form');
        var degree = null;
        var rootUser = null;

        var getUserFollowers = function (user) {
            // fetch user followers
            return fetch('https://api.github.com/users/' + user.name + '/followers?access_token=af17a4e22adb841fa0e5ef3d3e1996a55aa2c70d')
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                    // check for error
                    if (json.message) {
                        alert(json.message);
                        return;
                    }
                    
                    appendFollowers(user, json);

                    while (degree > 1) {
                        degree = degree - 1;

                        for (var i = 0; i < user.next.length; i++) {
                            getUserFollowers(user.next[i]);
                        }
                    }

                    return json;
                });
        };

        form.onsubmit = function(e) {
            rootUser = new User(form.elements[0].value);
            degree = Number(form.elements[1].value);

            e.preventDefault();
            destroy();
            getUserFollowers(rootUser);
        };
    }

    function appendFollowers(user, children) {
        for (var i in children) {
            // Create user
            var u = new User(children[i].login);
            // Make them followers of current user
            user.next.push(u);
            // Print relation
            printRelation(user.name, u.name);
        }
    }

    function destroy() {
        var gv = document.getElementById('github-visualize');

        while (gv.firstChild) {
            gv.removeChild(gv.firstChild);
        }
    }

    function User(username) {
        this.name = username;
        this.next = [];
    }

    function init() {
        setupGithubForm();
    }

    init();
};
