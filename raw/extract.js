let jsdom = require("jsdom").jsdom;
let fs = require("fs");

function intoArray(s) {
    return s.split(/\n/)
            .map(c => c.trim())
            .filter(w => w.length != 0)
}

let trx = function(contents) {
    let document = jsdom(`<table> ${contents} </table>`);
    let tbody = document.querySelector("tbody");
    let name = document.querySelector("caption");
    if (tbody == null || name == null) { return null; }

    let props = {
        "Name": name.textContent.trim(),
        "Notes": null,
    };
    for (row of tbody.children) {
        let left = row.children[0];
        let right = row.children[1];
        if (right) {
            left = left.textContent.trim();
            right = right.textContent.trim();

            switch(left) {
                case "Type": continue;
                case "IBA specified ingredients*":
                    left = "Ingredients"
                    right = intoArray(right);
                    break;
                case "Primary alcohol by volume":
                    left = "Primary Alcohol"
                    right = intoArray(right);
                    break;
            }

            props[left] = right;
        }
    }

    return props;
};

let out = fs.readdirSync(".")
            .filter(f => f.endsWith(".html"))
            .map(f => fs.readFileSync(f))
            .map(trx)
            .filter(p => p != null);

let finished = [];
for (o of out) {
    finished.push(o);
}

fs.writeFileSync("../out.json", JSON.stringify(finished, null, 4));
