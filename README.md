# vue-steafish

This simple plugin will enable your application having in-context translated text in your application. It will also make it simple to do translation of the texts to other languages.


# How does it work?
[This documentation is also available at www.steafish.com](https://www.steafish.com/#/documentation). The site offers a free web based application for translate your text in context.  

## In your components

Use the tag <translation></translate> in your components in the follwing way:
```
<template>
...
<translate cid="optional-category" sid="string-id-for-your-string">String that will be visible</translate>
...
</template>
```
(the cid-attribute is a optional).

### What attributes do I need?

If you do not use any parameters like the following:
```
<translate>I really like Vue</translate>
```
The string will still show, but it will not find its way into your storage. You are required to add the sid like the following:
 ```
<translate sid="i_like_vue">I really like Vue</translate>
```

### Special cases

In somecases you would have a sting that looks like this
```
"In many places January is {summer_or_winter}"
```

Using the tag above will not do a correct translation. Do the following:

```
<template>
    <div>{{this.placesInJanuary()}}</div>
</template>
<script>
...

computed(){
    placesInJanuary(){
        const string = this.$getMessage('In many places January is {summer_or_winter}', 'string-id-for-your-string', 'optional-category', this.$getLanguage());
        const summer = this.$getMessage('summer', 'string-id-for-summer', this.$getLanguage());
        const winter = this.$getMessage('winter', 'string-id-for-winter', this.$getLanguage());
        if(southernHemisphere(this.$getLanguage()))
            return string.replace('{summer_or_winter}',summer);
        else{
            return string.replace('{summer_or_winter}',winter);
        }    
    }    
}
</script>
```
In some cases the translate tag cannot be used. In these cases we can use a computed variable or use the this.$getMessage(...) directly. The this.$getMessage(...) string "In many places January is {summer_or_winter}". In return it will give the translated string if that exsists. We do the same for the translation for both summer and winter. Depending upon if the language stems from countries at the southers hemisphere or not, the translated string is returned, where the correct season is returned.

From the above we can conclude that there is a good idea to use a language-code that includes the country-code, like this:
```
    language = languageCode + '-' + countryCode;
```

## In production

With a import-statement you can get all of your translations into memory while running in production environment. If you do not like that you can read it from Firebase or your own server. You decide the location of your strings.

## While developing

1. Use it as it was a ordinary non-blocking-tag (not breaking the line of elements). It does not have any styling. This means that you are in control of the styling.  
3. Use your server/database for your translations. In the setup you decide where the strings should be recorded. You write the strings in program-code, and your strings will be recorded in the way you specify. Note that the strings will be recorded in the language you specify. This will be your source language
4. When you are ready, you can translate your strings in your application, just by setting two variables, all of your strings are editable in the language you require


The setup options will be exlained in more detailed below. First of all you should do some basic tests before using it in your application

# Project setup

Install the component using npm or using your gui. Here is how you would do it using npm:
```
npm install vue-steafish
```

## Use it in your project

The component will need to be imported and initiated. The basic initiation is done in mail.js 

### Initial configuration

In your main.js you need to include the following:
```
import translate from 'vue-steafish'

vue.use(translate, { .....})
```
## Additional configuration 
In order to get string-data to be available to the translate-tags, you will need to provide it. You can do this by importing it into your application, use vuex or use a database. One option does not exclude the second, since to can populate the database and then export your data into the string-data-file. 

If you like you can skip the additional configuration, and save that work for later.

If you choose to import string-data from file, you can save your string-data in a file called stringdata.json
in main.js you can import it using the following statement (first of all you need to store the strings in the file):
```
import stringArray from "@/assets/stringdata.js";
```

The file has the following format:
```
[{"string_id":"string-id-for-your-string", "category_id": "front_page_of_app", "string": "Here it is...", "language_id": "en"}]
```

### Thre alternative configurations


Your source strings needs to be extracted from your project and stored into a database where it can be accessable for translation. The below will explain three differnt methods for extracting the strings:
* Using the Steafish translation platform out of the box
* Create your own plattform using a server and a backend-database
* Create your own plattform using FireBase. Then you are able to create your own translation plattform on the client-side


#### Configuration (steafish.com)


The first step in the configuration process is to obtain a api-key. [Register for a Steafish-account here](https://www.steafish.com). After you have logged in, you will be able to obtain your api-key.

Having the api_key you need is to do is to do is to tell vue-steafish about the database. In your main.js you need to paste the code below. Before using it in your project you need to change:
* Project name: Any text will do, but it will be visible to you, your translators and your proof-readers
* Source language: This will be the source language your translators will use as a source-language when translating
* Language codes: The list of languages that your language should be translated to. This can be changed in the dashboard after you have loaded the strings in the steafish-application
* API key: After registering and logged into the application you can obtain your API key 


```

Vue.use(VueTranslate, {
  getString: () => {
    return null;
  },
             
  setString: (string, string_id, category_id, language_id, context) => {
    if (string && string_id && process.env.NODE_ENV=='development') { 
      let stringObj = {
        string_id: string_id,
        language_id: language_id,
        string: string,
        context:context,
        project_name: 'Test project',     //TODO: Enter the name of your project
        src_language:'en',                //TODO: Enter the source language for your project
        language_ids : ['es', 'nl', 'da'] //TODO: Language codes to be translated to (valid languaage codes can be found here: https://cloud.google.com/translate/docs/languages)
      };
      if (category_id) {
        stringObj.category_id = category_id;
      }
      
      //TODO: Register at https://www.steafish.com to obtain api_key, and paste it in below
      const apikey = '******************************************************';
      //

      axios.defaults.withCredentials = true;
      const url = 'https://www.steafish.com/api/string';
      axios.post(url, stringObj, {headers : { Authorization : 'Bearer ' + apikey}}).then((result) => {
          console.log("String: ", result);
      });  
    }
  },
  getSourceLanguage: () => {
    return "en";
  },
  getLanguage: () => {
    return "en";
  },
});

....

```
##### Webhooks
When the translator or the previewer presses "Translation done" or "Preview done" a webhook is triggered, where a post is sent to the address that you specify.This means that your can create a function in your system that should start downloading the strings from Steafish when the translation is done.

##### Get all strings
At any point in time you can get your strings at the following address:
```
const url = 'http://www.steafish.com/api/allstrings';
const api_key = '*****GET YOUR KEY FROM THE ADMIN USER WHEN LOGGED INTO STEAFISH ********';
let props = {
    headers:{
        Authorization : 'Bearer '+api_key
    }
};
axios.get(url, props).then((result) => {
  console.log("Result: ", result);
});  
```

## Setting the language

There are two language settings to be awear of. The first is your source-language. Once set you cannot change back. The second is the current language:
```
...

beforeCreate() {
    ...
    this.$setLanguage('en');
    this.$setSourceLanguage('en');
    ...
},
methods: {
    ...
    setCurrentLanguage(language){
        this.$setLanguage(language);
    }    
    ...
}    

```

# Start translating your application

When you have written your application, you are ready to start translating. You can do this by setting the required language by the following statements:
```
    ....
    this.$setLanguage('fr_FR');
    this.$setAdmin(true);
    ...
```
This will set the current language to French and all labels will be editable. This means that the translator wil do the translations using your application. When the translator is done, you are ready to export the stringData.json file.