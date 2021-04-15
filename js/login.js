const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const db = firebase.firestore();
let userRef = db.collection("users");
let currentUser;
const login = (e) => {
  e.preventDefault();
  const email = document.getElementById("InputEmail").value;
  const password = document.getElementById("InputPassword").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      currentUser = userRef
        .where("email", "==", userCredential.user.email)
        .get()
        .then((snapshot) => {
          if (snapshot?.docs[0]?.data().role == 1) {
            window.location.href = `home.html`;
          } else if (snapshot?.docs[0]?.data().role == 0) {
            window.location.href = `user_home.html`;
          }
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("InputEmail").innerText = "";
      document.getElementById("InputPassword").innerText = "";
      alert(`Wrong Credential, Please try Again`);
    });
};
const loginWithGoogle = () => {
  console.log(provider);
  auth.signInWithPopup(provider);
};
console.log("FIreBase ", firebase);

auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // userRef = db.collection("users");
    // currentUser = userRef
    //   .where("email", "==", user.email)
    //   .get()
    //   .then((snapshot) => {
    //     if (snapshot?.docs[0]?.data().role == "1") {
    //       window.location.href = `home.html`;
    //     } else if (snapshot?.docs[0]?.data().role == "0") {
    //       window.location.href = `home.html`;
    //     }
    //     console.log(snapshot.docs[0].data());
    //   });
    // window.location.href = `home.html`;
  } else {
    console.log("error");
    // No user is signed in.
  }
});
