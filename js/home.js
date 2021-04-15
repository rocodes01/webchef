const auth = firebase.auth();
const db = firebase.firestore();
let userRef;
let currentUser;

// window.onload = function () {
//   console.log("Function run");
//   var user = firebase.auth().currentUser;
//   if (user) {
//     console.log(user);
//   } else {
//     // No user is signed in.
//     console.log("not signed");
//   }
// };

let data;
const setname = (userdata) => {
  const username = document.getElementsByClassName("username");
  const useremail = document.getElementsByClassName("useremail");
  if (username) {
    console.log(username);
    for (item of username) {
      item.innerText = userdata.name;
    }
  }
  if (useremail) {
    console.log(useremail);
    for (item of useremail) {
      item.innerText = userdata.email;
    }
  }
};
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    userRef = db.collection("users");
    currentUser = userRef
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        data = snapshot.docs.map((d) => {
          setname(d.data());
        });
      });

    // document.getElementById("username").innerText = currentUser.name;

    console.log(currentUser.name);
    console.log(user.email);
  } else {
    console.log("error");
    // No user is signed in.
  }
});

const logout = (e) => {
  e.preventDefault();
  firebase.auth().signOut();
  alert("You are now Signed out");
  window.location.href = "index.html";
};
