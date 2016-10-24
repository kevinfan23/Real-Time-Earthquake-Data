var locations = [];
var cities = [];
var places = [];
var magnitudes = [];
var source = $("#entry-template").html();
var template = Handlebars.compile(source);  

// execute once my page is loaded
$(document).ready(function(){

    // make the ajax request
    $.ajax({
        url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson"
		
    // process_data is a callback function, the result of the data 
    // is automatically passed in as an argument
    
    }).done(process_data);
});

function process_data(json_data) {
        
    for (i = 0; i < json_data.features.length; i++) {
    	locations[i] = json_data.features[i]['properties']['place'];
    	cities[i] = locations[i].split(' of ');
    	places[i] = cities[i][1].split(', ')[0];
    	magnitudes[i] = json_data.features[i]['properties']['mag'];
    }
    
    console.log(locations);
    console.log(cities);
    console.log(places);
    console.log(magnitudes); 
    
    display_data();   
}

function display_data() {
	var i = 0;
	    
    window.setInterval(function(){

        var context = {location: locations[i], place: places[i], magnitude: magnitudes[i]};
        var html = template(context);
        $("#earthquake-data").html(html);

        if (magnitudes[i] <= 2) {
	        $(".des").html("another");
            $(".earthquake").html("peaceful");
	        $(".time").html("day");
	        $('img').hide();
        }
        else if (magnitudes[i] >= 2 && magnitudes[i] < 5) {
            $(".des").html("just");
            $(".earthquake").html("shaky");
	        $(".time").html("now");
	        $('img').hide();
        }
        else {
            $(".des").html("fucking");
            $(".earthquake").html("earthquaking");
	        $(".time").html("now");
	        $('img').show();
        }
        
        $('.location_indicator').addClass('fadeOut');
        $('.earthquake-data-container').addClass('fadeIn');
        i++;
        if(i === locations.length) {
            i = 0;
        }
    }, 3500);
}


