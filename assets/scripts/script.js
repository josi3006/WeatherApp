// API Key for Testing: ad876f463f78ac43b64b6d472fcaaf40


$(document).ready(function () {

    pageLoadCityList();

    // var loadCity = localStorage.getItem('latestSearch');

    // var capLoadCity = loadCity.charAt(0).toUpperCase() + loadCity.slice(1)

    // $('#citySearchTxt').val(capLoadCity);

    $('#citySearchTxt').on('click', function (event) {
        event.preventDefault();

        console.log('you clicked me!!!');
    });

  
    $('#citySearchBtn').on('click', function (event) {
        event.preventDefault();



        $('.dayCol').empty();

        var cityName = $('#citySearchTxt').val();


        localStorage.setItem('latestSearch', cityName);


        console.log('from the top: ' + cityName);

        // URL to call weather API


        var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',us&units=imperial&APPID=ad876f463f78ac43b64b6d472fcaaf40';






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






            // Function to call UV Index API ***INSIDE THE WEATHER API CALL***

            var uvURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=ad876f463f78ac43b64b6d472fcaaf40&lat=' + latCoord + '&lon=' + lonCoord


            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {

                var currUV = response.value





                // Function to call forecast and loop to create 5-day array


                var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + ',us&units=imperial&APPID=ad876f463f78ac43b64b6d472fcaaf40'



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


                        foreArray.push(fFullDate, fIcon, fTemp, fHumid);

                    }





                    // Code to render current weather info on page

                    $('#currentWxCol').empty();

                    var iconURL = '<image src="http://openweathermap.org/img/wn/' + currIcon + '@2x.png">';



                    // $('#currentWxCol').append('<h3>' + cityName + ' (' + month + '/' + date + '/' + year + ') ' + iconURL + '</h3>');
                    $('#currentWxCol').append('<h3>' + 'Current Weather' + ' for ' + month + '/' + date + '/' + year + ' ' + iconURL + '</h3>');


                    $('#currentWxCol').append('<p>' + 'Temperature: ' + currTemp + ' &#176F' + '</p>');
                    $('#currentWxCol').append('<p>' + 'Humidity: ' + currHumid + '%</p>');
                    $('#currentWxCol').append('<p>' + 'Wind Speed: ' + currWind + ' mph</p>');
                    $('#currentWxCol').append('<p>' + 'UV Index: ' + currUV + '</p>');





                    // Code to render forecast weather info on page

                    $('#day1col').append('<h6>' + foreArray[0] + '</h6>');
                    $('#day1col').append('<image src="http://openweathermap.org/img/wn/' + foreArray[1] + '@2x.png">');
                    $('#day1col').append('<p class="small">' + 'Temp: ' + foreArray[2] + ' &#176F' + '</p>');
                    $('#day1col').append('<p class="small">' + 'Humidity: ' + foreArray[3] + '%</p>');

                    $('#day2col').append('<h6>' + foreArray[4] + '</h6>');
                    $('#day2col').append('<image src="http://openweathermap.org/img/wn/' + foreArray[5] + '@2x.png">'); $('#day2col').append('<p class="small">' + 'Temp: ' + foreArray[6] + ' &#176F' + '</p>');
                    $('#day2col').append('<p class="small">' + 'Humidity: ' + foreArray[7] + '%</p>');

                    $('#day3col').append('<h6>' + foreArray[8] + '</h6>');
                    $('#day3col').append('<image src="http://openweathermap.org/img/wn/' + foreArray[9] + '@2x.png">'); $('#day3col').append('<p class="small">' + 'Temp: ' + foreArray[10] + ' &#176F' + '</p>');
                    $('#day3col').append('<p class="small">' + 'Humidity: ' + foreArray[11] + '%</p>');

                    $('#day4col').append('<h6>' + foreArray[12] + '</h6>');
                    $('#day4col').append('<image src="http://openweathermap.org/img/wn/' + foreArray[13] + '@2x.png">'); $('#day4col').append('<p class="small">' + 'Temp: ' + foreArray[14] + ' &#176F' + '</p>');
                    $('#day4col').append('<p class="small">' + 'Humidity: ' + foreArray[15] + '%</p>');

                    $('#day5col').append('<h6>' + foreArray[16] + '</h6>');
                    $('#day5col').append('<image src="http://openweathermap.org/img/wn/' + foreArray[17] + '@2x.png">'); $('#day5col').append('<p class="small">' + 'Temp: ' + foreArray[18] + ' &#176F' + '</p>');
                    $('#day5col').append('<p class="small">' + 'Humidity: ' + foreArray[19] + '%</p>');



                    $("#navheader").text(cityName);



                    function saveList() {

                        // var cityArray = [];

                        var cityArray = localStorage.getItem('cityArray');

                        console.log(cityArray);

                        if (cityArray === null) {
                            cityArray = [];
                        }

                        else {
                            cityArray = JSON.parse(cityArray);
                        }


                        console.log(cityArray);


                        cityArray.push(cityName);

                        console.log('going to LS: ' + cityArray);

                        console.log(cityArray);

                        localStorage.setItem('cityArray', JSON.stringify(cityArray));


                    }

                    saveList();



                });



            });





        });

    });

    var unique = [];

    function pageLoadCityList() {

        $("#navheader").text("Weather Search");

        var cityArray = localStorage.getItem('cityArray');

        console.log(cityArray);

        if (cityArray === null) {
            cityArray = [];
        }

        else {
            cityArray = JSON.parse(cityArray);
        }

        unique = [...new Set(cityArray)];


        for (i = 0; i < unique.length; i++) {


            $('#searchTable').prepend('<tr><td><a>' + unique[i] + '</a></td></tr>');

            // $("#citySearchTxt").val(unique[0]);
            $("#citySearchTxt").val('Enter City Name');



        }

    }


    $('td').on('click', function () {

        var oldText = $(this).text();

        console.log('you clicked: ' + oldText);

        $("#citySearchTxt").val(oldText);

        localStorage.setItem('latestSearch', oldText);


    })




});