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
    DoeIets(10)
    AllesAfwerken()
})
function DoeIets (seconden: number) {
    maximumLoopTijd = input.runningTime() + seconden * 1000
    while (input.runningTime() < maximumLoopTijd) {
        basic.showString("/")
        basic.pause(100)
        basic.showString("\\")
        basic.pause(100)
    }
}
let maximumLoopTijd = 0
AllesAfwerken()
