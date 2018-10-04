function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token
    
    $.ajax({
      method: "POST",
      url: `http://localhost:3000/google-signin`,
      data: {
        googleToken: id_token
      }
    })
    .done(function(data) {
        if (data.token) {
            localStorage.setItem('tokenjwt', data.token)
            alertify.alert("Welcome to Star Git")
            $('.g-signin2').hide()
            $('#logbtn').show()
            $('#searchbtn').show()
            $('.search').show()
            $('#profile').empty().append(`<img src="https://www.unud.ac.id/images/icon-img.png" width="30">
            <a href="https://github.com/aliyanamu">Hana Aliyah</a>`)
        
            let $users = $('#userlist')

            $.ajax({
                type: 'GET',
                url: 'http://127.0.0.1:3000/wonder-fox-2018',
                headers: {
                    tokenjwt: localStorage.getItem('tokenjwt')
                },
                dataType: 'json'
            })
            .done (function (result) {
                let index = 0
                
                result.data.forEach(item => {
                    let name = item.login
                    $('ul').append(`<li><a href="#" onclick="showRepo('${name}')">${name}</a></li>`)
                index++
                });
                
            })
            .fail(function(result, textStatus, xhr){
                console.log(`error: ${result.status}
                STATUS: ${xhr}`);
            })
        }
    })
    .fail(err => {
        alertify.alert(err.message)
    })
} 

function signOut() {
let auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
        console.log('User signed out.')
        localStorage.clear()
    })
    window.location.reload()
}