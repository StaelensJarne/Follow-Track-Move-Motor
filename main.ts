function AllesAfwerken () {
    basic.showIcon(IconNames.Happy)
}
input.onButtonPressed(Button.A, function () {
    DoeIets()
    AllesAfwerken()
})
function DoeIets () {
    for (let index = 0; index < 4; index++) {
        basic.showString("/")
        basic.pause(100)
        basic.showString("\\")
        basic.pause(100)
    }
}
AllesAfwerken()
