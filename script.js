window.onload = function() {
    let arrow = document.getElementById("arrow");
    let top = document.getElementById("top");

    arrow.addEventListener("click", function() {
        window.scrollTo(0, top.scrollHeight);
    });
}
