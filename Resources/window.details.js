var win = Titanium.UI.currentWindow;
win.backgroundImage = 'images/background-blue.png';
win.barColor = '#000';
var image = Ti.UI.createImageView({
					image:Ti.UI.currentWindow.image,
					width:Titanium.Platform.displayCaps.platformWidth * 0.1,
					height:Titanium.Platform.displayCaps.platformWidth * 0.1,
					left : Titanium.Platform.displayCaps.platformWidth * 0.04,
					top:10
				});
Ti.UI.currentWindow.add(image);
var textFieldName = Ti.UI.createLabel({
	left : Titanium.Platform.displayCaps.platformWidth * 0.16,
	top : 10,
	color : '#09969b',
	font : {
		fontSize : Titanium.Platform.displayCaps.platformHeight * 0.05
	},
	text : Ti.UI.currentWindow.user_name,
	height : 'auto'
});
Ti.UI.currentWindow.add(textFieldName);

var textFieldText = Ti.UI.createLabel({
	left : Titanium.Platform.displayCaps.platformWidth * 0.04,
	right : Titanium.Platform.displayCaps.platformWidth * 0.04,
	top : Titanium.Platform.displayCaps.platformHeight * 0.12,
	color : 'white',
	font : {
		fontSize : Titanium.Platform.displayCaps.platformHeight * 0.04
	},
	height : 'auto',
	text : Ti.UI.currentWindow.tweet
});
Ti.UI.currentWindow.add(textFieldText);
var textDateText = Ti.UI.createLabel({
	left : Titanium.Platform.displayCaps.platformWidth * 0.04,
	right : Titanium.Platform.displayCaps.platformWidth * 0.04,
	top : Titanium.Platform.displayCaps.platformHeight * 0.35,
	color : 'black',
	font : {
		fontSize : Titanium.Platform.displayCaps.platformHeight * 0.03
	},
	height : 'auto',
	text : Ti.UI.currentWindow.date
});
Ti.UI.currentWindow.add(textDateText);

var buttonBack = Ti.UI.createButton({
	title : "Terug",
	left : Titanium.Platform.displayCaps.platformWidth * 0.04,
	right : Titanium.Platform.displayCaps.platformWidth * 0.04,
	height : 'auto'
});
Ti.UI.currentWindow.add(buttonBack);

buttonBack.addEventListener("click", function() {
	Ti.UI.currentWindow.close();
})
