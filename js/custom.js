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

const loadPage = page => {
    $.ajax({
        method: 'get',
        url: page+".html",
        success: (response, text, xhr) => {
            console.log(xhr.status)
            $('#body-content').html(response)
        }
    })
}