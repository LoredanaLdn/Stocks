async function chart() {
    const data = await getData();
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xLabels,
            datasets: [{
                responsive: true,
                label: document.getElementById('inputStock').querySelector('input').value.toUpperCase(),
                fill: true,
                data: data.ylabels,
                pointBackgroundColor: 'purple',
                pointRadius: 3,
                backgroundColor: [
                    'rgba(0, 156, 43, 0.2)',
                ],
                borderColor: [
                    'rgba(128,0,128,1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: 'black',
                        fontStyle: 'bold',
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'black',
                        fontStyle: 'bold'
                    }
                }]
            }
        }
    });
}

function setURL() {
    const stockName = document.getElementById('inputStock').querySelector('input').value.toUpperCase();
    const url_string = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&symbol=^IXIC&range=10y&region=US";
    let url = new URL(url_string);
    url.searchParams.set('symbol', stockName);
    return url;
}

async function getData() {
    const xLabels = [], ylabels = [];
    let url = setURL();
    const response = await fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "230c2d96ecmsha2bbab31d931c1dp120b99jsn7d8ecc790b39",
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }
    })
    const data = await response.json();
    const timestampLength = Number(data.chart.result[0].timestamp.length);

    for (let i = 0; i < timestampLength; ++i) {
        let currentTimestamp = data.chart.result[0].timestamp[i];
        let date = new Date(currentTimestamp * 1000).toLocaleDateString("en-US");
        xLabels.push(date);
    }

    const highPricesLength = Number(data.chart.result[0].indicators.quote[0].high.length);
    for (let i = 0; i < highPricesLength; ++i) {
        ylabels.push(Number(data.chart.result[0].indicators.quote[0].high[i]));
    }

    return { xLabels, ylabels };
}

function init() {
    const button = document.getElementById('confirmButton');
    button.addEventListener('click', function(e) {
        e.preventDefault();
    })
    button.addEventListener('click', setURL);
    button.addEventListener('click', chart);
}

init();


