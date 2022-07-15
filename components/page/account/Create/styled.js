import styled from "styled-components";
import { Form, Modal } from "antd";

export const FormItem = styled(Form.Item)`
  input,
  textarea,
  .ant-select .ant-select-selector,
  .ant-select .ant-select-selector:hover {
    border-radius: 4px;
    background-color: transparent;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.gray} !important;
    color: ${({ theme }) => theme.colors.gray};
    padding: 0.5rem 1rem;
    font-size: 1rem;
    height: auto;
  }

  input:focus,
  textarea:focus,
  input:hover,
  textarea:hover {
    border-color: ${({ theme }) => theme.colors.gray};
  }

  label {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1rem;
    font-weight: 400;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector::after {
    line-height: 1rem;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const UploadImage = styled.div`
  .ant-upload-list-item:hover .ant-upload-list-item-info {
    background-color: transparent !important;
  }

  .ant-upload-list-text-container {
    background-color: ${({ theme }) => theme.colors.white} !important;
    margin-top: 1rem;

    .ant-upload-list-item {
      margin-top: 0rem;
      height: 2rem;
    }
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px ${({ theme }) => theme.colors["gray-100"]} solid;
    border-radius: 4px;
  }

  .ant-modal-body {
    padding: 60px 40px 40px 40px;
  }

  .ant-modal-close-x {
    color: white;
  }

  button:focus {
    outline: none;
  }
`;
