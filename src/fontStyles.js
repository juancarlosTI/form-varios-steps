import { createGlobalStyle } from "styled-components";
import UbuntuRegular from "../src/assets/fonts/Ubuntu-Regular.ttf"
import UbuntuBold from "../src/assets/fonts/Ubuntu-Bold.ttf"
import Ubuntu from "../src/assets/fonts/Ubuntu-Medium.ttf"

const FontStyles = createGlobalStyle`
    @font-face {
        font-family:'Ubuntu Regular',
        src: url(${UbuntuRegular}) format('ttf');
    }
`

export default FontStyles;