<!--eslint-disable-->
<template>
    <div class="audio-recorder">
        <transition v-bind:name="transitionName" mode="out-in">
            <recorder v-if="showRecorder" @on-start="recordingStartHandler" @on-stop="recordingStopHandler" />
            <player v-else :audio-data="audioData" />
        </transition>

        <div v-if="!showRecorder" class="audio-recorder--buttons">
            <span
                :class="{ 'disabled': !audioData }"
                class="save-btn"
                @click="newHandler">New</span>
            <span
                :class="{ 'disabled': !audioData }"
                class="save-btn"
                @click="saveHandler">Save</span>
        </div>
    </div>
</template>

<!--eslint-enable-->
<script>
import Recorder from '../RecordAudio.vue'
import Player from '../PlayAudio.vue'
import { SAVE_AUDIO } from '../../config/constants'

export default {
    name: 'RecordPlayAudio',
    components: {
        Recorder,
        Player
    },
    data () {
        return {
            showRecorder: true,
            audioData: null,
            transitionName: 'player'
        }
    },
    methods: {
        recordingStartHandler () {
            this.transitionName = 'player'
        },
        recordingStopHandler (audioData) {
            this.audioData = audioData
            this.showRecorder = false
        },
        saveHandler () {
            const reader = new FileReader()
            reader.readAsDataURL(this.audioData.audioBlob)

            reader.onloadend = () => {
                const binary = reader.result
                // const duration = this.audioData.duration
                const { duration } = this.audioData

                this.$store.dispatch(SAVE_AUDIO, { binary, duration }).then((resp) => {
                    URL.revokeObjectURL(this.audioData.audioUrl)
                    this.$router.push(`/${resp.hash}`)
                })
            }
        },
        newHandler () {
            this.transitionName = 'recorder'
            this.showRecorder = true
        }
    }
}
</script>

<style lang="scss" scoped>
    .audio-recorder {
        display: flex;
        flex-direction: column;
        height: 600px;
        align-items: center;
        justify-content: space-around;
    }
    .audio-recorder--buttons {
        position: absolute;
        bottom: 0;
        display: flex;
        margin: 20px 0;
        justify-content: center;
        padding:5px;

        > span {
            flex:1 1 auto;
            margin: 10px;
        }
    }
    .save-btn {
        background-image: -webkit-linear-gradient(top, #edecec, #edecec);
        background-image: linear-gradient(top, #edecec, #edecec);
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1), inset 0px -3px 1px 1px rgba(204, 198, 197, 0.1);
        cursor: pointer;
        width: 100px;
        border-radius: 7px;
        padding: 5px;
        margin: 0 auto 40px;
        display: flex;
        justify-content: center;
        line-height: 32px;
        font-size: 19px;
        border: 1px solid #bfbfbf;
        &:active {
            box-shadow: inset 0px -3px 1px 1px rgba(204,198,197,.5);
            background-image: none;
            border: 1px solid #7d7d7d;
        }

        &.disabled {
            visibility: hidden;
        }
    }
    .player-enter-active, .recorder-enter-active {
        /*transition: opacity .3s ease;*/
        transition: all .3s ease-in;
    }
    .player-leave-active, .recorder-leave-active {
        transition: all .4s ease;
    }
    .player-enter
        /* .component-player-leave-active below version 2.1.8 */ {
        transform: translateX(80px);
        opacity: 0;
    }
    .player-leave-to {
        transform: translateX(-100px);
        opacity: 0;
    }
    .recorder-enter
        /* .component-fade-leave-active below version 2.1.8 */ {
        transform: translateX(-100px);
        opacity: 0;
    }
    .recorder-leave-to {
        transform: translateX(80px);
        opacity: 0;
    }
</style>
