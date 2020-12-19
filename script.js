window.onload = function() {
    let arrow = document.getElementById("arrow");
    let top = document.getElementById("top");

    arrow.addEventListener("click", function() {
        window.scrollTo(0, top.scrollHeight);
    });

    // request to visits counter server
    const url = "http://95.181.152.178";
    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache'
    });
}
