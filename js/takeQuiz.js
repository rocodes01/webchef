(function () {
  quizRef = firebase.firestore().collection("quiz");
  quizRef.get().then((snapshot) => {
    snapshot.docs.slice(0, 10).map((d, i) => {
      createCard(d.data(), i);
    });
  });
})();
let correctAnswersCount = 0;
const divToInsert = document.getElementById("card_container");
let correctOptionsArr = [];
const savetoLocal = (value) => {
  localStorage.setItem("contest_name", value);
  console.log(value);
  window.location.href = "contest_details.html";
};

// It's just a hack solution to check correct answer
// If any question has option which is correct answer in another question
// then it will give false answer::correct it later
const checkAnswer = (event) => {
  const { placeholder, id } = event.target;
  console.log(placeholder, "Id", id);
  correctOptionsArr[id] == placeholder ? correctAnswersCount++ : "";
  console.log(correctAnswersCount);
};
const showResult = () => {
  alert(
    `You Got ${correctAnswersCount} out of ${correctOptionsArr.length} Marks`
  );
};

const createCard = (data, index) => {
  console.log(data);
  correctOptionsArr.push(data.correct.replace(/\s/g, ""));
  let optArr = [data.correct, data.option_1, data.option_2, data.option_3];
  // JUmble Options
  optArr.sort(() => 0.5 - Math.random());
  // console.log(optArr);
  //   console.log(data);
  const createOptions = optArr.map((e, i) => {
    console.log(e);
    return `
      <div class="form-check" >
          <input
            class="form-check-input"
            type="radio"
            name="optionsFor_${index}"
            value=${e}
            placeholder=${e.replace(/\s/g, "")}
            id=${index}
            onclick="checkAnswer(event)"
          /><label
            class="form-check-label"
            for="option_${i}"
          >
            ${e}
          </label>
        </div>
      `;
  });
  const cardData = `
    <div class="row mt-2 ml-3">
    <div class="card col-lg-12">
      <div class="card-header">${data.question}</div>
      <div class="card-body">
       ${createOptions.join("")}
      </div>
    </div>
    
  </div>`;
  divToInsert.innerHTML += cardData;
  // console.log(correctOptionsArr);
};
