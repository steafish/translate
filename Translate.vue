
<template>
  <div v-bind:class="{ selected: highlightString }" class="translate">
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
      let context = window.location.href;
      if(context.indexOf('sid=')){
        context=context.substring(0,context.indexOf('sid=')-1);
      }
     
      this.$setString(string, this.sid, this.cid??this.parent, language_id, context); 
  
      return string
    },
    highlightString(){
      if(this.$route && this.$route.query && this.$route.query.sid){
        //console.log('Query-string: ',this.$route.query.sid);
        //console.log('Current string_id',this.sid);
        return this.$route.query.sid == this.sid;
      }else{
        return false;
      }
    }  
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
   .selected {
     border: 5px solid rgb(232, 239, 6);
   }
</style>