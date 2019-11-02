// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import VModal from 'vue-js-modal';
import store from './store';
import App from './App';

Vue.config.productionTip = false;
Vue.prototype.$url = "https://a1gf8dsmmf.execute-api.ap-northeast-1.amazonaws.com/dev";


Vue.use(VueOnsen);
Vue.use(VModal);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: { App }
});
