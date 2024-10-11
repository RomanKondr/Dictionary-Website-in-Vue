import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});

const vm = new Vue();
const baseURL = 'http://localhost:3000/words/';


const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    const status = error.response ? error.response.status : 'Network Error';
    const statusText = error.response ? error.response.statusText : 'Check your server connection';
    vm.flash(`${status}: ${statusText}`, 'error');
  });

export const api = {
    getWord: handleError(async id => {
        const res = await axios.get(baseURL + id);
        return res.data;
    }),

    getWords: handleError(async ()=> {
        const res = await axios.get(baseURL);
        return res.data;
    }),

    saveTestResult: handleError(async (testResult) => {
        const ress = await axios.post('http://localhost:3000/api/test-results', testResult);
        if (ress.status !== 200) {
            throw new Error(`Error from server: ${ress.statusText}`);
        }
        return ress.data;
    }),
    
      
    getTestResults: handleError(async () => {
        const res = await axios.get(`http://localhost:3000/api/test-results`);
        return res.data;
    }),

    deleteWord: handleError(async id => {
        const res = await axios.delete(baseURL + id);
        return res.data;
    }),

    createWord: handleError(async payload => {
        const res =await axios.post(baseURL, payload);
        return res.data;
    }),

    updateWord: handleError(async payload => {
        const res = await axios.put(baseURL + payload._id, payload);
        return res.data;
    })
};