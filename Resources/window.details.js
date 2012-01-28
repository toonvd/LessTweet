var win = Titanium.UI.currentWindow;
win.backgroundImage = 'images/background-blue.png';
win.barColor = '#000';
var image = Ti.UI.createImageView({
					image:Ti.UI.currentWindow.image,
					width:Titanium.Platform.displayCaps.platformWidth * 0.05,
					height:Titanium.Platform.displayCaps.platformWidth * 0.05,
					top:5
				});
Ti.UI.currentWindow.add(image);
var textFieldName = Ti.UI.createLabel({
	left : Titanium.Platform.displayCaps.platformWidth * 0.05,
	top : 10,
	color : '#09969b',
	font : {
		fontSize : Titanium.Platform.displayCaps.platformWidth * 0.07
	},
	text : Ti.UI.currentWindow.user_name,
	height : 'auto'
});
Ti.UI.currentWindow.add(textFieldName);

var textFieldText = Ti.UI.createLabel({
	left : Titanium.Platform.displayCaps.platformWidth * 0.04,
	right : Titanium.Platform.displayCaps.platformWidth * 0.04,
	top : Titanium.Platform.displayCaps.platformWidth * 0.12,
	color : 'white',
	font : {
		fontSize : Titanium.Platform.displayCaps.platformWidth * 0.06
	},
	height : 'auto',
	text : Ti.UI.currentWindow.tweet
});
Ti.UI.currentWindow.add(textFieldText);

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