import translate from "./Translate.vue";

const VueSteafish = {
  install(Vue, options) {
        // Add $plugin instance method directly to Vue components
        Vue.prototype.$setStringData = (stringData) => {
            Vue.prototype.$stringData = stringData;
        };
        Vue.prototype.$setLanguage = (language_id) => {
            Vue.prototype.$language_id = language_id;
        };
        Vue.prototype.$setAdmin = (admin) => {
            Vue.prototype.$admin = admin;
        };
        Vue.prototype.$setSourceLanguage = (sourceLanguage_id) => {
            Vue.prototype.$sourceLanguage_id=sourceLanguage_id;
        };
        Vue.prototype.$getString = (string_id, category_id, language_id) => {
            return options.getString(string_id, category_id, language_id);
        };    
        Vue.prototype.$setString = (string, string_id, category_id, language_id, parent) => {
            options.setString(string, string_id, category_id, language_id, parent);
        };
        Vue.prototype.$getLanguage = () => {
            if(Vue.prototype.$language_id==null){
                Vue.prototype.$language_id = options.getLanguage();
            }
            return Vue.prototype.$language_id;
        };
        Vue.prototype.$getSourceLanguage = () => {
            return Vue.prototype.$sourceLanguage_id=options.getSourceLanguage();
        };
        Vue.prototype.$getMessage = (string, string_id, language_id, category_id) => {
            if(string!=null && string_id!=null && language_id!=null){
                const lookUpString = options.getString(string, string_id, category_id, language_id);
                if(lookUpString===null){
                   options.setString(string, string_id, category_id, language_id);
                }
            }else{
                console.log('Steafish error! String_id: '+string_id+' Must have string_id, string and language_id');
            }
            return string;
        };
        Vue.component("translate", translate);
    },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== "undefined" && window.Vue) {
    window.Vue.use(VueSteafish);
}

export default VueSteafish;
export { translate };