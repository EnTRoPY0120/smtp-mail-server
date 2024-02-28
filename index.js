import { SMTPServer } from "smtp-server";

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect(session, cb) {
    console.log(`OnConnect`, session.id);
    cb(); // Accept the connection
  },
  onMailFrom(address, session, cb) {
    console.log(`OnMailFrom`, address.address, session.id);
    cb();
  },
  onRcptTo(address, session, cb) {
    console.log(`OnRcptTo`, address.address, session.id);
    cb();
  },
  onData(stream, session, cb) {
    stream.on("data", (data) => console.log(`onData ${data.toString()}`));
    stream.on("end", cb);
  },
});

// Standard port for unencrypted SMTP communication
// server.listen('25', () => {
//     console.log('Listening on Port 25')
// })

// Recommended port for secure SMTP communication
server.listen("587", () => {
  console.log("Listening on Port 587");
});
