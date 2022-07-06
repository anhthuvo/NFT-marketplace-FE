import styled, { css } from 'styled-components';
import { Drawer } from 'antd';

export const MobileMenu = styled(Drawer)`
  .ant-drawer-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.colors['black-200']};
  }
`;

export const DesktopMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  &.rorate {
    svg {
      display: inline-block;
      transform: rotate(180deg);
      transition: all ease 0.3s;
    }
    &:hover {
      svg {
        transform: rotate(0);
      }
    }
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
`;


export const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${(props) => (props.position === 'absolute' ? DropdownAbsolute : DropdownFixed)};
`;

export const Countdown = styled.div`
  ul {
    display: flex;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: ${({ type }) => (type === 'perk' ? '0.6rem' : '0.8rem')};
      list-style-type: none;
      padding: 0.3em;
      align-items: center;
      color: ${({ theme, type }) =>
        type === 'perk' ? theme.colors.black : theme.colors['gray-400']};
      span {
        color: ${({ theme, type }) => (type === 'perk' ? theme.colors.pink.b : theme.colors.white)};
        display: block;
        font-size: ${({ type }) => (type === 'perk' ? '1.5rem' : '2.5rem')};
        line-height: ${({ type }) => (type === 'perk' ? '1.5rem' : '2.5rem')};
      }
    }
  } 
  @media all and (max-width: 768px) {
    ul {
      li {
        font-size: ${({ type }) => (type === 'perk' ? '0.5rem' : '0.7rem')};
        span {
          font-size: ${({ type }) => (type === 'perk' ? '1.25rem' : '2rem')};
          line-height: ${({ type }) => (type === 'perk' ? '1.25rem' : '2rem')};
        }
      }
    }
  }
`;
