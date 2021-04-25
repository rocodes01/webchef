// Create a reference under which you want to list
var storage = firebase.storage();
var storageRef = storage.ref();

var listRef = storageRef.child("practice_images");

(function () {
  listRef
    .listAll()
    .then((res) => {
      console.log(res);
      //   res.prefixes.map((folderRef) => {
      //     // All the prefixes under listRef.
      //     // You may call listAll() recursively on them.
      //     console.log(folderRef);
      //   });
      res.items.map((itemRef) => {
        // All the items under listRef.
        itemRef.getDownloadURL().then((res) => {
          CreateCard(res);
        });
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log("Cannot Find Images", error);
    });
})();

let gotoPractice = (event) => {
  event.preventDefault();
  const { id } = event.target;
  localStorage.setItem("practice", id.toString());
  window.location.href = "coding_page.html";
};
let cardContainer = document.getElementById("card_container");
const CreateCard = (data) => {
  let card = `
        <div class="col-lg-5 p-4 m-2" style="">
            <img src=${data} alt="ContestImages" style="box-shadow: 10px 10px 5px 2px rgba(0,0,0,0.75);" class="img img-responsive" width="400px" height="280px"/>
            <button class="btn btn-primary mt-3" id=${data} onclick="gotoPractice(event)">Practice This contest</button>
        </div>`;
  cardContainer.innerHTML += card;
};
