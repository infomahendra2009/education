var snmp = require ("net-snmp");
// Default options
var options = {
    port: 161,
    retries: 1,
    timeout: 50000,
    backoff: 1.0,
    transport: "udp4",
    trapPort: 162,
    version: snmp.Version1,
    backwardsGetNexts: true,
    reportOidMismatchErrors: false,
    idBitsSize: 32
};



var session = snmp.createSession ("192.168.100.51", "public",options);

 var oids = [
    "1.3.6.1.2.1.1.4.0",
    "1.3.6.1.2.1.1.5.0",
    "1.3.6.1.2.1.2.2.1.2",
    "1.3.6.1.2.1.2.2.1.3"
];

var nonRepeaters = 2;

session.getBulk (oids, nonRepeaters, function (error, varbinds) {
    if (error) {
        console.error (error.toString ());
    } else {
        console.log(varbinds)
        // step through the non-repeaters which are single varbinds
        for (var i = 0; i < nonRepeaters; i++) {
            if (i >= varbinds.length)
                break;

            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]));
            else
                console.log (varbinds[i].oid + "|" + varbinds[i].value);
        }

        // then step through the repeaters which are varbind arrays
        for (var i = nonRepeaters; i < varbinds.length; i++) {
            for (var j = 0; j < varbinds[i].length; j++) {
                if (snmp.isVarbindError (varbinds[i][j]))
                    console.error (snmp.varbindError (varbinds[i][j]));
                else
                    console.log (varbinds[i][j].oid + "|"
                            + varbinds[i][j].value);
            }
        }
    }
});