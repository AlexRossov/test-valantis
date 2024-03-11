import axios from 'axios';
import CryptoJS from 'crypto-js';

export const generateAuthToken = () => {
  const PASSWORD = 'Valantis';
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const authString = `${PASSWORD}_${timestamp}`;
  return CryptoJS.MD5(authString).toString(CryptoJS.enc.Hex);
};

const authToken = generateAuthToken();

export const fetchData = async (action, params) => {
  const response = await axios.post('https://api.valantis.store:41000/',
    {
      action,
      params
    },
    {
      headers: { 'X-Auth': authToken }
    }
  )
  return response.data.result
}

export const filterUniqueIdProducts = (products) => {
  return Object.values(products.reduce((uniqueIds, product) => {
    if (!uniqueIds[product.id]) {
      uniqueIds[product.id] = product;
    }
    return uniqueIds;
  }, {}));
};
