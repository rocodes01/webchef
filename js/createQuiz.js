// var storage = firebase.storage();
const db = firebase.firestore();
// var storageRef = storage.ref();
let quizData = [];
function addQuiz(event) {
  event.preventDefault();
  console.log("addQUiz");
  let question = document.getElementById("question").value;
  let correct = document.getElementById("correct").value;
  let option_1 = document.getElementById("opt1").value;
  let option_2 = document.getElementById("opt2").value;
  let option_3 = document.getElementById("opt3").value;
  let quiz = {
    question,
    correct,
    option_1,
    option_2,
    option_3,
  };
  quizData.push(quiz);
  document.getElementById("question").value = "";
  document.getElementById("correct").value = "";
  document.getElementById("opt1").value = "";
  document.getElementById("opt2").value = "";
  document.getElementById("opt3").value = "";
  createQues(quizData);
}
const createQues = (arr) => {
  document.getElementById("quizHolder").innerHTML = "";
  console.log(arr);
  const quizArr = arr.map((x) => {
    return `
     <div class="card p-2 m-2">
                    <p>
                     ${x.question}
                    </p>
                    <div class="row">
                      <div class="col-md-3"><p><strong>Option-1</strong></p> ${x.correct}</div>
                      <div class="col-md-3"><p><strong>Option-2</strong></p> ${x.option_1}</div>
                      <div class="col-md-3"><p><strong>Option-3</strong></p> ${x.option_2}</div>
                      <div class="col-md-3"><p><strong>Option-4</strong></p> ${x.option_3}</div>
                    </div>
                  </div>
     `;
  });
  quizArr.map((e) => {
    document.getElementById("quizHolder").innerHTML += e;
  });
};

const saveQuizToDB = (e) => {
  e.preventDefault();
  console.log(quizData);
  quizData.map((e) => {
    db.collection("quiz")
      .add(e)
      .then((res) => {
        console.log(" res", res);
        // co("quiz Added Successfully");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, ":", errorMessage);
      });
  });
  quizData = [];
};
