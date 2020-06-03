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
  addNavEventListeners();
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
// add menu toggle to bars icon in nav bar
document.querySelector(".fa-bars").addEventListener("click", () => {
  document.querySelector("nav > ul").classList.toggle("hidden--mobile");
});
