function parse(rawHex) {
    var hex = splitHexStr(rawHex),
        id, voltHex, tempHex, humHex, lightHex, tsrHex;

    for (var i = 0; i < hex.length; i++) {
        if (i === 3) {
            id = hex[i] + hex[i + 1];
        } else if (i === 8) {
            voltHex = hex[i] + hex[i + 1];
        } else if (i === 10) {
            tempHex = hex[i] + hex[i + 1];
        } else if (i === 12) {
            humHex = hex[i] + hex[i + 1];
        } else if (i === 14) {
            lightHex = hex[i] + hex[i + 1];
        } else if (i === 16) {
            tsrHex = hex[i] + hex[i + 1];
        }
    }

    var volt = calVolt(voltHex),
        temp = calTemp(tempHex),
        hum = calHum(humHex, temp),
        light = calLight(lightHex),
        tsr = calTSR(tsrHex);

    return {
        id,
        volt: Math.round(volt * 100) / 100,
        temp: Math.round(temp * 100) / 100,
        hum: Math.round(hum * 100) / 100,
        light: Math.round(light * 100) / 100,
        tsr: Math.round(tsr * 100) / 100,
    };
}

function splitHexStr(hexVal) {
    return hexVal.match(/[0-9A-F]{2}/ig);
}

function hexToDec(hex) {
    return hex.toLowerCase().split('').reduce((result, ch) =>
        result * 16 + '0123456789abcdefgh'.indexOf(ch), 0);
}

function calVolt(voltHex) {
    var decVolt = hexToDec(voltHex);
    return (3.0 * decVolt / 4095);
}

function calTemp(tempHex) {
    var decTemp = hexToDec(tempHex);
    return ((-39.6) + (0.01 * decTemp));
}

function calHum(humHex, temp) {
    var decHum = hexToDec(humHex);
    var RHlinear = -2.0468 + (0.0367 * decHum) + ((-1.5955 / 1000000) * decHum * decHum);
    return ((temp - 25) * (0.01 + (0.00008 * decHum))) + RHlinear;
}

function calLight(lightHex) {
    var decLight = hexToDec(lightHex);
    return (1.5 * decLight / 4096) * 6250;
}

function calTSR(tsrHex) {
    var decTSR = hexToDec(tsrHex);
    return (1.5 * decTSR / 4096) * 769;
}

module.exports = {
    parse
};