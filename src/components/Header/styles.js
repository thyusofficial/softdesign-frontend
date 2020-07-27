import styled from 'styled-components';

export const Container = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  width: 90%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    max-width: 200px;
    height: auto;
  }

  > button {
    margin: 0 12px;
    background: transparent;
    border: 0;

    &:hover svg {
      color: #ff9000;
    }

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 440px) {
    img {
      width: 50%;
    }
  }
`;

export const AddBookModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 90%;
    background: #312e38;
    padding: 12px;
    border-radius: 10px;

    display: flex;
    flex-direction: column;

    > button:first-child {
      margin: 16px 16px 16px auto;
      background: none;
      border: none;

      &:hover svg {
        color: #ff9000;
      }
      svg {
        color: #f4ede8;
      }
    }
  }
`;

export const Profile = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 5vw;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 1vw;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
    }
  }

  @media (max-width: 512px) {
    img {
      display: none;
    }

    span,
    strong {
      font-size: 14px;
    }
  }
`;
