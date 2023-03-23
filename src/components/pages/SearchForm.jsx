import styled from '@emotion/styled';
import React, { useState } from 'react';
import Button from '../Button';
import { Input } from '../Input';

const Form = styled.form`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input placeholder={'search'} value={query} onChange={handleChange} />
      <Button>Search</Button>
    </Form>
  );
};

export default SearchForm;
