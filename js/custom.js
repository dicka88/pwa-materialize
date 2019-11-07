document.addEventListener("DOMContentLoaded", () => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    var page = window.location.hash.substr(1);
    if(page === ''){
        page = "pages/home.html";
    }else{
        page = "pages/"+page+".html";
    }

    console.log(page);
    
    loadPage(page);
});

function route(elem){
    let page = elem.attr('href').substr(1);
    loadPage("pages/"+page+".html");
    M.Sidenav.getInstance($('.sidenav')).close();
}

const loadNav = () => {
    $.ajax({
        method: 'get',
        url: 'nav.html',
        success: response => {
            $('.sidenav').html(response);
        }
    });
};

$(document).ready(function(){
    $('.sidenav > li > a').each(function(){
        $(this).on('click', function(){
            let sidenav = $('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            let page = $(this).attr('href').substr(1);
            loadPage("pages/"+page+".html");
        });
    });
});

const content = $('#body-content');

function loadPage(page) {
    $.ajax({
        method: 'get',
        url: page,
        success: (response, text, xhr) => {
            
            const code = xhr.status;
            
            switch(code){
                case 200:
                    content.html(response);
                    break;
                case 404:
                    content.html("<p>404 Error not found</p>");
                    break;
                default:
                    content.html("<p>URL not valid</p>");
            }
        },
        error: function(log){
            switch(log.status){
                case 200:
                    content.html(response);
                    break;
                case 404:
                    content.html("<p>404 Error not found</p>");
                    break;
                default:
                    content.html("<p>URL not valid</p>");
            }
        } 
    });
}

const loadApi = (target, link) => {
    link = 'https://api.kangkode.site/v1/'+link;
    $.ajax({
        method: target,
        url: link,
        beforeSend: function(){
          content.html("wait...");  
        },
        success: (response, text, xhr) => {
            
            const code = xhr.status;
            
            switch(code){
                case 200:
                    let parsing = JSON.parse(response);
                    console.log(parsing);
                    
                    var table = '<table>';
                    parsing.forEach((item, id)=>{
                        table += `<tr>
                                <td>${item.id}</td>
                                <td>${item.name}</td>
                                <td>${item.teknik}</td>          
                        </tr>`;
                    });
                    
                    content.html(table);
                    break;
                case 404:
                    content.html("<p>404 Error not found</p>");
                    break;
                default:
                    content.html("<p>URL not valid</p>");
            }
        },
        error: function(log){
            switch(log.status){
                case 200:
                    content.html(response);
                    break;
                case 404:
                    content.html("<p>404 Error not found</p>");
                    break;
                default:
                    content.html("<p>Check Network Connection</p>");
            }
        } 
    });
    M.Sidenav.getInstance($('.sidenav')).close();
};
