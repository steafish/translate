<template>
  <div id="app">
    <translate pid='test'></translate>
  </div>
</template>

<script>


export default {
  name: 'App',
 
  created() {
    this.$setStringData({string_id:'test', string: 'Here it is...'});
    console.log(this.$stringData);
  }
}
</script>

