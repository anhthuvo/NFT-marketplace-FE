import styled from 'styled-components';
import { Form } from 'antd';
import { Spin as SpinAntd } from 'antd';

export const SectionLast = styled.div`
  .section-logo {
    display: flex;
    align-items: center;
  }
  @media only screen and (max-width: 900px) {
    .section-logo {
      height: initial;
    }
    svg {
      max-width: 180px;
      width: 180px;
    }
  }
`;

export const Spin = styled(SpinAntd)`
  .ant-spin-dot-item {
    background-color: white;
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
    text-transform: ${({ labelTransform }) => (labelTransform ? labelTransform : 'uppercase')};
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

export const Footer = styled.div`
  svg {
    width: 32px;
  }
  @media only screen and (max-width: 900px) {
    svg {
      width: 24px;
    }
  }
`;

export const FormSubscriberStyled = styled.div`
  .ant-form-item {
    margin-bottom: 12px !important;
  }
  .ant-select-selector {
    border: none !important;
    height: 3.5rem !important;
    input {
      height: 3.5rem !important;
    }
    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      line-height: 3.5rem !important;
    }
  }
  label {
    font-size: 1rem;
    height: auto !important;
    font-family: Open Sans;
    font-weight: 300;
  }
  .ant-select-selection-placeholder,
  .ant-select-selection-item {
    font-family: Open Sans !important;
    font-weight: 300 !important;
    font-size: 1rem;
  }
  .ant-form-item-control-input-content {
    button {
      font-family: Open Sans !important;
      font-weight: 300 !important;
      font-size: 1rem;
    }
  }
  .country {
    .ant-form-item-control {
      width: 180px;
    }
  }
  .what_kind {
    .ant-form-item-control {
      width: 211px;
    }
  }
  #signup_any_other_feddback_to_us {
    height: 132px;
    border: 1px solid #d2d2d1;
    background: #f6f6f4;
    font-size: 1rem;
    font-family: Open Sans;
    font-weight: 300;
  }
  .custom-button {
    max-width: 412px;
    width: 100%;
    span {
      font-family: Jost;
      font-style: normal;
      text-transform: capitalize;
      font-weight: 300;
      font-size: 26px;
    }
  }
  @media only screen and (max-width: 767px) {
   
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
