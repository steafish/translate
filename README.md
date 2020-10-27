# vue-steafish

This is a simple plugin that will enable your application having translated text in your application. It will also make it simple to do translation of the texts to other languages.

There are some basic options that you need to be aware of before starting to use this component. 

It has the following uses:
1. Use it as it was a ordinary div
2. Make use of the array-container 
3. Use a database for your translations

The options will be exlained in more detailed below. First of all you should do some basic tests before using it in your application

## Project setup

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
### Additional configuration

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

In addition or instead of the import-strings-data-method, you can select to use a database. The setup is very simple. All you need is to do is to do is to tell vue-steafish about the database.

In main.js you will have defined the installed the database and configured the database in main.js:
```
import firebase from 'firebase'

const config = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
firebase.initializeApp(config)

export const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    ...
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
    let stringTable = null;
    if(category_id){
      stringTable = db.collection("steafish_string_table")
      .where("category_id", "==", category_id)
      .where("string_id", "==", string_id)
      .where("language_id", "==", language_id)
    }else{
      stringTable = db.collection("steafish_string_table")
      .where("string_id", "==", string_id)
      .where("language_id", "==", language_id)
    }
    stringTable.get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        let stringObj=null;
        
        if(category_id){
          stringObj = {
            "string_id" : string_id, 
            "category_id":category_id, 
            "language_id": language_id,
            "string" : string};
        }else{
          stringObj = {
            "string_id" : string_id, 
            "language_id": language_id,
            "string" : string};
        }
        
        db.collection("steafish_string_table").add(stringObj).then(() => 
        { 
          console.log('Added string: ',stringObj);
        });
      }
    });
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

In the above example, getString() is reading from an array, and writing new strings to the database. You can choose to read/write to vuex if you like.

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

## In your components

Use the tag <translation></translate> in your components in the follwing way:
html:
<translate cid="optional-category" sid="string-id-for-your-string">String that will be visible</translate>

(the cid-attribute is a optional).

