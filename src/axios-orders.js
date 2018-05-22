import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://react-my-burger-94b30.firebaseio.com/'
});

export default instance;
