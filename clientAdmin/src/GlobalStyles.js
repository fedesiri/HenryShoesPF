import { createGlobalStyle } from "styled-components";

// 252, 253, 248 blanco crema
// 235, 235, 235 blanco a gris
// 192, 192, 192 gris claro
// 213, 75, 67  rojo apagado
// 92, 98, 103 gris granito
// 0, 0, 0 negro


export const GlobalStyles = createGlobalStyle`

:root{
    --main-color: rgba(192, 192, 192, 100);
    --background-color: rgba(252, 253, 248, 100);
    --text-color: rgba(0,0,0,100);
    --primary : rgba(235, 235, 235, 100);
    --secondary : rgba(213, 75, 67, 100)
    --highligth : rgba(92,98,103,100);
    --white-text: rgba(255, 255, 255, 1)
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html, body{
    rgba(235, 235, 235, 100);
    font-family: 'Roboto', 'Oxygen','Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}
`