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

export default { recorder }