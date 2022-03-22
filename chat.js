let app = {};
app.peer = new Peer();
app.peer.on('open', function (peerID) {
    document.getElementById('myPeer').innerHTML = peerID;
});

function connect() {
    app.conn = app.peer.connect(document.getElementById('partnerPeer').value);
    app.conn.on('open', function () {
        document.getElementById('status').innerHTML = "connected";
    });
    app.conn.on('data', function (data) {
        app.chatList.push('2 ' + data);
        document.getElementById('messages').innerHTML = app.chatList.join("<br>");
    })
}

app.chatList = [];
function sendMassage() {
    let newmes = document.getElementById('inputmess').value;
    document.getElementById('inputmess').value = '';
    if (app.conn && app.conn.open) {
        app.conn.send(newmes);
    }

    app.chatList.push('1 ' + newmes);
    document.getElementById('messages').innerHTML = app.chatList.join("<br>");
}


app.peer.on('connection', function (c) {
    app.conn = c;
    app.conn.on('open', function () {
        document.getElementById('status').innerHTML = 'connected';

        app.conn.on('data', function (data) {
            app.chatList.push('2 ' + data);
            document.getElementById('messages').innerHTML = app.chatList.join("<br>");
        })
    });
})




