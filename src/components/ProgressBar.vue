<template>
  <div
    :class="{ hidden: isHidden}"
    :style="{
      width: `${percent}%`,
    }"
  />
</template>
<script>
export default {
  data () {
    return {
      isHidden: true,
      percent: 0,
      timer: 0
    }
  },
  methods: {
    start () {
      this.isHidden = false
      this.percent = 0
      this.timer = setInterval(() => { this.percent += 1 }, 100)
    },
    finish () {
      this.percent = 100
      this.hidden = true
      clearInterval(this.timer)
    }
  }
}
</script>
