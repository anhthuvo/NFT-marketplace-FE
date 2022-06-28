import styled, { keyframes } from 'styled-components';
import { Form } from 'antd';
import { Spin as SpinAntd } from 'antd';

export const Spin = styled(SpinAntd)`
  .ant-spin-dot-item {
    background-color: white;
  }
`;

export const Animation = styled.span`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.light};
  animation: mymove 3s;
  border-radius: 50%;
  top: -10px;
  position: relative;
  animation-iteration-count: infinite;

  @keyframes mymove {
    from {
      top: 0px;
      opacity: 1;
    }
    to {
      top: 50px;
      opacity: 0;
    }
  }
`;

export const Section = styled.div`
  position: relative;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  min-height: 800px;
  .margin-percent {
    margin-top: 20vh;
  }
`;

export const Section6 = styled.div`
  @media only screen and (min-width: 1280px) {
    .background {
      background-size: 120%;
    }
  }

  @media only screen and (max-width: 360px) {
    .background {
      margin-top: 10rem;
    }

    .header {
      margin-top: -10rem;
    }
  }
`;

export const SectionLast = styled.div`
  .section-logo {
    display: flex;
    align-items: center;
  }
  .logo-footer {
    svg {
      max-width: 210px;
      width: 210px;
      height: 28px;
    }
  }
  @media only screen and (max-width: 900px) {
    .section-logo {
      height: initial;
    }
    .logo-footer {
      svg {
        max-width: 180px;
        width: 180px;
      }
    }
  }
`;

export const Item = styled(Form.Item)`
  .no-label {
    .ant-form-item-label {
      display: none;
    }
  }
  label {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors['gray']};
    text-transform: uppercase;
  }
  input {
    height: 3.5rem;
  }
  .ant-select-selector {
    height: 3.6rem !important;
    input {
      height: 3.6rem !important;
    }
    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      line-height: 3.6rem !important;
    }
  }
  .ant-input-number {
    width: 100%;
  }
  .custom-button {
    min-width: 20.5rem !important;
  }
  @media only screen and (max-width: 767px) {
    .custom-button {
      min-width: inherit !important;
      width: 100% !important;
    }
    label {
      font-size: 0.8rem;
      height: 25px !important;
    }
    input {
      height: 2.5rem;
    }
    .ant-select-selector {
      height: 2.6rem !important;
      input {
        height: 2.6rem !important;
      }
      .ant-select-selection-placeholder,
      .ant-select-selection-item {
        line-height: 2.6rem !important;
      }
    }
  }
`;

export const ItemHalf = styled(Item)`
  display: inline-block;
  width: calc(50% - 8px);
  &:nth-child(1) {
    margin-right: 8px;
  }
  &:nth-child(2) {
    margin-left: 8px;
  }
  @media only screen and (max-width: 767px) {
    display: block;
    width: 100%;
    &:nth-child(1) {
      margin-right: 0;
    }
    &:nth-child(2) {
      margin-left: 0;
    }
  }
`;

export const ItemOneThird = styled(Item)`
  display: inline-block;
  width: calc(33% - 8px);
  &:nth-child(1) {
    margin-right: 8px;
  }
  &:nth-child(2) {
    margin-right: 4px;
    margin-left: 4px;
  }
  &:nth-child(3) {
    margin-left: 8px;
  }
  @media only screen and (max-width: 767px) {
    display: block;
    width: 100%;
    &:nth-child(1) {
      margin-right: 0;
    }
    &:nth-child(2) {
      margin-right: 0;
      margin-left: 0;
    }
    &:nth-child(3) {
      margin-left: 0;
    }
  }
`;

export const Placeholder = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: visibility 0s, opacity 0.5s linear;
`;

export const ArrowSlickWrapper = styled.span`
  &::before {
    display: none;
  }
`;

export const StyledSlickButtonFix = styled(ArrowSlickWrapper)`
  position: absolute;
  top: calc(100% - 5rem);
  z-index: 10;
  ${(props) => {
    return props.dir === 'left' ? 'left: 0' : 'right: 4px';
  }};
`;

export const StyledSlickCircleButton = styled(ArrowSlickWrapper)`
  display: inline-block;
  position: absolute;
  top: ${(props) => props.top};
  z-index: 10;

  &.prev {
    left: calc(50% + 1rem);
  }

  &.next {
    left: calc(50% - 2rem);
  }
`;

export const SlideContent = styled.div`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 130vw;

  picture {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-end;

    img {
      margin: auto;
      object-fit: contain;
      width: calc(100%);

      @media only screen and (max-width: 1280px) and (min-width: 768px) {
        width: 90%;
      }
    }
  }
`;

export const SlideWrapper = styled.div`
  height: calc(130vw + 160px); /* imgag ratio 1:1.3 + footer - header */
  /* max-height: calc(100vh - 70px); */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const SlideFooter = styled.div`
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ColorDot = styled.span`
  cursor: pointer;
  display: inline-block;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  background-color: ${(props) => {
    return ({ theme }) => theme.colors[props.color];
  }};

  &:hover,
  &.active {
    box-shadow: 0 0px 10px 0px
      ${(props) => {
        return ({ theme }) => theme.colors[props.color];
      }};
  }
`;

export const StyledNavItem = styled.div`
  width: 40%;
  height: 15%;
  position: absolute;
  right: 0;
  top: ${(props) => (props.id === 'CustomTailoredBody' ? '3%' : '26%')};

  @media only screen and (max-width: 1535px) {
    top: ${(props) => (props.id === 'CustomTailoredBody' ? '12%' : '35%')};
  }

  @media only screen and (min-width: 1536px) {
    top: ${(props) => (props.id === 'CustomTailoredBody' ? '12%' : '34%')};
  }
`;

export const StyledBatterySlideItem = styled.div`
  .batterySlide {
    max-width: 730px;
    margin: 0 auto;
  }
`;

export const Title = styled.h1`
  font-weight: 400;
  font-size: 45px;
  line-height: 54px;
`;

export const IframeWrapper = styled.div`
  max-width: 1200px;
  height: 700px;
  width: 100%;

  @media only screen and (max-width: 1280px) {
    height: 600px;
  }

  @media only screen and (max-width: 768px) {
    height: 300px;
  }
`;

export const CusBodyGifWrapper = styled.div`
  max-width: 100%;
  margin: auto;
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media only screen and (max-width: 1280px) {
    width: 70%;
  }
`;

export const Section3 = styled(Section)`
  background-size: cover;
  height: calc(100vh - 74px);
  min-height: 60vw;
  background-position: bottom;
  transition: background-image 0.3s ease-out;

  @media only screen and (min-width: 1280px) and (min-height: 100vw) {
    max-height: 70vw;
  }
  @media only screen and (min-width: 1536px) {
    max-width: 1536px;
    max-height: 1300px;
    min-height: 950px;
    margin-right: auto;
    margin-left: auto;
  }
`;

export const NavigationWrapper = styled.div``;
