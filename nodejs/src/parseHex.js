
function splitHexStr(hexVal) {
    hex = hexVal.toUpperCase().match(/[0-9A-F]{2}/g);
    return hex;
}

splitHexStr("00 FF FF 00 42 0A 00 01 0F CD 1D 3E 02 22 00 FA 01 18")

function hexToDec(hex) {
    return hex.toLowerCase().split('').reduce((result, ch) =>
        result * 16 + '0123456789abcdefgh'.indexOf(ch), 0);
}


for (i = 0; i < hex.length; i++) {
    if (i == 8) {
        voltHex = hex[i] + hex[i + 1];
    }
    if (i == 10) {
        tempHex = hex[i] + hex[i + 1];
    }
    if (i == 12) {
        humHex = hex[i] + hex[i + 1];
    }
    if (i == 14) {
        lightHex = hex[i] + hex[i + 1];
    }
    if (i == 16) {
        tsrHex = hex[i] + hex[i + 1];
    }
}

function calVolt(voltHex) {
    decVolt = hexToDec(voltHex);
    return (3.0 * decVolt / 4095);
}

function calTemp(tempHex) {
    decTemp = hexToDec(tempHex);
    calTemp = ((-39.6) + (0.01 * decTemp))
    return calTemp;
}

function calHum(humHex, temp) {
    decHum = hexToDec(humHex);
    RHlinear = -2.0468 + (0.0367 * decHum) + ((-1.5955 / 1000000) * decHum * decHum);
    RHtrue = ((temp - 25) * (0.01 + (0.00008 * decHum))) + RHlinear;
    return RHtrue;
}

function calLight(lightHex) {
    decLight = hexToDec(lightHex);
    return (1.5 * decLight / 4096) * 6250;
}

function calTSR(tsrHex) {
    decTSR = hexToDec(tsrHex);
    return (1.5 * decTSR / 4096) * 769;
}



console.log(calVolt(voltHex));
console.log(calTemp(tempHex));
console.log(calHum(humHex, calTemp));
console.log(calLight(lightHex));
console.log(calTSR(tsrHex));
