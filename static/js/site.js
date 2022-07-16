document.addEventListener("DOMContentLoaded", function(){
    setupAutoanchors();
})

function setupAutoanchors() {
    var page = document.querySelector(".page-content");
    if (page) {
        var selector = "h1,h2,h3"; //
        page.querySelectorAll(selector).forEach(function(el){
            if (!el.id) {
                // Create an ID for the element
                var id = el.innerText.toLowerCase().replace(/\s/g, "-");
                if (document.getElementById(id)) {
                    // If the ID already exists, add a number to the end
                    var i = 1;
                    while (document.getElementById(id + "-" + i)) {
                        i++;
                    }
                    id += "-" + i;
                }
                el.id = id;
            }
            if (el.id) {
                var icon = document.createElement("a");
                icon.className = "autoanchor fas fa-link";
                icon.href = "#"+el.id;
                icon.innerText = "#"
                el.appendChild(icon);
            }
        });
    }
}