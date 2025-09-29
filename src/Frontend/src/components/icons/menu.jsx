import * as React from "react"
import fondos from "../../side-nav-bar-color"
let colores = fondos.fondos();
let tema;
if (localStorage.getItem('dx-theme')) {
  tema = localStorage.getItem('dx-theme').replace(/\./g, '');
}
const SvgComponentMenu = (props) => (
  <svg
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    fill={`${colores[tema]}`}
    {...props}
  >
    <path d="M26 16a2 2 0 0 1-2 2H8a2 2 0 0 1 0-4h16a2 2 0 0 1 2 2zM26 8a2 2 0 0 1-2 2H8a2 2 0 0 1 0-4h16a2 2 0 0 1 2 2zM26 24a2 2 0 0 1-2 2H8a2 2 0 0 1 0-4h16a2 2 0 0 1 2 2z" />
  </svg>
)

export default SvgComponentMenu
