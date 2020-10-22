# vue-translate

## Project setup
```
npm install vue-steafish
```

## Use it in your project
In your main.js
```
import translate from 'vue-steafish'

vue.use(translate)
```

In your vue-file:
html:
<translate cid="optional-category" sid="string-id-for-your-string"></translate>

(the cid-attribute is a optional).


In your App.vue:
```
this.$setLanguage('en');
this.$setAdmin(false);
const stringArray =[
    {string_id:'string-id-for-your-string', category_id: 'front_page', string: 'Here it is...', language_id:'en'}
    ];
this.$setStringData(stringArray);
```

The setLanguage will set the language for all translate-tags.
The setStringData will set the current strings that should be used by the translate-tags. 
Both string_id and string are mandantory.

The setAdmin will make all of your translate-tags editable. Pressing ok after editing in the current language will send an event 'string_updated'. It will carry payload representing one translated line of the stringData.