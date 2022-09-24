function LusVolgSpoor (seconden: number) {
    maximumLoopTijd = input.runningTime() + seconden * 1000
    while (input.runningTime() < maximumLoopTijd) {
        basic.pause(5)
        VolgSpoor()
    }
}
function Aftellen () {
    for (let index = 0; index <= 3; index++) {
        basic.showNumber(3 - index)
        moveMotorZIP.setZipLedColor(index, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green))
        moveMotorZIP.show()
        basic.pause(1000)
    }
}
input.onButtonPressed(Button.A, function () {
    Aftellen()
    ZetLEDLichten(65280)
    basic.showIcon(IconNames.House)
    LusVolgSpoor(55)
    ZetMoveMotorKlaar()
})
function LeesLijnVolgSensorRechts () {
    return Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
}
function VolgSpoor () {
    sensorRechts = LeesLijnVolgSensorRechts()
    sensorLinks = LeesLijnVolgSensorLinks()
    sensorVerschil = Math.abs(sensorLinks - sensorRechts)
    if (sensorVerschil > 10) {
        if (sensorLinks > sensorRechts) {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 1)
        } else {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 1)
        }
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 1)
    }
}
function ZetMoveMotorKlaar () {
    basic.showIcon(IconNames.Happy)
    moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
    ZetLEDLichten(255)
}
function ZetLEDLichten (kleur: number) {
    moveMotorZIP.setColor(Kitronik_Move_Motor.colors(kleur))
    moveMotorZIP.show()
}
function LeesLijnVolgSensorLinks () {
    return Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
}
let sensorVerschil = 0
let sensorLinks = 0
let sensorRechts = 0
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
let maximumLoopTijd = 0
ZetMoveMotorKlaar()
