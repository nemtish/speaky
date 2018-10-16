// DeanMarkTaylor pen
// ref: https://codepen.io/DeanMarkTaylor/pen/RMRaJX?editors=1011
const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
        const successful = document.execCommand('copy')
        const msg = successful ? 'successful' : 'unsuccessful'
        console.log(`Fallback: Copying text command was ${msg}`)
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
}
const copyTextToClipboard = (text) => {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text)
        return
    }
    navigator.clipboard.writeText(text).then(() => {
        console.log('Async: Copying to clipboard was successful!')
    },
    (err) => {
        console.error('Async: Could not copy text: ', err)
    })
}

export default { copyTextToClipboard }
