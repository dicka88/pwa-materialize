document.addEventListener("DOMContentLoaded", () => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav()
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

// document.addEventListener("DOMContentLoaded", function() {
//     // Activate sidebar nav
//     var elems = document.querySelectorAll(".sidenav");
//     M.Sidenav.init(elems);
//     loadNav();
   
//     function loadNav() {
//       var xhttp = new XMLHttpRequest();
//       xhttp.onreadystatechange = function() {
//         if (this.readyState == 4) {
//           if (this.status != 200) return;
   
//           // Muat daftar tautan menu
//           document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
//             elm.innerHTML = xhttp.responseText;
//           });
//         }
//       };
//       xhttp.open("GET", "nav.html", true);
//       xhttp.send();
//     }
// }  )