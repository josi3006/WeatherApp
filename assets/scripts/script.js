// API Key for Testing: ad876f463f78ac43b64b6d472fcaaf40


$(document).ready(function () {
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
            var currIcon = response.weather[0].icon
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
            console.log(currIcon);




            // Function to call UV Index API ***INSIDE THE WEATHER API CALL***

            var uvURL = 'http://api.openweathermap.org/data/2.5/uvi?appid=ad876f463f78ac43b64b6d472fcaaf40&lat=' + latCoord + '&lon=' + lonCoord


            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {

                var currUV = response.value

                console.log('Current UV Index: ' + currUV);




                var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + ',us&units=imperial&APPID=ad876f463f78ac43b64b6d472fcaaf40'



                $.ajax({
                    url: forecastURL,
                    method: "GET"
                }).then(function (response) {

                    var foreArray = [];


                    for (var i = 7; i < 41; i += 8) {

                        var fUTC = response.list[i].dt + response.city.timezone
                        var fDate = new Date(fUTC * 1000);
                        var fmonth = fDate.getMonth() + 1;
                        var fdate = fDate.getDate();
                        var fyear = fDate.getFullYear();
                        var fFullDate = fmonth + '/' + fdate + '/' + fyear;
                        var fTemp = response.list[i].main.temp;
                        var fHumid = response.list[i].main.humidity;
                        var fIcon = response.list[i].weather[0].icon;

                        console.log('icon is: ' + fIcon);

                        console.log('date is: ' + fFullDate);
                        console.log('fTemp: ' + fTemp);
                        console.log('Humidity: ' + fHumid);


                        foreArray.push(fFullDate, fIcon, fTemp, fHumid);

                    }

                    console.log(foreArray);




                    // Code to render info on page

                    $('#currentWxCol').empty();

                    var iconURL = '<image src="http://openweathermap.org/img/wn/' + currIcon + '@2x.png">';

                    console.log(iconURL);


                    $('#currentWxCol').append('<h3>' + cityName + ' (' + month + '/' + date + '/' + year + ') ' + iconURL + '</h3>');

                    $('#currentWxCol').append('<p>' + 'Temperature: ' + currTemp + ' &#176F' +'</p>');
                    $('#currentWxCol').append('<p>' + 'Humidity: ' + currHumid + '%</p>');
                    $('#currentWxCol').append('<p>' + 'Wind Speed: ' + currWind + ' mph</p>');
                    $('#currentWxCol').append('<p>' + 'UV Index: ' + currUV + '</p>');

                    

                    $('#day1col').append('<h6>' + foreArray[0] + '</h6>');
                    $('#day1col').append('<image src="http://openweathermap.org/img/wn/' + foreArray[1] + '@2x.png">');
                    $('#day1col').append('<p class="small">' + 'Temp: ' + foreArray[2] + ' &#176F' + '</p>');
                    $('#day1col').append('<p class="small">' + 'Humidity: ' + foreArray[3] + '%</p>');

                    $('#day2col').append('<h6>' + foreArray[4] + '</h6>');
                    $('#day2col').append('<image src="http://openweathermap.org/img/wn/' + foreArray[5] + '@2x.png">');                    $('#day2col').append('<p class="small">' + 'Temp: '  + foreArray[6] + ' &#176F' + '</p>');
                    $('#day2col').append('<p class="small">' + 'Humidity: '  + foreArray[7] + '%</p>');

                    $('#day3col').append('<h6>' + foreArray[8] + '</h6>');
                    $('#day3col').append('<image src="http://openweathermap.org/img/wn/' + foreArray[9] + '@2x.png">');                    $('#day3col').append('<p class="small">' + 'Temp: '  + foreArray[10] + ' &#176F' + '</p>');
                    $('#day3col').append('<p class="small">' + 'Humidity: '  + foreArray[11] + '%</p>');

                    $('#day4col').append('<h6>' + foreArray[12] + '</h6>');
                    $('#day4col').append('<image src="http://openweathermap.org/img/wn/' + foreArray[13] + '@2x.png">');                    $('#day4col').append('<p class="small">' + 'Temp: '  + foreArray[14] + ' &#176F' + '</p>');
                    $('#day4col').append('<p class="small">' + 'Humidity: '  + foreArray[15] + '%</p>');

                    $('#day5col').append('<h6>' + foreArray[16] + '</h6>');
                    $('#day5col').append('<image src="http://openweathermap.org/img/wn/' + foreArray[17] + '@2x.png">');                    $('#day5col').append('<p class="small">' + 'Temp: '  + foreArray[18] + ' &#176F' + '</p>');
                    $('#day5col').append('<p class="small">' + 'Humidity: '  + foreArray[19] + '%</p>');



                });



            });



        });


    });


    // Function to convert 3-hour forecast to 5-day




    // Function to create and/or call data from Local Storage (recent searches and last viewed city)


    // Function to push new city to Local Storage Array


    // Function to set last viewed city info into Local Storage
});

