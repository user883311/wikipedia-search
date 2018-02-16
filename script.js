// Generation of a random article
$(document).ready(function () {
    $("#feelingLuckyButton").click(function () {
        window.open("https://en.wikipedia.org/wiki/Special:Random");
    });
});

// Wikipedia search results
function getApiData(srStr) {
    var result =
        console.log("calling getResults...");
    // Wikipedia API sandbox @ https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=jsonfm
    var wikipediaAPI = "https://en.wikipedia.org";
    wikipediaAPI += "/w/api.php?action=opensearch&format=json&search=";
    wikipediaAPI += srStr;
    wikipediaAPI += "&namespace=0";
    $.ajax({
        url: wikipediaAPI,
        dataType: "json",
        data: {
            origin: "*"
        },
        type: "GET",
        success: function (data) {
            var strHtmlUniqueSearchBox = "";
            // create variables for result title, description, URL link
            var arrResultTitle = [];
            var arrResultDescription = [];
            var arrResultURL = [];

            // Create HTML code to be added
            var strHtmlCode = "";
            var uniqueResultDiv = "";
            for (i = 0; i < data[1].length; i++) {
                arrResultTitle[i] = data[1][i];
                arrResultDescription[i] = data[2][i];
                arrResultURL[i] = data[3][i];
                // Create unique-result-box for each search result
                uniqueResultDiv = "<a href=" + arrResultURL[i] + " target='_blank'>" + "<div class='row unique-result-box'>"; // reset
                uniqueResultDiv += "<h1 class='result-title'>" + arrResultTitle[i] + "</h1>"; // title div
                uniqueResultDiv += "<h2 class='result-description'>" + "<a class='link-text' href=" + arrResultURL[i] + " target='_blank'>" + arrResultDescription[i] + "</a></h2>";// description div
                uniqueResultDiv += "</div>" + "</a>";// close the unique-result-box
                // add to overall HTML code to be added
                strHtmlCode += uniqueResultDiv;
            };
            $("#results-list").append(strHtmlCode);
        },
    });
};

$(document).ready(function () {
    $("#searchButton").click(function () {
        var srStr;
        srStr = document.getElementById("searchInput").value;
        getApiData(srStr);
    });
});