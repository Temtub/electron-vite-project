const xmpp = require("simple-xmpp");

console.log("Probando");

xmpp.connect({
    jid: "rodrigo@ip-172-31-18-153.eu-north-1.compute.internal",
    password: "rodrigo",
    host: "13.60.59.64",
    port: 5222 // Puerto predeterminado para XMPP
});

xmpp.on("error", err => {
    console.error(err);
});

xmpp.on("online", data => {
    console.log("Estás online");
    console.log("Estás conectado con " + data.jid.user);
});

xmpp.on("chat", (from, message) => {
    console.log(`Mensaje de ${from}, es ${message}`);
});

xmpp.on("close", () => {
    console.log("Conexión cerrada");
});

send()

function send() {
    xmpp.send("juanjo@ip-172-31-18-153.eu-north-1.compute.internal", `Maricon`);
}
