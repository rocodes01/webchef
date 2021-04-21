const contest_name = localStorage.getItem("contest_name");
const auth = firebase.auth();
const db = firebase.firestore();

let contestsRef = firebase.firestore().collection("contests");

// function updatecollection() {
//   const htmlcode = document.getElementById("html").value;
//   const csscode = document.getElementById("css").value;

//     // contest = contestsRef
//   //   .doc("new")
//   //   .set({ sub: finalCode })
//   //   .then((res) => {
//   //     console.log(res);
//   //   });
// }
// function saveCodeToDB() {
//   // contest = contestsRef
//   //   .where("name", "==", contest_name)
//   //   .get()
//   //   .then((snapshot) => {
//   //     updatecollection(snapshot.docs[0].data());
//   //   });
//   updatecollection();
// }
