const dropdown = document.getElementById("dropdown")
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

dropdown.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
