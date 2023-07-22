var snmp = require ("net-snmp");

// Default options
var options = {
    port: 161,
    retries: 1,
    timeout: 5000,
    backoff: 1.0,
    transport: "udp4",
    trapPort: 162,
    version: snmp.Version1,
    backwardsGetNexts: true,
    reportOidMismatchErrors: false,
    idBitsSize: 32
};



var session = snmp.createSession ("192.168.100.51", "public",options);

//var oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0"];
var oids = [
    "1.3.6.1.2.1.1.4.0",
    "1.3.6.1.2.1.1.5.0",
    "1.3.6.1.2.1.2.2.1.2",
    "1.3.6.1.2.1.2.2.1.3"
];

var nonRepeaters = 2;
session.get (oids, nonRepeaters,function (error, varbinds) {
    if (error) {
        console.error (error);
    } else {
        for (var i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError (varbinds[i])) {
                console.error (snmp.varbindError (varbinds[i]));
            } else {
                console.log (varbinds[i].oid + " = " + varbinds[i].value);
            }
        }
    }
    session.close ();
});

session.trap (snmp.TrapType.LinkDown, function (error) {
    if (error) {
        console.error (error);
    }
});
