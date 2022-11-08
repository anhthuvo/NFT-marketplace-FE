import styled, { css } from 'styled-components';

export const DesktopMenu = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  font-weight: 500;

  p{
    cursor: pointer;
  }
  p.active {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const Navigator = styled.nav`
  position: relative;
  margin: 1rem 0;
  cursor: pointer;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.white};
  transition: color ease 0.3s;
  p {
    display: inline-block;
  }

  a {
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  @media only screen and (min-width: 1024px) {
    margin: 0 2rem;
    padding: 1.5rem 0;
  }
`;

export const Header = styled.div`
  min-height: 70px;
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 30;
  &.header-shadow {
    background: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.18);
  }
  background-color: ${({theme}) => theme.colors['primary-50']};

  @media only screen and (max-width: 1024px) {
    // position: absolute;
    // height: 100%;
    // z-index: 10;
    // padding-top: 40px;

    // .bg {
    //   background-color: #d9d9d980;
    //   backdrop-filter: blur(10px);
    //   width: 100%;
    //   height: 100%;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    // }
  }
`;


