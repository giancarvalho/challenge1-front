/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const MystiqueSearch = (term) => `https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=${term}&source=nanook`;

function getProducts(term) {
  return axios.get(MystiqueSearch(term));
}

export {
  getProducts,
};
