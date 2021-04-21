var storage = firebase.storage();
var storageRef = storage.ref();
let quizData = [];
function addQuiz(event) {
  event.preventDefault();
  console.log("addQUiz");
  const question = document.getElementById("question").value;
  const correct = document.getElementById("correct").value;
  const option_1 = document.getElementById("opt1").value;
  const option_2 = document.getElementById("opt2").value;
  const option_3 = document.getElementById("opt3").value;
  const quiz = {
    question,
    correct,
    option_1,
    option_2,
    option_3,
  };
  quizData.push(quiz);
  createQues(quizData);
}
const createQues = (arr) => {
  console.log(arr);
  const quizArr = arr.map((x) => {
    return `
     <div class="card p-2 m-2">
                    <p>
                     ${x.question}
                    </p>
                    <div class="row">
                      <div class="col-md-3">${x.correct}</div>
                      <div class="col-md-3">${x.option_1}</div>
                      <div class="col-md-3">${x.option_2}</div>
                      <div class="col-md-3">${x.option_3}</div>
                    </div>
                  </div>
     `;
  });
  document.getElementById("quizHolder").innerHTML = quizArr;
};

const saveQuizToDB = (e) => {
  e.preventDefault();
  console.log(contestdata);
  db.collection("quiz")
    .add(quizData)
    .then((res) => {
      console.log(" res", res);
      alert("quiz Added Successfully");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, ":", errorMessage);
    });
};
