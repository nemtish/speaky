<!--eslint-disable-->
<template>
    <div class="audio-player">
        <player v-if="showPlayer" :audio-data="audioData" />

        <div v-if="showPlayer" class="audio-player--buttons">
            <span
                class="btn"
                @click="copyLinkClickHandler">{{ btnText }}</span>
        </div>
    </div>
</template>
<!--eslint-enable-->
<script>
import { LOAD_AUDIO } from '../../config/constants'
import Player from '../PlayAudio.vue'
import audioService from '../../util/audioService'
import documentAction from '../../util/clipboard'

export default {
    name: 'AudioPlayer',
    components: {
        Player
    },
    data () {
        return {
            audioData: null,
            showPlayer: false,
            btnText: 'Copy link'
        }
    },
    created () {
        this.getAudioData().then(async (data) => {
            const blob = audioService.dataURIToBlob(data.binary)
            const audioUrl = URL.createObjectURL(blob)
            this.audioData = {}
            this.audioData.audio = new Audio(audioUrl)
            this.audioData.duration = data.duration
            this.showPlayer = true
        })
    },
    methods: {
        getAudioData () {
            return this.$store.dispatch(LOAD_AUDIO, this.$route.params.hash)
        },
        copyLinkClickHandler () {
            documentAction.copyTextToClipboard(window.location.origin + this.$route.fullPath)
            this.btnText = 'Copied!'

            setTimeout(() => {
                this.btnText = 'Copy link'
            }, 1000)
        }
    }
}
</script>

<style lang="scss" scoped>
    .audio-player {
        display: flex;
        flex-direction: column;
        height: 600px;
        align-items: center;
        justify-content: space-around;
    }
    .audio-player--buttons {
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
    .btn {
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
</style>
