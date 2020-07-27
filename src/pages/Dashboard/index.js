import React, { useEffect, useState, useCallback } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

import Header from '../../components/Header';
import Details from '../../components/Details';
import { Container, BookList, Book, SearchBar } from './styles';
import { SearchInput } from '../../components/Input';

function Dashboard() {
  const [books, setBooks] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { addToast } = useToast();

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const loadBooks = useCallback(async () => {
    const response = await api.get('/books');

    const data = response.data.map((book) => {
      return {
        ...book,
        image_url: 'http://placeimg.com/260/260/any',
      };
    });

    setBooks(data);
    setSearchResults(data);
  }, []);

  const handleTake = useCallback(
    async (bookId) => {
      try {
        await api.put(`/books/${bookId}`, {
          take: true,
        });
        loadBooks();
        addToast({
          type: 'success',
          title: 'Livro alugado com sucesso!',
        });
      } catch (error) {}
    },
    [loadBooks, addToast]
  );

  React.useEffect(() => {
    const results = books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, books]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  return (
    <Container>
      <Header updateBooks={loadBooks} />
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Procurar por livro"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchBar>

      <BookList>
        {searchResults.map((book) => (
          <Book key={book.id}>
            <img src={book.image_url} alt="Book" />
            <strong>{book.name}</strong>
            <span>R$ {book.price}</span>
            <div>
              <button
                type="button"
                disabled={book.take}
                onClick={() => handleTake(book.id)}
              >
                {book.take ? 'INDISPONÍVEL' : 'ALUGAR'}
                <FiShoppingCart />
              </button>

              <Details data={book} updateBooks={loadBooks} />
            </div>
          </Book>
        ))}
      </BookList>
    </Container>
  );
}

export default Dashboard;
