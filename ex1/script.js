async function fetchData() {
    try{
        const response = await fetch('/data.json');
        const dataJSON = await response.json();
        return dataJSON;
    }
    catch(error) {
        const errMsg = `An error has occured: ${error.status}`
        throw new Error(msg);
    }
}

async function renderData() {
    const data = await fetchData();
    const max = data
                .reduce((prevO, currO) => prevO.amount > currO.amount ? prevO : currO);
    const sum = data
                .reduce((acc, obj) => acc + obj.amount, 0);
    data.forEach(el => {
        let height = 50 * el.amount / max.amount;
        const barHTML = 
        `<div class="graph-bar">
            <div class="bar" style="height:${height}%" data-day="${el.day}"data-value="\$${el.amount}"></div>
            <div class="subscript-font">${el.day}</div>
        </div>`;
        $(".graph-content").append(barHTML);
    });
    $(`.bar[data-day='${max.day}']`).addClass("active");
    $(`.graph-summary .summary-balance`).html(`\$${sum}`);
}

$(document).ready(function () {
    renderData();
})