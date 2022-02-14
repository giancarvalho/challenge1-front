import React, { useCallback } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
// import { getProducts } from '../services/service';

// TODO usar user ref para fazer pesquisas dinamicas com base em input
export default function Home() {
  // const [productList, setProductList] = useState([]);

  const search = useCallback(() => {
    console.log('test');
  });

  // console.log(productList);
  return (
    <PageContainer>
      <Header />

      <Input type="text" onChange={search} />
      {/* <ul>
        {productList.map(((product) => (
          <li>
            {product.name}
          </li>
        )))}

      </ul> */}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  margin-top: 100px;
  position: relative;
  height: calc(100% - 100px);
  background: blue;
`;

const Input = styled.input`
  width: 90%;
  max-width: 500px;
  height: 60px;
  border-radius: 50px;
  font-size: 28px;
  padding-left: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 300ms ease-in-out;

  &:focus {top: 15%;
    
  }
`;
