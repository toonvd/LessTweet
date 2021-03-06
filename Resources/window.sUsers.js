var win = Titanium.UI.currentWindow;
win.backgroundImage = 'images/background-blue.png';
win.barColor = '#000';
var state = 0;
var tableView = Ti.UI.createTableView({
	top : Titanium.Platform.displayCaps.platformHeight * 0.11,
});
var textField = Ti.UI.createTextField({
	hintText : "Zoeken over twitter",
	backgroundColor : "#fff",
	borderColor : "#fff",
	borderWidth : 1,
	borderRadius : Titanium.Platform.displayCaps.platformWidth * 0.02,
	left : Titanium.Platform.displayCaps.platformWidth * 0.02,
	right : Titanium.Platform.displayCaps.platformWidth * 0.40,
	top : 10,
	height : 'auto'
});
Ti.UI.currentWindow.add(textField);

var buttonSearch = Ti.UI.createButton({
	title : "Zoeken",
	left : Titanium.Platform.displayCaps.platformWidth * 0.65,
	right : Titanium.Platform.displayCaps.platformWidth * 0.02,
	top : 9,
	height : 'auto'
});
Ti.UI.currentWindow.add(buttonSearch);

buttonSearch.addEventListener("click", function() {
	Titanium.UI.Android.hideSoftKeyboard();
	if(state == 1) {
		if(tableView.data.length > 0) {
			for(var i = tableView.data[0].rows.length - 1; i >= 0; i--) {
				tableView.deleteRow(i);
			}
		}
	}
	var rows = [];

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
			exitOnClose : true,
			fullscreen : false
		});
		detail.open();
	});
	var loaderTwitterSearch = Ti.Network.createHTTPClient({
		timeout : 30000
	});

	Ti.API.debug("http://search.twitter.com/search.json?q=" + textField.value);

	loaderTwitterSearch.open("GET", "http://search.twitter.com/search.json?q=" + textField.value);
	loaderTwitterSearch.onload = function() {
		var result = JSON.parse(this.responseText);
		var tweets = result.results;

		if(tweets.length == 0.0) {
			activityIndicator.hide();
			alert("Er is iets misgelopen: check je internetverbinding en je zoekterm.");
		} else {
			for(var i = 0; i < tweets.length; i++) {
				var row = Ti.UI.createTableViewRow({
					height : 'auto',
					top : -70,
					hasChild : true,
					tweet : tweets[i].text,
					user_name : tweets[i].from_user,
					image : tweets[i].profile_image_url,
					date : tweets[i].created_at
				});

				var image = Ti.UI.createImageView({
					image : tweets[i].profile_image_url,
					left : Titanium.Platform.displayCaps.platformWidth * 0.01,
					top : Titanium.Platform.displayCaps.platformWidth * 0.01,
					bottom : Titanium.Platform.displayCaps.platformWidth * 0.01,
					width : Titanium.Platform.displayCaps.platformWidth * 0.10,
					height : Titanium.Platform.displayCaps.platformWidth * 0.10
				});
				row.add(image);

				var name = Ti.UI.createLabel({
					text : tweets[i].from_user,
					font : {
						fontSize : Titanium.Platform.displayCaps.platformWidth * 0.04
					},
					left : Titanium.Platform.displayCaps.platformWidth * 0.14,
					top : Titanium.Platform.displayCaps.platformWidth * 0.01,
					color : '#09969b',
					height : 'auto'
				});
				row.add(name);

				var tweet = Ti.UI.createLabel({
					text : tweets[i].text,
					color : 'white',
					font : {
						fontSize : Titanium.Platform.displayCaps.platformWidth * 0.04
					},
					left : Titanium.Platform.displayCaps.platformWidth * 0.16,
					height : 'auto',
					top : Titanium.Platform.displayCaps.platformWidth * 0.06,
					bottom : Titanium.Platform.displayCaps.platformWidth * 0.02
				});
				row.add(tweet);
				rows.push(row);
			}
			tableView.setData(rows);
			activityIndicator.hide();
		}
	}
	loaderTwitterSearch.send();
	state = 1;
})
// MENU!!!
var activity = Ti.Android.currentActivity;
activity.onCreateOptionsMenu = function(e) {
	var menu = e.menu;
	var menuItem = menu.add({
		title : "Vorige"
	});
	menuItem.setIcon("LH2_Previous_icon..png");
	menuItem.addEventListener("click", function(e) {
		Ti.UI.currentWindow.close();
	});
	var menuItem1 = menu.add({
		title : "Home",
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
