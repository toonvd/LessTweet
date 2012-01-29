var win = Titanium.UI.currentWindow;
win.backgroundImage = 'images/background-blue.png';
var TheTable = Titanium.UI.createTableView({
	top : Titanium.Platform.displayCaps.platformWidth * 0.50
});
Ti.App.leftl
var logo = Ti.UI.createImageView({
	image : 'images/LesstweetLogo.png',
	top : Titanium.Platform.displayCaps.platformWidth * 0.12,
	width : Titanium.Platform.displayCaps.platformWidth
})
win.add(logo);

//createtable
function createtable() {

	var data = [];

	var row = Titanium.UI.createTableViewRow({});
	var row1 = Titanium.UI.createTableViewRow({});
	var left = Ti.UI.createImageView({

		image : 'images/Knop2.png',
		width : Ti.App.leftl,
		top : 5,
		bottom : 5,
		left : 5,
	});

	var left1 = Ti.UI.createImageView({

		image : 'images/Knop3.png',
		width : Ti.App.leftl,
		top : 5,
		bottom : 5,
		left : 5,
	});

	var right = Titanium.UI.createImageView({
		image : 'images/Knop1.png',
		width : Ti.App.leftl,
		right : 5,
		bottom : 5,
		top : 5
	});
	var right1 = Titanium.UI.createImageView({
		image : 'images/Knop4.png',
		width : Ti.App.leftl,
		right : 5,
		bottom : 5,
		top : 5
	});

	row.add(left);
	row.add(right);
	row1.add(left1);
	row1.add(right1);
	data.push(row);
	data.push(row1);
	TheTable.setData(data);
	win.add(TheTable);

	//listeners
	left.addEventListener('click', function() {
		var newwin1 = Titanium.UI.createWindow({
			url : 'window.sUsers.js',
			navBarHidden : false,
			modal : true,
			fullscreen : true,
			exitOnClose : true,
		});
		newwin1.open();
	});

	left1.addEventListener('click', function() {
		var newwin2 = Titanium.UI.createWindow({
			url : 'window.login.js',
			navBarHidden : false,
			modal : true,
			fullscreen : true,
			exitOnClose : true,
		});
		newwin2.open();
	});

	right.addEventListener('click', function() {
		var newwin3 = Titanium.UI.createWindow({
			url : 'window.search.js',
			navBarHidden : false,
			modal : true,
			color : '#fff',
			fullscreen : true,
			exitOnClose : true,
		});
		newwin3.open();
	});

	right1.addEventListener('click', function() {
		var newwin4 = Titanium.UI.createWindow({
			url : 'window.places.js',
			navBarHidden : false,
			modal : true,
			fullscreen : true,
			exitOnClose : true,
		});
		newwin4.open();
	});
}

win.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT, Titanium.UI.FACE_UP, Titanium.UI.FACE_DOWN];

function getOrientation(o) {
	switch (o) {
		case Titanium.UI.PORTRAIT:
			return 'portrait';
		case Titanium.UI.UPSIDE_PORTRAIT:
			return 'reverse portrait';
		case Titanium.UI.LANDSCAPE_LEFT:
			return 'landscape';
		case Titanium.UI.LANDSCAPE_RIGHT:
			return 'reverse landscape';
		case Titanium.UI.FACE_UP:
			return 'face up';
		case Titanium.UI.FACE_DOWN:
			return 'face down';
		case Titanium.UI.UNKNOWN:
			return 'unknown';
	}
}

if(Titanium.Gesture.orientation == "portrait") {
	Ti.App.leftl = Titanium.Platform.displayCaps.platformWidth * 0.45;
	if(TheTable.data.length > 0) {
		for(var i = TheTable.data[0].rows.length - 1; i >= 0; i--) {
			TheTable.deleteRow(i);
		}
	}

	createtable();
} else {
	Ti.App.leftl = Titanium.Platform.displayCaps.platformWidth * 0.45;
	if(TheTable.data.length > 0) {
		for(var i = TheTable.data[0].rows.length - 1; i >= 0; i--) {
			TheTable.deleteRow(i);
		}
	}
	createtable();
}

Ti.Gesture.addEventListener('orientationchange', function(e) {
	var orientation = getOrientation(e.orientation);

	if(orientation == "portrait") {
		Ti.App.leftl = Titanium.Platform.displayCaps.platformWidth * 0.45;
		if(TheTable.data.length > 0) {
			for(var i = TheTable.data[0].rows.length - 1; i >= 0; i--) {
				TheTable.deleteRow(i);
			}
		}
		createtable();
	} else {
		Ti.App.leftl = Titanium.Platform.displayCaps.platformWidth * 0.45;
		if(TheTable.data.length > 0) {
			for(var i = TheTable.data[0].rows.length - 1; i >= 0; i--) {
				TheTable.deleteRow(i);
			}
		}
		createtable();
	}
});
