<template>
  <div class="timer">
    <span class="sec">{{ Math.floor(time / 10) }}</span><span class="mili">.{{ time % 10 }}</span>
  </div>
</template>

<script>
export default {
    data () {
        return {
            time: 0,
            lastTime: 0,
            interval: null
        }
    },
    methods: {
        start () {
            this.time = 0
            const run = () => {
                this.time += 1
            }

            this.interval = setInterval(run, 100)
        },
        stop () {
            clearInterval(this.interval)
            this.lastTime = this.time / 10
        },
        getLastTime () {
            return this.lastTime
        }
    }
}
</script>

<style lang="scss" scoped>
    .sec {
      padding-left: 20%;
    }
    .mili {
        font-size: 100px;
        font-weight: bold;
        color: grey;
    }
</style>
