import translate from './components/Translate.vue';

const VueTrannslate = {
    install(Vue) {

        // Add $plugin instance method directly to Vue components
        Vue.prototype.$setStringData = (stringData) => {
            Vue.prototype.$stringData = stringData    
        }

        Vue.mixin({
            //string-data
            data() {
                return {
                    stringData : null,
                };
            },
            methods:{
                setStringData(stringData){
                    this.stringData=stringData;
                }
            }
        });    
    },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePluginTestPlugin);
}

export default VueTrannslate;
export { translate };
