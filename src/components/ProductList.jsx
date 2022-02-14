import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function ProductGrid({ productList }) {
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    if (productList.length > 0) {
      setTimeout(() => setShowProducts(true), 350);
    } else {
      setShowProducts(false);
    }
  }, [productList]);

  return (
    <ProductsContainer showProducts={showProducts}>
      {productList.map((item) => (
        <ProductCard key={item.id}>
          <span>M</span>
          <span>{item.name}</span>
        </ProductCard>
      ))}
    </ProductsContainer>
  );
}

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
