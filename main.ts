function Info (tekst: string) {
	
}
function AllesAfwerken () {
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    basic.showIcon(IconNames.Happy)
}
function StartRechtsVooruit () {
    Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 26)
}
function Aftellen (vanaf: number) {
    for (let index = 0; index <= vanaf; index++) {
        basic.showString("" + (vanaf - index))
    }
}
input.onButtonPressed(Button.A, function () {
    Aftellen(3)
    StartRechtsVooruit()
    basic.pause(1000)
    AllesAfwerken()
})
function StartLinksVooruit () {
    Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 26)
}
input.onButtonPressed(Button.B, function () {
    Aftellen(3)
    Info("Rechts starten om de motor links te draaien.")
    StartRechtsVooruit()
    basic.pause(1000)
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    // Links starten door de motor rechts te draaien.
    StartLinksVooruit()
    basic.pause(1000)
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
    // Afwerken.
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
