import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const SearchBar = styled.div`
  max-width: 1120px;
  width: 90%;
  margin: 16px auto;
`;

export const BookList = styled.ul`
  max-width: 1120px;
  width: 90%;
  margin: 16px auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  list-style: none;
`;

export const Book = styled.li`
  background: #3e3b47;
  padding: 12px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > span,
  > strong {
    text-transform: capitalize;
    margin: 12px 0;
  }

  > div {
    display: flex;
    align-items: stretch;
    background: #ff9000;
    border-radius: 10px;
    height: 56px;

    > button:first-child {
      color: #312e38;
      font-weight: 500;
      flex: 1;
      border: 0;
      border-right: 1px solid #312e38;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;

      &:not(:disabled) {
        background: #ff9000;
      }

      &:disabled {
        pointer-events: none;
      }

      &:hover {
        background: ${shade(0.2, '#ff9000')};
      }
    }
  }
`;
