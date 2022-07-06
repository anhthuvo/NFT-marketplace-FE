import styled, { css } from 'styled-components';

export const Window = styled.div`
width: 100vw;
height: 100vh;
overflow: hidden;
`

export const SlideWrapper = styled.div`
transform: translateY(${({index, slideTotal}) => -index*100/slideTotal}%);
transition: ${({duration}) => duration}ms all;
background-color: ${({theme}) => theme.colors.primary};
`
 
export const Slide = styled.div`
width: 100%; 
height: 100%;
width: 100vw;
height: 100vh; 
overflow: hidden;
`