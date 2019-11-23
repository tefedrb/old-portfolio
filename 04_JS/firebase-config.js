// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFAA05omIaYANIQrtTbSKttPdSe6IEwww",
    authDomain: "sending-email-f1fa6.firebaseapp.com",
    databaseURL: "https://sending-email-f1fa6.firebaseio.com",
    projectId: "sending-email-f1fa6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//  firebase.analytics();

// add firestore
const db = firebase.firestore();


const sendMessage = (e) => {
    e.preventDefault();
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");
    const clear = () => {
        name.parentNode.innerHTML = "MESSAGE SENT!";
    }
  db.collection("userMessages").add({
      name: name.value,
      email: email.value,
      message: message.value
  })
  .then((res) => {
    console.log(res)
    clear()
  })
  .catch((error) => {
    console.log(error)
  });
}
