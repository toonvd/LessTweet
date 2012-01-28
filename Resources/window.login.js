var win = Titanium.UI.currentWindow;
win.backgroundImage = 'images/background-blue.png';
win.barColor = '#000';
var state = 0;
var tableView = Ti.UI.createTableView({
	top : 140,
});
Ti.include("lib/twitter_api.js");
var textField = Ti.UI.createTextField({
	hintText : "Geef hier je tweet in",
	backgroundColor : "#fff",
	borderColor : "#fff",
	borderWidth : 1,
	borderRadius : Titanium.Platform.displayCaps.platformWidth * 0.01,
	left : Titanium.Platform.displayCaps.platformWidth * 0.01,
	right : Titanium.Platform.displayCaps.platformWidth * 0.01,
	top : Titanium.Platform.displayCaps.platformWidth * 0.02,
	height : 'auto'
});

Ti.UI.currentWindow.add(textField);

var buttonSubmit = Ti.UI.createButton({
	title : "Tweet posten",
	left : Titanium.Platform.displayCaps.platformWidth * 0.01,
	right : Titanium.Platform.displayCaps.platformWidth * 0.01,
	top : Titanium.Platform.displayCaps.platformWidth * 0.20,
	height : 'auto'
});
Ti.UI.currentWindow.add(buttonSubmit);

buttonSubmit.addEventListener("click", function() {
	Titanium.UI.Android.hideSoftKeyboard();
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
			barColor : Ti.UI.currentWindow.barColor,
			backgroundColor : "#fff"
		});
		detail.open();
	});
	var twitterApi = new TwitterApi({
		consumerKey : 'qQR9StnN4y4RfMRASXSg',
		consumerSecret : 'J6ygzgy6OKQSz0emlSi2SYc2Z6o8M7wOdXjzKHqr6a4'
	});
	twitterApi.init();

	twitterApi.statuses_update({
		onSuccess : function(responce) {
			alert('tweet success');
			Ti.API.info(responce);
		},
		onError : function(error) {
			Ti.API.error(error);
		},
		parameters : {
			status : textField.value
		}
	});

	twitterApi.statuses_home_timeline({
		onSuccess : function(tweets) {

			for(var i = 0; i < tweets.length; i++) {
				var row = Ti.UI.createTableViewRow({
					height : 50,
					hasChild : true,
					tweet : tweets[i].text,
					user_name : tweets[i].from_user
				});

				var image = Ti.UI.createImageView({
					image : tweets[i].user.profile_image_url,
					left : 5,
					top : 5,
					bottom : 5,
					width : 40
				});
				row.add(image);

				var name = Ti.UI.createLabel({
					text : tweets[i].user.from_user,
					color : 'white',
					font : {
						fontSize : 13
					},
					left : 50,
					top : 5,
					height : 15
				});
				row.add(name);

				var tweet = Ti.UI.createLabel({
					text : tweets[i].text,
					left : 50,
					color : 'white',
					font : {
						fontSize : 13
					},
					height : 30,
					top : 20
				});
				row.add(tweet);

				rows.push(row);

			}
			tableView.setData(rows);
		},
		onError : function(error) {
			Ti.API.error(error);
		}
	});
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
