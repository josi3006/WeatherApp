// API Key for Testing: ad876f463f78ac43b64b6d472fcaaf40


$(document).ready(function() {
// URL to call weather API


$("#citySearchBtn").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#citySearchTxt").val();
    console.log(cityName);


    // var cityName = 'richmond';

    // $('#citySearchTxt');

    var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',us&units=imperial&APPID=ad876f463f78ac43b64b6d472fcaaf40';






    // Function to call Weather API

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (response) {

        // response.preventDefault();

        var cityName = response.name
        var currDescription = response.weather[0].description
        var currTemp = response.main.temp
        var currHumid = response.main.humidity
        var currWind = response.wind.speed

        var latCoord = response.coord.lat
        var lonCoord = response.coord.lon

        var currUTC = response.dt + response.timezone
        var currDate = new Date(currUTC * 1000);
        var month = currDate.getMonth() + 1;
        var date = currDate.getDate();
        var year = currDate.getFullYear();


        console.log('City: ' + cityName);
        console.log('Weather: ' + currDescription);
        console.log('Temperature: ' + currTemp);
        console.log('Humidity: ' + currHumid);
        console.log('Wind Speed: ' + currWind);
        console.log('Latitude: ' + latCoord);
        console.log('Longitude: ' + lonCoord);
        console.log(response.dt);
        console.log(response.timezone);
        console.log(currUTC);
        console.log(currDate);
        console.log('Month: ' + month);
        console.log('Date: ' + date);
        console.log('Year: ' + year);




        // Function to call UV Index API ***INSIDE THE WEATHER API CALL***

        var uvURL = 'http://api.openweathermap.org/data/2.5/uvi?appid=ad876f463f78ac43b64b6d472fcaaf40&lat=' + latCoord + '&lon=' + lonCoord


        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {

            var currUV = response.value

            console.log('Current UV Index: ' + currUV);




            var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + ',us&APPID=ad876f463f78ac43b64b6d472fcaaf40'



            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function (response) {


                for (var i = 8; i < 41; i += 8) {

                    var f1UTC = response.list[i].dt + response.city.timezone
                    var f1Date = new Date(f1UTC * 1000);
                    var f1month = f1Date.getMonth() + 1;
                    var f1date = f1Date.getDate();
                    var f1year = f1Date.getFullYear();

                    console.log('date is: ' + f1month + '/' + f1date + ', ' + f1year);
               

                }





                // Code to render info on page


                $('#currentWxCol').append('<h3>' + cityName + ' (' + month + '/' + date + '/' + year + ')</h3>');

                $('#currentWxCol').append('<p>' + 'Temperature: ' + currTemp + '</p>');
                $('#currentWxCol').append('<p>' + 'Humidity: ' + currHumid + '%</p>');
                $('#currentWxCol').append('<p>' + 'Wind Speed: ' + currWind + 'mph</p>');
                $('#currentWxCol').append('<p>' + 'UV Index: ' + currUV + '</p>');


            });



        });



    });


});


    // Function to convert 3-hour forecast to 5-day




    // Function to create and/or call data from Local Storage (recent searches and last viewed city)


    // Function to push new city to Local Storage Array


    // Function to set last viewed city info into Local Storage
});

