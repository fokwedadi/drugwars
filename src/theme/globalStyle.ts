import { createGlobalStyle } from "styled-components";

import ShareTechMonoWoff from "./fonts/Share-Tech-Mono/Share-Tech-Mono.woff";
import ShareTechMonoWoff2 from "./fonts/Share-Tech-Mono/Share-Tech-Mono.woff2";
import ShareTechMonoTTF from "./fonts/Share-Tech-Mono/Share-Tech-Mono.ttf";

const GlobalStyle = createGlobalStyle` 
  @font-face {
    font-family: "Share Tech Mono";
    src:
      url(${ShareTechMonoWoff}) format("woff"),
      url(${ShareTechMonoWoff2}) format("woff2"),
      url(${ShareTechMonoTTF}) format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  
  body {
    background-color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSize.regular};
    color: ${({ theme }) => theme.colors.primary};
  }`;

export default GlobalStyle;
