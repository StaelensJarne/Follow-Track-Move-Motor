function AllesAfwerken () {
    basic.showIcon(IconNames.Happy)
}
function Aftellen (vanaf: number) {
    for (let index = 0; index <= vanaf; index++) {
        basic.showString("" + (vanaf - index))
    }
}
input.onButtonPressed(Button.A, function () {
    Aftellen(3)
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
