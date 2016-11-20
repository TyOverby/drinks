let name = document.querySelector("caption").textContent;
let tbody = document.querySelector("tbody");

let props = { "name": name };

for (let child of tbody.children) {
    let left = child.children[0];
    let right = child.children[1];
    if (right) {
        props[left.textContent] = right.textContent;
    }
}
