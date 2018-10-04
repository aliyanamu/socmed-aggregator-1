alertify.defaults = {
    // dialogs defaults
    autoReset:true,
    basic:false,
    closable:true,
    closableByDimmer:true,
    frameless:false,
    maintainFocus:true, // <== global default not per instance, applies to all dialogs
    maximizable:true,
    modal:true,
    movable:true,
    moveBounded:false,
    overflow:true,
    padding: true,
    pinnable:true,
    pinned:true,
    preventBodyShift:false, // <== global default not per instance, applies to all dialogs
    resizable:true,
    startMaximized:false,
    transition:'pulse',
  
    // notifier defaults
    notifier: {
        // auto-dismiss wait time (in seconds)  
        delay:5,
        // default position
        position:'bottom-right',
        // adds a close button to notifier messages
        closeButton: false
    },
  
    // language resources 
    glossary:{
        // dialogs default title
        title:'',
        // ok button text
        ok: 'OK',
        // cancel button text
        cancel: 'Cancel'            
    },
  
    // theme settings
    theme:{
        // class name attached to prompt dialog input textbox.
        input:'ajs-input',
        // class name attached to ok button
        ok:'ajs-ok',
        // class name attached to cancel button 
        cancel:'ajs-cancel'
    }
}

//User List
let tokenjwt = localStorage.getItem('tokenjwt')
if(tokenjwt) {
    $('.g-signin2').hide()
    $('#logbtn').show()
}

let currentname, starList;

$( document ).ready(function() {
    $('#logbtn').hide()
    $('#searchbtn').hide()
    $('.search').hide()

    $(function () {

        let $lists = $('#repolist')
    
        $.ajax({
            type: 'GET',
            url: `http://127.0.0.1:3000/starred/aliyanamu`,
            dataType: 'json'
        })
        .done (function (result) {
    
            currentname = 'aliyanamu'
            starList = result
            
            $('.card-body').remove();
            
            let index = 0
            
            result.data.forEach(item => {
                let name = item.name,
                    url = item.html_url,
                    author = item.owner.login,
                    desc = item.description,
                    stars = item.stargazers_count;
    
                $lists.append(`<div class="card-body">
                <h5 class="card-title">
                  <a href="#" onclick="showDetail('${name}', '${url}', '${author}', '${desc}')">${name}</a>
                </h4>
                <p class="card-text">description of repo ${index+1} : ${desc}</p>
                <p class="card-text">${stars}</p>
              </div>`)
    
              index++
            });
            
        })
        .fail(function(result, textStatus, xhr){
            console.log(`error: ${result.status}
            STATUS: ${xhr}`);
        });
    })
})
//Repo List
function showRepo(name) {

    let $lists = $('#repolist')

    $.ajax({
        type: 'GET',
        url: `http://127.0.0.1:3000/starred/${name}`,
        dataType: 'json'
    })
    .done (function (result) {

        currentname = name
        starList = result

        $('.card-body').remove();
        
        let index = 0
        
        result.data.forEach(item => {
            let name = item.name,
                url = item.html_url,
                author = item.owner.login,
                desc = item.description,
                stars = item.stargazers_count;

            $lists.append(`<div class="card-body">
            <h5 class="card-title">
              <a href="#" onclick="showDetail('${name}', '${url}', '${author}', '${desc}')">${name}</a>
            </h4>
            <p class="card-text">description of repo ${index+1} : ${desc}</p>
            <p class="card-text">${stars}</p>
          </div>`)

          index++
        });
        
    })
    .fail(function(result, textStatus, xhr){
        console.log(`error: ${result.status}
        STATUS: ${xhr}`);
    });
}

function showDetail(name, url, author, desc) {
    
    let $details = $('#detail')
    $('.repodet').remove();
    $details.append(`<div class="repodet"><h2>${name}</h2>
    <p class="lead">
        by
        <a href="${url}">${author}</a>
    </p>
    <hr>
    <p class="lead">${desc}</p>`)
}

$('#searchbtn').first().click(function () {
            
    let val = $('.search').val();

    if (val) {
        searchLike(starList, val)
    } else {
        showRepo(currentname)
    }
});

function searchLike(starList, val) {

    var regex = new RegExp(val, 'i')
    
    let $lists = $('#repolist')
    let index = 0
    $('.card-body').remove();
    
    starList.data.forEach(item => {
        let name = item.name,
            url = item.html_url,
            author = item.owner.login,
            desc = item.description,
            stars = item.stargazers_count;

        if (name.toLowerCase().match(val.toLowerCase()) || desc.toLowerCase().match(val.toLowerCase())) {

            $lists.append(`<div class="card-body">
            <h5 class="card-title">
                <a href="#" onclick="showDetail('${name}', '${url}', '${author}', '${desc}')">${name}</a>
            </h4>
            <p class="card-text">description of repo ${index+1} : ${desc}</p>
            <p class="card-text">${stars}</p>
            </div>`)
        }
        index++
    });
}    