# fakelocation
Emulation of navigator.geolocation for development purposes.

## Installation
To start using fakelocation, just import the file ```fakelocation.js``` in your html file as usual:

```html
<script src="fakelocation.js"></script>
```

## Syntax

```javascript
var fakelocationInstance = new Fakelocation(latitude, longitude [, accuracy [, delay]]);
```

## Usage

Start creating an instance of the ```Fakelocation``` class, passing in as parametes the ```latitude``` and the ```longitude``` (optionally the ```accuracy``` in meters and the ```delay``` in milliseconds) you would like to set your fake position to:

```javascript
// var geo = navigator.geolocation;                 // use this for production
var geo = new Fakelocation(-17.783313, -63.182129); // use this for development
```
and replace every occurence of ```navigator.geolocation``` with your ```geo``` object.

You can then start calling ```geo.getCurrentPosition(...)``` or ```geo.watchPosition(...)``` as in the following example:

```javascript
let options = {
  enableHighAccuracy: true,
  timeout: 5000
};

let watchId = geo.watchPosition(onSuccessCallback, onErrorCallback, options);
```

Fakeposition will emulate the watchPosition behaviour and will introduce small changes (not greater then the ```accuracy``` parameter) in the position passed to the ```onSuccessCallback``` with respect to the coordinates you defined in the constructor, simulating GPS accuracy after a delay of 1000 milliseconds, by default.

Once you're done watching the position, you can stop it as you'd do with ```Geolocation``` interface:

```javascript
geo.clearWatch(watchId); // stop watching the position
```

you can change the position you defined in the constructor at any time, in order to simulate an intentional change of location.

```javascript
geo.latitude = newLatitude;
geo.longitude = newLongitude;
```

Similarly, you can also change the ```delay``` and the ```accuracy``` porperties:

```javascript
geo.delay = 500;  // 500 mulliseconds, simulate faster GPS response
geo.accuracy = 3; // set the new accuracy to a radius of 3 meters
```

The changes in the Fakelocation properties will be applied immediately.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GPLv3](https://www.gnu.org/licenses/gpl-3.0.html)
