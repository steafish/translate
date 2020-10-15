<template>
  <div>{{string}}</div>
</template>
<script>
    export default {
        name: 'Translate',
        props: {
            pid: {
                string_id: String,
                required: false
            },
        },
        data() {
            return {
            };
        },
        computed:{
            string(){
                let string = this.string_id;
                if(this.$stringData!=null && this.string_id !=null){
                    let stringObj = this.$stringData.find(o => o.string_id == this.string_id);
                    if(stringObj!=null){
                        string = stringObj.string;
                    }
                }
                return string;
            }
        },
  }
</script>