import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import Header from '../components/Header';
import { getProducts } from '../services/service';
import ProductGrid from '../components/ProductList';

export default function Home() {
  const [productList, setProductList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [warnNotFound, setWarnNotFound] = useState(false);

  function cleanSearch() {
    setProductList([]);
    setIsSearching(false);
  }

  function flashMessage() {
    setWarnNotFound(true);
    setTimeout(() => setWarnNotFound(false), 5000);
  }

  function searchProducts(term) {
    setIsSearching(true);

    getProducts(term)
      .then((response) => {
        setProductList(response.data.products);
        setIsSearching(false);
      })
      .catch((error) => {
        if (error.response.status === 503) flashMessage();
        cleanSearch();
      });
  }

  function handleChange(e) {
    if (e.key === 'Escape') return;

    const { value } = e.target;
    setSearchValue(value);
    setWarnNotFound(false);

    if (value.length === 0) {
      cleanSearch();
    }

    if (value.length >= 3) {
      searchProducts(value);
    }
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <InputContainer
          isSearching={productList.length > 0}
          warnNotFound={warnNotFound}
          className="input-container"
        >
          <Input
            type="search"
            placeholder="Pesquise produtos"
            minLength={3}
            debounceTimeout={500}
            value={searchValue}
            onChange={(e) => handleChange(e)}
          />
          {isSearching && <Oval height={30} width={30} color="#000" />}
        </InputContainer>
        <ProductGrid productList={productList} />
      </ContentContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding-top: 100px;
  height: calc(100% - 100px);

  @keyframes fadein {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  height: calc(100% - 100px);
`;

const Input = styled(DebounceInput)`
  width: 80%;
  height: 100%;
  border: none;
  font-size: 28px;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  max-width: 500px;
  height: 60px;
  border: 2px solid #414040;
  width: 90%;
  border-radius: 50px;
  position: absolute;
  top: ${({ isSearching }) => (isSearching ? '13%' : '50%')};
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 300ms ease-in-out;

  :after{
    content: 'Ops, não encontramos nada. Tente pesquisar outro produto (ex: camisa, garrafa)';
    opacity: ${({ warnNotFound }) => (warnNotFound ? '1' : '0')};
    position: absolute;
    bottom: -40px;
    color: red;
    transition: all 300ms ease-in;
  }
`;
