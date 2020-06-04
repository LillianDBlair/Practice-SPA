import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

// function render() {} could also be used
const render = (st = state.Home) => {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;

  addNavToggle();
  addNavEventListeners();
  addPicOnFromSubmit();
};

render();

function addNavEventListeners() {
  document.querySelectorAll("nav a").forEach(navLink => {
    navLink.addEventListener("click", event => {
      event.preventDefault();
      // render(state[event.target.textContent]); is the same as below
      let selectedPage = event.target.textContent;
      let pieceOfState = state[selectedPage];
      render(pieceOfState);
    });
  });
}

function addNavToggle() {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}
function addPicOnFromSubmit() {
  document.querySelector("form").addEventListener("submit", event => {
    let inputs = event.target.elements;
    event.preventDefault();
    let newPic = {
      url: inputs[0].value,
      title: inputs[1].value
    };
    state.Gallery.pictures.push(newPic);
  });
}
