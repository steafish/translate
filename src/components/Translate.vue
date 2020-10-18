<template>
  <div>
    <div v-if="!admin">{{ string }}</div>
    <div v-else :title="enString">
        <input type='text' :placeholder="enString" :value="editValue">
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
  data () {
    return {
        editValue : null,
        enString : null,
        admin:this.$admin
        }
  },
  mounted(){
        if(this.admin){
            console.log('admin')
            const stringObj = this.$stringData.find(
                (o) => o.string_id === this.sid && (o.category_id=== this.cid || this.cid==null ) && (o.language_id === 'en')
            )
            if (stringObj != null) {
                this.enString = stringObj.string
            }   
        }
  },
  computed: {
    string () {
      
      let string = this.sid
      if (this.$stringData != null && this.sid != null) {
        const stringObj = this.$stringData.find(
          (o) => o.string_id === this.sid && (o.category_id=== this.cid || this.cid==null ) && (o.language_id === this.$language_id)
        )
        if (stringObj != null) {
          string = stringObj.string
        }else{
            console.log('String not found');
        }
        
      }
      return string
    }
  },
  methods: {
     updateString(){
         this.$emit('string_updated',{string_id: this.sid, category_id: this.cid, language_id: this.$language_id})
     }
  }
}
</script>
