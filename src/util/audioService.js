/* eslint-disable */
const recorder = () => new Promise(async (resolve) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    const audioChunks = []

    mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data)
    })

    const start = () => mediaRecorder.start()

    const stop = () => new Promise((resolve) => {
        mediaRecorder.addEventListener('stop', () => {
            let audioBlob = new Blob(audioChunks)
            let audioUrl = URL.createObjectURL(audioBlob)
            let audio = new Audio(audioUrl)
            let play = () => audio.play()
            resolve({ audioBlob, audioUrl, play })
        })

        mediaRecorder.stop()
    })

    resolve({ start, stop })
})

const dataURIToBlob = (dataURI) => {
    const BASE64_MARKER = ';base64,'
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const raw = atob(dataURI.substring(base64Index));
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for(let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }

    return new Blob([array], { type: 'audio/mp3' })
}

const getDuration = (audioEl) => new Promise ((resolve) => {
    audioEl.addEventListener('loadedmetadata', () => {
        // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
        if (audioEl.duration === Infinity) {
            audioEl.currentTime = Number.MAX_SAFE_INTEGER
            audioEl.ontimeupdate = () => {
                audioEl.ontimeupdate = null
                resolve(audioEl.duration)
                audioEl.currentTime = 0
            }
        }
        // Normal behavior
        else
            resolve(audioEl.duration)
    })
})

export default { recorder, dataURIToBlob, getDuration }