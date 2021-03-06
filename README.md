# vue-steafish

This simple plugin will enable your application having in-context translated text in your application. It will also make it simple to do translation of the texts to other languages.

#How does it work?

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
import stringArray from "@/assets/firebaseConfig.js";
```

The file has the following format:
```
[{"string_id":"string-id-for-your-string", "category_id": "front_page_of_app", "string": "Here it is...", "language_id": "en"}]
```

### Configuration (Axios)


In addition or instead of the import-strings-data-method, you can select to use a database. The setup is very simple. All you need is to do is to do is to tell vue-steafish about the database.

In your main.js you will have defined the installed the database and configured the database in main.js:
```
import VueTranslate from 'vue-steafish'
import stringData from '@/assets/stringdata.json'




firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    //...
}
db.settings(settings)

Vue.use(VueTranslate,{
  getString: (string_id, category_id, language_id) =>
   { 
    let string=null;
    if (stringData != null && string_id != null) {
      const stringObj = stringData.find(
        (o) => o.string_id === string_id && (o.category_id=== category_id || category_id==null ) && (o.language_id === language_id)
      )
      if (stringObj != null) {
        string = stringObj.string
      }
    }
    return string;
   },
  setString: (string, string_id, category_id, language_id) => { 
      if(string && string_id){
          let stringObj = {
              "string_id" : string_id, 
              "language_id": language_id,
              "string" : string
          };
        
          if(category_id){
            stringObj.category_id = category_id;
          }  
    
          axios.post('url-to-your-server', stringObj)
               .then(response => {
                  console.log(response);
               }).catch(error => {
                  console.log(error)
               });
      }    
  },
  getSourceLanguage:() => {
    return 'en';
  },
  getLanguage:() => {
    return 'en';
  },
});
```

### Configuration (Firefox)


In addition or instead of the import-strings-data-method, you can select to use a database. The setup is very simple. All you need is to do is to do is to tell vue-steafish about the database.

Save the following to assets/firebaseConfig.js in your project, where you replace the values with the value for your firebase configuration:
```
{
    "apiKey": " ...",
    "authDomain": " ... ",
    "databaseURL": " ...",
    "projectId": " ....",
    "storageBucket": " ....",
    "messagingSenderId": " ... ",
    "appId": " ... "
  };
```

In your main.js you will have defined the installed the database and configured the database in main.js:
```
import firebase from 'firebase'
import VueTranslate from 'vue-steafish'
import stringData from '@/assets/stringdata.json'
import firebaseConfig from '@assets/firebaseconfig.json'


firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    //...
}
db.settings(settings)

Vue.use(VueTranslate,{
  getString: (string_id, category_id, language_id) =>
   { 
    let string=null;
    if (stringData != null && string_id != null) {
      const stringObj = stringData.find(
        (o) => o.string_id === string_id && (o.category_id=== category_id || category_id==null ) && (o.language_id === language_id)
      )
      if (stringObj != null) {
        string = stringObj.string
      }
    }
    return string;
   },
  setString: (string, string_id, category_id, language_id, context) => { 
      if(string && string_id){
          let stringObj = {
              "string_id" : string_id, 
              "language_id": language_id,
              "string" : string
          };
        
          if(category_id){
              stringObj.category_id = category_id;
          }  

          if(context){
              stringObj.context = context;
          }
    
          db.collection("steafish_string_table").doc(string_id).set(stringObj).then(() => {
            console.log("String-id: "+string_id+" successfully written!");
          }).catch((error) => {
            console.error("Error writing document: ", error);
          });
      }    
  },
  getSourceLanguage:() => {
    return 'en';
  },
  getLanguage:() => {
    return 'en';
  },
});
```
Remember to give read/write-access to the firebase-database-table 

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

# In your components

Use the tag <translation></translate> in your components in the follwing way:
```
<template>
...
<translate cid="optional-category" sid="string-id-for-your-string">String that will be visible</translate>
...
</template>
```
(the cid-attribute is a optional).

## What attributes do I need?

If you do not use any parameters like the following:
```
<translate>I really like Vue</translate>
```
The string will still show, but it will not find its way into your storage. You are required to add the sid like the following:
 ```
<translate sid="i_like_vue">I really like Vue</translate>
```
However to collect your strings into a group, you should use category_id. The collection could be a modal, a component, view or a route. You are the best to say what strings that belongs together. However, context is an important factor when talking about translations. 

One word could mean different things in different context. That is why you should group your strings accoring to its context. A context could be hierarchical, and that is a good reason for creating a naming-standard for your string-ids and category-ids. A category could be customer-configuration, then the strings belonging to that category is in the same context. 

When translators understands the context there is a very high propability that the translation will be correct according to the context. Then it becomes important for you to make it easy to understand the context. This is why there should be a one-to-one between context and a visible view to the user. Then there should be a one-to-one-relationship between you vue-route and your context.

## Special cases

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

# Exporting the string-data from firebase to the asset-file

While developing your database will contain all of your strings. Before building for deployment, you will ned to remove the firebase-statements from the vue-steafish uses-statement. In addition you will ned to export the data into the file that needs to be added to assets in your project. 

Here is some example nodejs code that you can use for exporting data:
```
async function dumpData(filename) {
    const serviceAccount = require("./serviceAccountKey.json");
    const admin = require('firebase-admin');
    const fs = require('fs');

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    let stringArray = [];
    const db = admin.firestore();
    const snapshot = await db.collection('steafish_string_table').get();
    snapshot.forEach((doc) => {
        const row = doc.data();
        //console.log(row.string_id+' '+row.string);
        stringArray.push({"string_id" : row.string_id, "string" : row.string, 'category_id' : row.category_id, "language_id" : row.language_id, "context": row.context });
    });

   
    fs.writeFile(filename, JSON.stringify(stringArray), function (err) {
        if (err) return console.log(err);
        console.log('\nStrings has been written to the file stringdata.json\n\n');
    });
}

dumpData('stringdata.json');

```
You can generate your serviceAccountKey.json at your firebase-account. 


# Start translating your application

When you have written your application, you are ready to start translating. You can do this by setting the required language by the following statements:
```
    ....
    this.$setLanguage('fr_FR');
    this.$setAdmin(true);
    ...
```
This will set the current language to French and all labels will be editable. This means that the translator wil do the translations using your application. When the translator is done, you are ready to export the stringData.json file.