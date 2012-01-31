var latitude;
var longitude;

var win = Titanium.UI.currentWindow;
win.backgroundImage = 'images/background-blue.png';
win.barColor = '#000';
var state = 0;
var tableView = Ti.UI.createTableView({
	top : Titanium.Platform.displayCaps.platformHeight * 0.1,
});

var buttonSearch = Ti.UI.createButton({
	title : "Zoeken",
	left : 10,
	right : 10,
	top : 5,
	height : 50
});
Ti.UI.currentWindow.add(buttonSearch);

buttonSearch.addEventListener("click", function() {
	//Global variables for geolocation data.

	if(Ti.Platform.osname == "android") {
		var activityIndicator = Ti.UI.createActivityIndicator({
			message : "Loading"
		});
	} else {
		var activityIndicator = Ti.UI.createActivityIndicator({
			style : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
		});
	}
	activityIndicator.show();
	Ti.App.GeoApp = {};
	Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_NETWORK;
	Ti.Geolocation.purpose = "testing";

	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 1;
	if(Titanium.Geolocation.locationServicesEnabled == false) {
		Ti.API.debug('Your device has GPS turned off. Please turn it on.');
	}
	function updatePosition(e) {
		if(!e.success || e.error) {
			activityIndicator.hide();
			alert("Unable to get your location.");
			Ti.API.debug(JSON.stringify(e));
			Ti.API.debug(e);
			return;
		} latitude = e.coords.latitude, longitude = e.coords.longitude

	};


	Ti.App.addEventListener("app:got.location", function(d) {
		Ti.App.GeoApp.f_lng = d.longitude;
		Ti.App.GeoApp.f_lat = d.latitude;
		Ti.API.debug(JSON.stringify(d));
		Ti.Geolocation.removeEventListener('location', updatePosition);

	});
	Titanium.Geolocation.getCurrentPosition(updatePosition);
	Titanium.Geolocation.addEventListener('location', updatePosition);
	if(latitude != null && longitude != null) {

		if(state == 1) {
			if(tableView.data.length > 0) {
				for(var i = tableView.data[0].rows.length - 1; i >= 0; i--) {
					tableView.deleteRow(i);
				}
			}
		}

		var rows = [];

		Ti.UI.currentWindow.add(tableView);
		tableView.addEventListener("click", function(el) {
			var detail = Ti.UI.createWindow({
				title : "Details",
				url : "window.details.js",
				tweet : el.rowData.tweet,
				user_name : el.rowData.user_name,
				image : el.rowData.image,
				date : el.rowData.date,
				barColor : Ti.UI.currentWindow.barColor,
				backgroundColor : "#fff",
				backgroundImage : 'images/background-blue.png',
				modal : true,
				fullscreen : false,
				exitOnClose : true
			});

			detail.open();
		});
		var loaderTwitterSearch = Ti.Network.createHTTPClient({
			timeout : 30000
		});

		Ti.API.debug("http://search.twitter.com/search.json?geocode=" + latitude + "," + longitude + ",5mi");

		loaderTwitterSearch.open("GET", "http://search.twitter.com/search.json?geocode=" + latitude + "," + longitude + ",2mi");
		loaderTwitterSearch.onload = function() {
			var result = JSON.parse(this.responseText);
			var tweets = result.results;

			for(var i = 0; i < tweets.length; i++) {

				var row = Ti.UI.createTableViewRow({
					height : 70,
					hasChild : true,
					tweet : tweets[i].text,
					user_name : tweets[i].from_user,
					image : tweets[i].profile_image_url,
					date : tweets[i].created_at
				});

				var image = Ti.UI.createImageView({
					image : tweets[i].profile_image_url,
					left : 5,
					top : 5,
					bottom : 5,
					width : 40
				});
				row.add(image);

				var name = Ti.UI.createLabel({
					text : tweets[i].from_user,
					font : {
						fontSize : Titanium.Platform.displayCaps.platformWidth * 0.04
					},
					left : 50,
					top : 5,
					color : '#09969b',
					height : 'auto'
				});
				row.add(name);

				var location = Ti.UI.createLabel({
					text : tweets[i].location,
					left : 50,
					font : {
						fontSize : Titanium.Platform.displayCaps.platformWidth * 0.04
					},
					height : 'auto',
					color : 'white',
					top : 20
				});
				row.add(location);
				rows.push(row);
			}

			tableView.setData(rows);
			activityIndicator.hide();
		}

		loaderTwitterSearch.send();
		state = 1;
	} else {
		activityIndicator.hide();
		alert('Kon de gegevens niet ophalen: verifieer of uw gps aanstaat en probeer opnieuw');
	}
})
// MENU!!!
var activity = Ti.Android.currentActivity;
activity.onCreateOptionsMenu = function(e) {
	var menu = e.menu;
	var menuItem = menu.add({
		title : "Vorige"
	});
	menuItem.setIcon("LH2_Previous_icon.png");
	menuItem.addEventListener("click", function(e) {
		Ti.UI.currentWindow.close();
	});
	var menuItem1 = menu.add({
		title : "Home"
	});
	menuItem1.setIcon("home.png");
	menuItem1.addEventListener("click", function(e) {
		var win = Titanium.UI.createWindow({
			backgroundColor : '#16c2c8',
			url : 'window.menu.js',
			navBarHidden : false
		});
		win.open();
	});
};
