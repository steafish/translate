
<template>
  <div class="translate">
    <span v-if="string">{{ string }}</span>
    <span v-else><slot/></span>
    <span v-if="admin" :title="enString">
        <input type='text' :placeholder="getSourceString()" :value="editString">
        <button @click="updateString()">ok</button>
    </span>
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
        parent : '',
    }
  },  
  mounted(){
      this.admin = this.$admin;    
      if(this.$parent && this.$parent.$vnode && this.$parent.$vnode.tag){
          this.parent=this.$parent.$vnode.tag;
      }     
  },
  computed: {
    string () {
      let string = this.$getString(this.sid, this.cid, this.$getLanguage());
      if(!string && this.$slots.default && this.$slots.default.length > 0){
        string = this.$slots.default[0].text;
      }

      

      const language_id = this.$getLanguage()??this.$getSourceLanguage();
     
      this.$setString(string, this.sid, this.cid??this.parent, language_id, this.parent); 
  
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
<style scoped>
   .translate {
     display: inline-block;
   }
</style>