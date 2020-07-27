import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  border: 2px solid #232129;
  color: #666360;

  svg {
    margin-right: 8px;
  }
  input {
    width: 100%;
    font-size: 14px;
    border: 0;
    background: none;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }
`;
