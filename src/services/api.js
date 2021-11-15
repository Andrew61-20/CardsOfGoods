import axios from 'axios';

axios.defaults.baseUrl = 'http://localhost:3001/goods';
const BASE_URL = 'http://localhost:3001/goods';

const getAllGoodsItems = () =>
  axios.get (BASE_URL).then(response => {
    return response.data;
  });    
  
export { getAllGoodsItems };
    