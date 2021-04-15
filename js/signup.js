const db = firebase.firestore();
const signup = (event) => {
  event.preventDefault();
  const email = document.getElementById("InputEmail").value;
  const password = document.getElementById("InputPassword").value;
  const usertype = document.getElementById("usertype").value;
  const first = document.getElementById("FirstName").value;
  const last = document.getElementById("LastName").value;
  console.log(email, password, usertype);
  const userdata = {
    name: `${first} ${last}`,
    email: email,
    role: Number(usertype),
  };
  console.log(userdata);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      db.collection("users")
        .doc(user.uid)
        .set(userdata)
        .then((res) => {
          console.log(" res", res);

          window.location.href = "index.html";
        });
      console.log(user.uid);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      console.log(errorCode, ":", errorMessage);
    });
};
