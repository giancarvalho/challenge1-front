import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import Header from '../components/Header';

import { getProducts } from '../services/service';

// TODO usar user ref para fazer pesquisas dinamicas com base em input
export default function Home() {
  const [productList, setProductList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [warnNotFound, setWarnNotFound] = useState(false);

  function cleanSearch() {
    setProductList([]);
    setShowProducts(false);
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
        setTimeout(() => setShowProducts(true), 350);
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
        <InputContainer isSearching={productList.length > 0} warnNotFound={warnNotFound}>
          <Input
            type="search"
            placeholder="Procure por produtos"
            minLength={3}
            debounceTimeout={500}
            value={searchValue}
            onChange={(e) => handleChange(e)}
          />
          {isSearching && <Oval height={30} width={30} />}
        </InputContainer>
        <ProductsContainer showProducts={showProducts}>
          {productList.map((item) => (
            <ProductCard key={item.id}>
              <span>M</span>
              <span>{item.name}</span>
            </ProductCard>
          ))}
        </ProductsContainer>
      </ContentContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  margin-top: 100px;
  height: 100%;

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
    content: 'Ops, não encontramos nada.
            Tente outro produto (ex: camisa, garrafa)';
    opacity: ${({ warnNotFound }) => (warnNotFound ? '1' : '0')};
    position: absolute;
    bottom: -40px;
    color: red;
    transition: all 300ms ease-in;
  }
`;

const ProductsContainer = styled.ul`
  display: ${({ showProducts }) => (showProducts ? 'flex' : 'none')};
  flex-direction: column;
  width: 80%;
  max-width: 800px;
  margin-top: 150px;
  animation: fadein 300ms linear;
`;

const ProductCard = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  min-height: 150px;
  border: 1px solid #808080;
  background-color: #f3f3f3;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 0 10px;

  span:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 89px;
    height: 75%;
    min-width: 150px;
    font-family: "Rowdies", cursive;
    color: #fff;
    background-color: #000;
    border-radius: 8px;
  }

  span:last-child {
    display: inline-block;
    width: 500px;
    font-size: 28px;
    word-break: break-word;
    text-transform: capitalize;
  }

  @media (max-width: 700px) {
    span:first-child {
      min-width: 75px;
      font-size: 45px;
    }

    span:last-child {
    font-size: 14px;
  }
  }
`;
