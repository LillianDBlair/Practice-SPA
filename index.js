import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import auth from "./firebase";

auth.createUserWithEmailAndPassword(email, password);
auth.signInWithEmailAndPassword(email, password);
auth.signOut(callback);
auth.onAuthStateChanged(user => {
  console.log(user);
});

import db from "./firebase";
const coll = db.collection(/* collection name */);
coll.add({
  /* document Object */
});
coll
  .get()
  .then(collectionSnapshot =>
    collectionSnapshot.docs.forEach(doc => console.log(doc.data()))
  );

coll
  .doc(/* document ID */)
  .get()
  .then(documentSnapshot => console.log(documentSnapshot.data));

  coll.doc( /* document ID */ ).update({ /* key */ : /* value */ });

  coll.doc( /* document ID */ ).delete();

const router = new Navigo(window.location.origin);

router.on({
  ":page": params => render(state[capitalize(params.page)]),
  "/": () => render(state.Home)
}).resolve;

console.log("requesting data form API");
axios
  .get("https://jsonplaceholder.typicode.com/posts", {
    headers: {
      "Access-Control-Allow-Origin": window.location.origin
    }
  })
  .then(response => {
    console.log("API response received");
    return response;
  })
  .then(response => {
    console.log("response.dat", response.data);
    response.data.forEach(post => {
      state.Blog.posts.push(post);
    });
  });

// function render() {} could also be used
const render = (st = state.Home) => {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;

  router.updatePageLinks();

  addNavToggle();
  addNavEventListeners();
  addPicOnFromSubmit(st);
};

render(state.Home);

function addNavEventListeners() {
  document.querySelectorAll("nav a").forEach(navLink => {
    navLink.addEventListener("click", event => {
      event.preventDefault();
      // render(state[event.target.textContent]); is the same as below
      let selectedPage = event.target.textContent;
      let pieceOfState = state[selectedPage];
    });
  });
}

function addNavToggle() {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}
function addPicOnFromSubmit(st) {
  if (st.view === "Form") {
    document.querySelector("form").addEventListener("submit", event => {
      let inputs = event.target.elements;
      event.preventDefault();
      let newPic = {
        url: inputs[0].value,
        title: inputs[1].value
      };
      state.Gallery.pictures.push(newPic);
      render(state.Gallery);
    });
  }
}
