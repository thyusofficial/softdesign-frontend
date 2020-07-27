import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;

  > button {
    padding: 12px;
    background: transparent;
    border: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Content = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;

  form {
    position: relative;
    width: 90%;
    border-radius: 10px;
    background: #312e38;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    padding: 12px;

    color: #f4ede8;

    display: flex;
    flex-direction: column;

    img {
      align-self: center;
      margin-bottom: 16px;
    }

    > button:first-child {
      position: absolute;
      right: 5%;
      top: 5%;

      background: none;
      border: 0;

      &:hover svg {
        color: #ff9000;
      }
      svg {
        color: #f4ede8;
      }
    }

    span {
      text-transform: capitalize;
      margin: 6px 0;
      display: flex;
      align-items: center;
    }
  }
`;
