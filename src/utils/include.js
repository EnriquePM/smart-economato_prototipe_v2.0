async function includeHTML(id, file) {
    const container = document.getElementById(id);
    if (!container) return;

    const response = await fetch(file);
    container.innerHTML = await response.text();
}

includeHTML("header", "head.html");
includeHTML("footer", "foot.html");