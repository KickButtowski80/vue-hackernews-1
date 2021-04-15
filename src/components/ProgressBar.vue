<template>
  <div
    :class="{ hidden: isHidden}"
    :style="{
      width: '0%',
    }"
  />
</template>
<script>
export default {
  data() {
    return {
      isHidden: true,
    }
  },
  methods: {
    start() {
      this.isHidden = false;
    },
    finish() {},
  },
};
</script>
