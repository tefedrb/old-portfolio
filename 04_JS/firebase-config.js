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
    const email = document.querySelector("#email-input");
    const message = document.querySelector("#message");
    const clear = () => {
        name.parentNode.innerHTML = "MESSAGE SENT!";
    }
    const currentDate = new Date();
    const formatDate = `${currentDate.getMonth() + 1}/
        ${currentDate.getDate()}/
        ${currentDate.getFullYear()}` 
    const formatTime = `${currentDate.getHours()}:
        ${currentDate.getMinutes()}:${currentDate.getSeconds()}`

  db.collection("userMessages").add({
      name: name.value,
      email: email.value,
      message: message.value,
      date: formatDate,
      time: formatTime
  })
  .then((res) => {
    console.log(res)
    clear()
  })
  .catch((error) => {
    console.log(error)
  });
}
