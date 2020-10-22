import translate from './Translate.vue';

const VueSteafish = {
  install(Vue) {
        // Add $plugin instance method directly to Vue components
        Vue.prototype.$setStringData = (stringData) => {
            Vue.prototype.$stringData = stringData;
        }
        Vue.prototype.$setLanguage = (language_id) => {
            Vue.prototype.$language_id = language_id;
        }
        Vue.prototype.$setAdmin = (admin) => {
            Vue.prototype.$admin = admin;
        }
        Vue.component('translate', translate)
        Vue.mixin({
            //string-data
            data() {
                return {
                    stringData: null,
                };
            },
            methods: {
                setStringData(stringData) {
                    this.stringData = stringData;
                }
            }
        });
    },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueSteafish);
}

export default VueSteafish;
export { translate };