function Aftellen () {
    for (let index = 0; index <= 4; index++) {
        moveMotorZIP.setZipLedColor(index, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green))
        moveMotorZIP.show()
        basic.pause(1000)
    }
}
input.onButtonPressed(Button.A, function () {
    Aftellen()
    ZetMotorKlaar()
    VolgSpoor(10)
    ZetMotorKlaar()
})
function ZetMotorKlaar () {
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
    ZetMotorLichten(5)
}
function BerekenSensorVerschil () {
    sensorRechts = LeesLijnVolgSensorRechts()
    sensorLinks = LeesLijnVolgSensorLinks()
    sensorVerschil = Math.abs(sensorRechts - sensorLinks)
    return sensorVerschil
}
function LeesLijnVolgSensorRechts () {
    return Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
}
function VolgSpoor (seconden: number) {
    VolgSpoorTijd = input.runningTime() + seconden * 1000
    waardeVolgSpoor = 0
    ZetMotorLichten(1)
    while (input.runningTime() < VolgSpoorTijd) {
        basic.showNumber(waardeVolgSpoor)
        waardeVolgSpoor = BerekenSensorVerschil()
        if (25 < waardeVolgSpoor && waardeVolgSpoor < 35) {
            ZetMotorLichten(2)
        } else if (waardeVolgSpoor < 25) {
            ZetMotorLichten(3)
        } else if (waardeVolgSpoor > 35) {
            ZetMotorLichten(4)
        }
    }
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
    Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
}
function ZetMotorLichten (kleur: number) {
    moveMotorZIP.setColor(Kitronik_Move_Motor.colors(kleur))
    moveMotorZIP.show()
}
function LeesLijnVolgSensorLinks () {
    return Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
}
let waardeVolgSpoor = 0
let VolgSpoorTijd = 0
let sensorVerschil = 0
let sensorLinks = 0
let sensorRechts = 0
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
ZetMotorKlaar()
