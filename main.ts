function Info (tekst: string) {
	
}
function AllesAfwerken () {
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    basic.showIcon(IconNames.Happy)
}
function BeweegVooruit (seconden: number) {
    maximumLoopTijd = input.runningTime() + seconden * 1000
    StartLinksVooruit()
    StartRechtsVooruit()
    while (input.runningTime() < maximumLoopTijd) {
        basic.showString("/")
        basic.showString("\\")
    }
}
function VolgSpoorRechts () {
    Info("Rechter sensor loopt boven het spoor?")
    if (Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right) == 1 || Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right) == 0) {
        rechterSensorZietWit = false
        StartLinksVooruit()
    } else {
        rechterSensorZietWit = true
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    }
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
    BeweegVooruit(2)
    AllesAfwerken()
})
function StartLinksVooruit () {
    Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 26)
}
function VolgSpoor (seconden: number) {
    maximumLoopTijd = input.runningTime() / (seconden * 1000)
    blijfRijden = true
    while (blijfRijden) {
        Info("Motoren Aansturen")
        VolgSpoorLinks()
        VolgSpoorRechts()
        Info("Stop waneer de tijd op is")
        if (input.runningTime() >= maximumLoopTijd) {
            blijfRijden = false
        }
        Info("Stop waneer het spoor onzichtbaar is")
        if (linkerSensorZietWit && rechterSensorZietWit) {
            blijfRijden = false
        }
    }
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
}
input.onButtonPressed(Button.B, function () {
    Aftellen(3)
    VolgSpoor(10)
})
function VolgSpoorLinks () {
    Info("Linker sensor loopt boven het spoor?")
    if (Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left) == 1 || Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left) == 0) {
        linkerSensorZietWit = false
        StartRechtsVooruit()
    } else {
        linkerSensorZietWit = true
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
    }
}
function DoeIets (seconden: number) {
    maximumLoopTijd = input.runningTime() + seconden * 1000
    while (input.runningTime() < maximumLoopTijd) {
        basic.showString("/")
        basic.pause(100)
        basic.showString("\\")
        basic.pause(100)
    }
}
let linkerSensorZietWit = false
let blijfRijden = false
let rechterSensorZietWit = false
let maximumLoopTijd = 0
AllesAfwerken()
