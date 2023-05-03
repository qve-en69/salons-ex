import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ruLocaleApp from './ru/app'
import ruLolaceStores from './ru/stores'
import ruLocaleStudios from './ru/studios'

Vue.use(VueI18n)

const messages = {
    ru:{
        ...ruLocaleApp,
        ...ruLolaceStores,
        ...ruLocaleStudios
    }
}
const i18n = new VueI18n({
    locale: 'ru',
    messages
})

export default i18n