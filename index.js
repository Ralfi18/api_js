
window.onload = function(){

  var url = 'http://api.loc/users',
      btn = document.getElementById("btn"),
      wrapp = document.getElementById("wrapp"),
      payload = {
        username: 'rali',
        password: 'rali123',
        page: 1
      },
      limit = 10,
      paginationTag = document.getElementById("pagination")
      data = new FormData();

    // initial load

    // paginate
    var pg = function pagination(value){

      if(value) {
        paginationTag.innerHTML = '';
        wrapp.innerHTML = '';
        payload.page = parseInt(value);
        load_users(url, wrapp, payload, limit, paginationTag, data, pg);
      }
    }
    load_users(url, wrapp, payload, limit, paginationTag, data, pg);
  /*
  |---------------------------------------------------
  | Load users function
  |---------------------------------------------------
  */
  function load_users(url, wrapp, payload, limit, pagination, data, pg) {
    data.append( "credentials", JSON.stringify( payload ) );

    fetch(url, {
      method: "POST",
      body: data
    }).then(function(response) {
      if (response.status >= 200 && response.status < 300) {
          return response.json();
      }
    }).then(function (users) {
      // console.log(users);
      if ( users[1] !== 'error' ) {
        users[1].forEach(function(user){
          var node = document.createElement("P"),
              textnode = document.createTextNode(user.id + ' ' + user.first_name + ' ' + user.last_name);
              // li = document.createTextNode();

          node.appendChild(textnode);
          wrapp.appendChild(node);
        });
        var numLinks = Math.floor(users[0] / 10);

        for(var i = 1; i <= numLinks; i++) {
          var li = document.createElement('LI'),
              a = document.createElement('A'),
              number = document.createTextNode(i);
          a.appendChild(number);
          a.className += "pagination page-"  + i;
          a.onclick = function(){
            // function appendet to a tag on click event
            pg(this.text);
          }
          li.appendChild(a);
          pagination.appendChild(li);
        }
      } else {
        console.log('Error');
      }
    });
  }

}
