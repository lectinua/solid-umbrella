import watch from 'node-watch'
import build from './build'

const INTERVAL: number = 3

let remove: boolean = false
let timer: NodeJS.Timer | undefined = undefined
let remain: number = INTERVAL

watch('./src/', { recursive: true }, (eventType, filePath) => {
    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
    console.log(`${eventType}: ${filePath}`)

    if (eventType === 'remove') {
        remove = true
    }

    rebuild()
})

function rebuild() {
    remain = INTERVAL + 1
    if (timer !== undefined) {
        clearInterval(timer)
    }

    timer = setInterval(() => {
        remain -= 1
        if (remain == 0) {
            build(remove)
            remove = false
            if (timer !== undefined) {
                clearInterval(timer)
                timer = undefined
            }
        } else {
            process.stdout.clearLine(0)
            process.stdout.cursorTo(0)
            process.stdout.write(`waiting for build...${remain}`)
        }
    }, 1000)
}