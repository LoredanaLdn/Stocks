let search;

$(document).ready(function() {
    search = "";
    getStockInfo();
    getStockData();
    getStockChart();

    $("#viewChart").on("click", function() {
        $("#stockChart").toggleClass("hidden");
    });

    $(".searchbar").keypress(function(e) {
        if(e.which == 13) {
            search = $(".searchbar").val();
            getStockInfo();
            getStockChart();
        }
    });
})

function getStockInfo() {
    data = $.ajax({
        type: "GET",
        url: `https://api.iextrading.com/1.0/stock/${search}/quote`,
        dataType: "json",
        success: function(data){
            let name = data.symbol;
            let price = rounder(data.latestPrice, 2);
            let change = data.changePercent;

            $(".header .name").text(name);
            $(".header .price").text(price);
            $(".header .change").text((rounder(change, 4) * 100).toFixed(2) + "%");
            $(".closeTime").text(`Trading Window Closes: ${closeTime}`);

            if(change >= 0) {
                $(".header .change").css("color", "green");
                $(".header .change").prepend("&#x25B2;");
            } else {
                $(".header .change").css("color", "red");
                $(".header .change").prepend("&#x25BC;");
            }
        }
    });
}

function getStockData() {
    data = $.ajax({
    	type: "GET",
    	url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^DJI&apikey=D82RGKW7PC6AAW7D",
    	dataType: "json",
    	 
    });
}

function getStockChart(){
    new TradingView.MediumWidget({
        "container_id": "tv-medium-widget-5e6f9",
        "symbols": [
        [
            "Google",
            search
        ]
        ],
        "gridLineColor": "#e9e9ea",
        "fontColor": "#83888D",
        "underLineColor": "#dbeffb",
        "trendLineColor": "#4bafe9",
        "width": "80%",
        "height": "400px",
        "locale": "en"
    });
}

setInterval(getStockInfo, 10000);
