class FakelocationCoordinates {
    constructor(latitude, longitude, accuracy = 2) {
        this._priv = {
            latitude: latitude,
            longitude: longitude,
            altitude: 400,
            accuracy: accuracy,
            altitudeAccuracy: 1,
            heading: null,
            speed: null
        };
    }

    get latitude() {
        return this._priv.latitude;
    }

    get longitude() {
        return this._priv.longitude;
    }

    get altitude() {
        return this._priv.altitude;
    }

    get accuracy() {
        return this._priv.accuracy;
    }

    get altitudeAccuracy() {
        return this._priv.altitudeAccuracy;
    }

    get heading() {
        return this._priv.heading;
    }

    get speed() {
        return this._priv.speed;
    }
}

class FakelocationPosition {
    constructor(latitude, longitude, accuracy) {
        this._priv = {
            timestamp: Date.now(),
            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy,
        };
    }

    get coords() {
        return new FakelocationCoordinates(this._priv.latitude, this._priv.longitude, this._priv.accuracy);
    }

    get timestamp() {
        return this._priv.timestamp;
    }
}

class Fakelocation {
    constructor(latitude, longitude, accuracy = 2, delay = 1000) {
        this._priv = {
            delay: delay, // milliseconds
            latitude: latitude, // degrees
            longitude: longitude, // degrees
            accuracy: accuracy // meters
        };
    }

    getCurrentPosition(success, error, options = {}) {
        if (options.timeout != null && options.timeout != 0 && options.timeout < this._delay) {
            setTimeout(() => {
                throw new Error(this);
            }, options.timeout);
            return;
        }
        setTimeout(() => {
            let lat = this._priv.latitude + (2*Math.random() - 1)*this._priv.accuracy*180/(6371000*Math.PI);
            let lng = this._priv.longitude + (2*Math.random() - 1)*this._priv.accuracy*180/(6371000*Math.cos(this._priv.latitude*Math.PI/180)*Math.PI);
            success(new FakelocationPosition(lat, lng, this._priv.accuracy));
        }, this._priv.delay);
    }

    watchPosition(success, error, options = {}) {
        let id;
        if (options.timeout != null && options.timeout != 0 && options.timeout < this._delay) {
            id = setInterval(() => {
                throw new Error(this);
            }, options.timeout);
            return id;
        }
        id = setInterval(() => {
            let lat = this._priv.latitude + (2*Math.random() - 1)*this._priv.accuracy*180/(6371000*Math.PI);
            let lng = this._priv.longitude + (2*Math.random() - 1)*this._priv.accuracy*180/(6371000*Math.cos(this._priv.latitude*Math.PI/180)*Math.PI);
            success(new FakelocationPosition(lat, lng, this._priv.accuracy));
        }, this._priv.delay);
        return id;
    }

    clearWatch(id) {
        clearInterval(id);
    }

    // Fakelocation own methods

    get delay() {
        return this._priv.delay;
    }

    set delay(milliseconds) {
        this._priv.delay = milliseconds;
    }

    get latitude() {
        return this._priv.latitude;
    }

    set latitude(latitude) {
        this._priv.latitude = latitude;
    }

    get longitude() {
        return this._priv.longitude;
    }

    set longitude(longitude) {
        this._priv.longitude = longitude;
    }

    get accuracy() {
        return this._priv.accuracy;
    }

    set accuracy(accuracy) {
        this._priv.accuracy = accuracy;
    }
}

