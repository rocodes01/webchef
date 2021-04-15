(function () {
  contestsRef = firebase.firestore().collection("contests");
  contest = contestsRef.get().then((snapshot) => {
    data = snapshot.docs.map((d) => {
      createCard(d.data());
    });
  });
})();
const divToInsert = document.getElementById("card_container");
const createCard = (data) => {
  //   console.log(data);
  const cardData = `<div class="col-xl-3 col-md-6 mb-4" style="cursor: pointer">
          <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                            <div
                            class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                            >
                            ${data.name}
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>`;
  divToInsert.innerHTML += cardData;
};
