<template>
  <div class="timer">
    <span class="sec">
      {{ parseInt(sec, 10) }}</span><span class="mili">.{{ Math.floor(mili) }}</span>
  </div>
</template>

<script>
/*eslint-disable */
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
            mili: 0,
            restriction: 5
        }
    },
    watch: {
        countDown (newVal, oldVal) { // watch it
            console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        }
    },
    created () {
        this.resetTimer()
    },
    methods: {
        resetTimer () {
            if (this.countDown) {
                this.sec = Math.floor(this.startAt)
                this.mili = (this.startAt % 1).toFixed(2).substr(2)
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
            return parseFloat(`${this.sec}.${Math.floor(parseFloat(this.mili))}`)
        },
        getTime (timestamp) {
            if (!this.running) return
            if (this.countDown && this.sec === 0 && this.mili < 10) {
                this.$emit('countdown-finish')
            } else if (this.sec > this.restriction) {
                this.$emit('time-restriction')
            } else {
                this.formatTime(timestamp)
                this.time = timestamp
                requestAnimationFrame(this.getTime.bind(this))
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
