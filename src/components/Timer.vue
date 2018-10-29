<template>
  <div class="timer">
    <span class="sec">
      {{ parseInt(sec, 10) }}</span><span class="mili">.{{ Math.floor(mili) }}</span>
  </div>
</template>

<script>
export default {
    props: {
        startAt: {
            type: Number,
            default: 0
        },
        countDown: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            timestamp: 0,
            time: 0,
            lastTime: 0,
            running: false,
            sec: 0,
            mili: 0
        }
    },
    created () {
        this.resetTimer()
    },
    methods: {
        resetTimer () {
            if (this.countDown) {
                this.sec = parseInt(this.startAt.toString().split('.')[0], 10)
                this.mili = parseInt(this.startAt.toString().split('.')[1], 10)
            } else {
                this.sec = 0
                this.mili = 0
            }
        },
        start () {
            if (!this.time) this.time = performance.now()
            if (!this.running) {
                this.running = true
                requestAnimationFrame(this.getTime.bind(this))
            }
        },
        stop () {
            this.running = false
            this.time = null
        },
        getLastTime () {
            return `${this.sec}.${this.mili()}`
        },
        getTime (timestamp) {
            if (!this.running) return
            if (this.sec >= 0 && this.sec >= 0) {
                this.formatTime(timestamp)
                this.time = timestamp
                requestAnimationFrame(this.getTime.bind(this))
            } else {
                this.stop()
                this.resetTimer()
                this.$emit('countdown-finish')
            }
        },
        formatTime (timestamp) {
            const diff = timestamp - this.time
            if (this.countDown) {
                this.substract(diff)
            } else {
                this.add(diff)
            }
        },
        substract (diff) {
            this.mili -= diff / 10
            if (this.mili <= 0) {
                this.sec -= 1
                this.mili += 100
            }
        },
        add (diff) {
            this.mili += diff / 10
            if (this.mili >= 100) {
                this.sec += 1
                this.mili -= 100
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .timer {
      width: 235px;
      font-size: 250px;
      margin: 20px auto 40px;
    }
    .sec {
      padding-left: 20%;
    }
    .mili {
        font-size: 100px;
        font-weight: bold;
        color: grey;
    }
</style>
