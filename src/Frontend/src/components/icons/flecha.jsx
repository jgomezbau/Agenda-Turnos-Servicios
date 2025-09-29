import * as React from "react";
import fondos from "../../side-nav-bar-color"
let colores = fondos.fondos();
let tema;

if (localStorage.getItem('dx-theme')) {
  tema = localStorage.getItem('dx-theme').replace(/\./g, '');
}
const SvgComponentFlecha = (props) => (
  <svg
    data-name="Livello 1"
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
    fill={`${colores[tema]}`}
    {...props}
  >
    <title />
    <path d="M64 0a64 64 0 1 0 64 64A64.07 64.07 0 0 0 64 0Zm0 122a58 58 0 1 1 58-58 58.07 58.07 0 0 1-58 58Z" />
    <path d="M58.12 35.88a3 3 0 0 0-4.24 4.24L77.76 64 53.88 87.88a3 3 0 1 0 4.24 4.24l26-26a3 3 0 0 0 0-4.24Z" />
  </svg>
)

export default SvgComponentFlecha