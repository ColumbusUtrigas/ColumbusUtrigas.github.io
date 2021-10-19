function appendHtml(el, str) {
    var div = document.createElement('div'); //container to append to
    div.innerHTML = str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
    }
}

function appendCard(to, header, tags, desc, link, linktext) {
    var html = `
    <div class="work">
        <h3 class="project-header">${header}</h3>
        <h3 class="project-header language">${tags}</h3>
        <p>${desc}
        </p>
        <a href="${link}" class="link">
            ${linktext}
            <div class="link-arrow">
                <svg width="21" height="10" viewBox="0 0 21 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.6667 1L19.6667 5M19.6667 5L15.6667 9M19.6667 5H0" stroke="#1E1E1E"/>
                </svg>
            </div>
        </a>
    </div>
    `;
    appendHtml(to, html);
}

function appendWork(to, info) {
    appendCard(to, info.header, info.tags, info.description, info.link, "github");
}

function appendArticle(to) {
    appendCard(to, "Article", "Tag, tag, tag", "Some short description", "", "read");
}

function loadWorks() {
    const columnsNum = 3;

    let num = Math.trunc(worksJson.length / columnsNum);
    let remains = worksJson.length % columnsNum;

    let counter = 0;
    for (let col = 1; col <= columnsNum; col++)
    {
        let column = document.getElementById(`works-column-${col}`)

        for (let i = 0; i < num; i++) {
            appendWork(column, worksJson[counter++])
        }

        if (remains) {
            appendWork(column, worksJson[counter++]);
            remains--;
        }
    }
}

function loadBlog() {
    let column = document.getElementById(`blog-column-${1}`)

    appendArticle(column);
}

window.onload = function() {
    let arrow = document.getElementById("arrow");
    let top = document.getElementById("top");

    arrow.addEventListener("click", function() {
        window.scrollTo(0, top.scrollHeight);
    });

    loadWorks();
    loadBlog();
}
