import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.use(VueAxios, axios);

export default {
    root: process.env.VUE_APP_API_URL,
    fileRoot: process.env.VUE_FILE_API_URL
};
