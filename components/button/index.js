import styled from 'styled-components';
import { Button } from 'antd';

export const PrimaryButton = styled.a`
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 1rem;
  display: inline-block;
  line-height: 2.5rem;
  padding: 0rem 2rem;
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);

  /* overflow: hidden; */
  transition: all 0.3s;
  color: ${({ theme, outline }) => (outline ? theme.colors.primary : theme.colors.white)};
  border-radius: 10px;
  background: ${({ theme, outline }) =>
    outline ? theme.colors.white : 'linear-gradient(90deg, rgba(213,36,224,1) 0%, rgba(31,0,252,1) 100%)'};
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: initial;
    background-color: inherit;
    transition: inherit;
    transform: scaleX(0);
    transform-origin: 50%;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    &::before {
      border-radius: 10px;
      background-color: ${({ theme, outline }) =>
        !outline ? 'rgba(21, 21, 25, 0.15)' : theme.colors.primary};
      transform: scaleX(1);
    }
  }
  @media only screen and (max-width: 767px) {
    font-size: 18px;
    line-height: 26px;
    letter-spacing: 0.05em;
    min-width: 200px;
    padding: 0.4rem 0.8rem;
    &:hover {
      &::before {
        display: none !important;
      }
    }
  }
  /* overflow: hidden; */
`;

export const SecondaryButton = styled(PrimaryButton)`
  color: ${({ theme, outline }) => (outline ? theme.colors.black : theme.colors.primary)};
  border: ${({ theme, outline }) => `2px solid ${outline ? 'transparent' : theme.colors.primary}`};
  background-color: ${({ theme, outline }) => (outline ? theme.colors.black : 'transparent')};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PrimaryButtonReal = styled(Button)`
  text-align: center;
  /* Primary */
  box-sizing: border-box;
  cursor: pointer;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1.5rem')};
  line-height: 49px;
  display: inline-block;
  height: auto;
  width: 100%;
  max-width: ${(props) => (props.maxwidth ? props.maxwidth : 'auto')};
  padding: ${(props) => (props.padding ? props.padding : '0.2rem 2.5rem')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '300')};
  /* Primary */
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  /* overflow: hidden; */
  transition: all 0.3s ease-out;
  color: ${({ theme, outline }) =>
    outline ? theme.colors.primary : theme.colors.white} !important;
  border: ${({ theme, outline, boderColor }) =>
    `2px solid ${
      boderColor ? boderColor : outline ? theme.colors.primary : 'transparent'
    }`} !important;
  border-radius: 10px;
  background-color: ${({ theme, outline, bgcolor }) =>
    bgcolor ? bgcolor : outline ? theme.colors.white : theme.colors.primary} !important;
  .ant-btn-loading-icon .anticon {
    top: ${(props) => (props.positionicon ? props.positionicon : '-6px')};
    position: relative;
  }
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: initial;
    background-color: inherit;
    transition: inherit;
    transform: scaleX(0);
    transform-origin: 50%;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white} !important;
    border: ${({ theme, outline, boderhover }) =>
      `2px solid ${boderhover ? boderhover : !outline ? theme.colors.primary : 'transparent'}`};
    &::after {
      border-radius: 10px;
      background-color: ${({ theme, outline, bghover }) =>
        bghover ? bghover : !outline ? 'rgba(21, 21, 25, 0.15)' : theme.colors.primary};
      transform: scaleX(1);
    }
  }
  @media only screen and (max-width: 767px) {
    font-size: 18px;
    line-height: 26px;
    letter-spacing: 0.05em;
    min-width: 200px;
    padding: 0.4rem 0.8rem;
    max-width: 100%;

    &:hover {
      &::after {
        display: none !important;
      }
    }
  }
  /* overflow: hidden; */
`;

export const PinkButton = styled(PrimaryButton)`
  color: ${({ theme, outline }) => (outline ? theme.colors['pink-100'] : theme.colors.white)};
  border: ${({ theme, outline }) =>
    `2px solid ${outline ? theme.colors['pink-100'] : 'transparent'}`};
  border-radius: 10px;
  background-color: ${({ theme, outline }) =>
    outline ? theme.colors.white : theme.colors['pink-100']};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    border: ${({ theme, outline }) =>
      `2px solid ${!outline ? theme.colors['pink-100'] : 'transparent'}`};
    &::before {
      border-radius: 10px;
      background-color: ${({ theme, outline }) =>
        !outline ? 'rgba(21, 21, 25, 0.15)' : theme.colors['pink-100']};
      transform: scaleX(1);
    }
  }
`;
