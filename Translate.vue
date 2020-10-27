
<template>
  <div>
    <div v-if="string">{{ string }}</div>
    <div v-else><slot/></div>
    <div v-if="admin" :title="enString">
        <input type='text' :placeholder="getSourceString()" :value="editString">
        <button @click="updateString()">ok</button>
    </div>
  </div>  
</template>
<script>
export default {
  name: 'Translate',
  props: {
    sid: {
      required: true
    },
    cid: {
      required: false
    }
  },
  data: function () {
    return {
        editString:null,
        admin:false,
    }
  },  
  mounted(){
      this.admin = this.$admin;
  },
  computed: {
    string () {
      let string = this.$getString(this.sid, this.cid, this.$getLanguage());
      if(!string && this.$slots.default && this.$slots.default.length > 0){
        string = this.$slots.default[0].text;
      }
     
      this.$setString(string, this.sid, this.cid, this.$getLanguage());
  
      return string
    },
    
  },
  methods: {
     updateString(){
         this.$setString(this.editString, this.sid, this.cid,this.$language_id);
     },
     getSourceString(){
       if(this.$admin){
          this.sourceString=this.$getString(this.sid, this.cid,this.$getSourceLanguage());
       }
       return this.sourceString;
    }
  }
}
</script>
