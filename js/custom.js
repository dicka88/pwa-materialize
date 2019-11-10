document.addEventListener("DOMContentLoaded", () => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    var page = window.location.hash.substr(1);
    if(page === ''){
        page = "pages/home.html";
    }else if(page == 'list_name'){
        loadApi('GET', page);
        return;
    }else{
        page = "pages/"+page+".html";
    }
    
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
            $('.topnav').html(response);
        }
    });
};

$(document).ready(function(){
    $('.sidenav > li > a, .topnav > li > a').each(function(){
        $(this).click(function(){
            let sidenav = $('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            let page = $(this).attr('href').substr(1);
            if(page=='list_name') return;
            loadPage("pages/"+page+".html");
        });
    });
});

const content = $('#body-content');

function loadPage(page) {
    let title = '';
    switch(page){
        case 'pages/home.html':
            title = 'Home';
            break;
        case 'pages/about.html':
            title = 'About';
            break;
        case 'pages/add_data.html':
            title = 'Add Person';
            break;
        case 'pages/contact.html':
            title = 'Contact';
            break;
        case 'pages/list_name.html':
            title = 'List Name';
            break;
        default:
            title = 'Unknown';
    }
    
    $.ajax({
        method: 'get',
        url: page,
        success: (response, text, xhr) => {
            $('.brand-logo').html(title);
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
    $('.brand-logo').html('List Name');
    link = 'https://api.kangkode.site/v1/'+link;
    $.ajax({
        method: target,
        url: link,
        beforeSend: function(){
          content.html("wait...");  
        },
        success: response => {
            
                    let parsing = JSON.parse(response);
                    
                    var table = '<table>';
		            let i = 1;
                    parsing.forEach((item, id)=>{
                        table += `<tr>
                                <td>${i++}</td>
                                <td>${item.name}</td>
                                <td>${item.teknik}</td>          
                        </tr>`;
                    });
                    
                    content.html(table);

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

const addData = () => {
    let name = document.getElementById('name').value
    let teknik = document.getElementById('teknik').value

    if(name === '' || teknik === ''){
        alert("pastikan semua data terisi");
        return true;
    }else{
        let link = "https://api.kangkode.site/v1/add_name";
        $.ajax({
            method: 'post',
            url: link,
            data: {
                name: name,
                teknik: teknik
            },
            dataType: 'json',
            success: result => {
                if(result.response){
                    alert("sukses menambahkan nama");
                    $('#name').val('')
                    $('#teknik').val('')
                }else{
                    alert("failed to add name, or check your conncection");
                }
            }
        })
    }
    
}
