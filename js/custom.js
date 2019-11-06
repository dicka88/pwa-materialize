document.addEventListener("DOMContentLoaded", () => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav()
    var page = window.location.hash.substr(1);
    page = (page == "")? "home" : page
    loadPage(page)
})

const loadNav = () => {
    $.ajax({
        method: 'get',
        url: 'nav.html',
        success: response => {
            $('.sidenav').html(response)
        }
    })
}

$(document).ready(function(){
    $('.sidenav li a').each(function(elm){
        this.addEventListener('click', function(event){
            let sidenav = $('.sidenav')
            M.Sidenav.getInstance(sidenav).close()

            page = $(this).attr('href').substr(1)
            loadPage(page)
        })
    })
})

const content = $('#body-content')

const loadPage = page => {
    $.ajax({
        method: 'get',
        url: "pages/"+page+".html",
        success: (response, text, xhr) => {
            
            const code = xhr.status
            
            switch(code){
                case 200:
                    content.html(response)
                    break
                case 404:
                    content.html("<p>404 Error not found</p>")
                    break
                default:
                    content.html("<p>URL not valid</p>")
            }
        },
        error: function(log){
            switch(log.status){
                case 200:
                    content.html(response)
                    break
                case 404:
                    content.html("<p>404 Error not found</p>")
                    break
                default:
                    content.html("<p>URL not valid</p>")
            }
        } 
    })
}