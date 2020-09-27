<template>
  <div class="translate">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    pid: {
      type: String,
      required: false
    },
  },
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
.translate {
}
</style>