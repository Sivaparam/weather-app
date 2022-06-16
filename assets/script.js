var today = moment().format("MM/DD/YYYY");
var searchButton = document.getElementById("searchBtn");
var apiKey = "";

// function that gets invoked when search button is clicked
searchButton.addEventListener("click", getApi);

function getApi() {
    var latVal = 0;
    var lonVal = 0;
    var searchCity = $("#placeName").val();

    //below api is used to get the coordiantes for that place name entered

    var coordinate = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchCity + "&appid=" + apiKey;

    fetch(coordinate)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            latVal = data[0].lat;
            lonVal = data[0].lon;
            var cPalDat = data[0].name + "(" + today + ")";

            //below api is used to get the weather details using the lat and lon retrived from previous api call

            var requestURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + latVal + "&lon=" + lonVal + "&exclude=hourly,minutely,alerts&appid=" + apiKey;

            fetch(requestURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    
                    // on sucess of the api call, below displays current weather details for selected city
                    $("#place").text(cPalDat);
                    var temp = Math.round(1.8 * (data.current.temp - 273) + 32 )+ " F";
                    $("#cTemp").text(temp);
                    $("#cWind").text(data.current.wind_deg);
                    $("#cHum").text(data.current.humidity);
                    $("#cUV").text(data.current.uvi);

                    //below loop displays 5-day forecast weather for selected city

                    for (var i = 0; i < 5; i++) {
                        $("#f_date_" + i).text(moment().add((i + 1), 'd').format("MM/DD/YYYY"));
                        $("#f_Temp_" + i).text(Math.round(1.8 * (data.daily[i].temp.day-273) +32) + " F");
                        $("#f_Wind_" + i).text(data.daily[i].wind_deg);
                        $("#f_Hum_" + i).text(data.daily[i].humidity);
                        $("#f_UV_" + i).text(data.daily[i].uvi);
                    }
                });
        });

}







