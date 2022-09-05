// Tel van 4 tot 0 en verander telkens 1 LED van kleur.
function Aftellen () {
    for (let index = 0; index <= 4; index++) {
        // Kitronik_Move_Motor.ZipLedColors.GREEN = 65280
        moveMotorZIP.setZipLedColor(index, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green))
        moveMotorZIP.show()
        basic.pause(1000)
    }
}
// Waneer op knop A gedrukt word tel af en volg het spoor geduurende 10 seconden.
input.onButtonPressed(Button.A, function () {
    Aftellen()
    VolgSpoor(10)
    ZetMotorKlaar()
})
// Zet de :Move motor klaar voor hij de lijn zal volgen.
function ZetMotorKlaar () {
    moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
    // Kitronik_Move_Motor.ZipLedColors.BLUE = 255
    ZetMotorLichten(255)
    Kitronik_Move_Motor.stop()
}
// Bereken het verschil tussen de linkse en rechtse sensor.
function BerekenSensorVerschil () {
    sensorRechts = LeesLijnVolgSensorRechts()
    sensorLinks = LeesLijnVolgSensorLinks()
    sensorVerschil = Math.abs(sensorRechts - sensorLinks)
    return sensorVerschil
}
// Lees de waarde van de rechter lijnvolgsensor. Deze kan tussen de 0 en de 1023 liggen.
function LeesLijnVolgSensorRechts () {
    return Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
}
// De functie om het spoor te volgen.
function VolgSpoor (seconden: number) {
    let waardeVolgSpoor: number;
VolgSpoorTijd = input.runningTime() + seconden * 1000
    while (input.runningTime() < VolgSpoorTijd) {
        basic.showNumber(waardeVolgSpoor)
        waardeVolgSpoor = BerekenSensorVerschil()
        if (18 < waardeVolgSpoor && waardeVolgSpoor < 25) {
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 5)
        } else if (waardeVolgSpoor < 25) {
            Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 5)
        } else if (waardeVolgSpoor > 35) {
            Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 5)
        }
    }
    Kitronik_Move_Motor.stop()
}
// Waneer op knop B gedrukt wordt stop de :Move motor.
input.onButtonPressed(Button.B, function () {
    Kitronik_Move_Motor.stop()
})
// Zet de LEDs op een andere kleur. De waarden kan je terugvinden op: https://github.com/KitronikLtd/pxt-kitronik-zip-64/blob/master/zip64.ts.
function ZetMotorLichten (kleur: number) {
    moveMotorZIP.setColor(Kitronik_Move_Motor.colors(kleur))
    moveMotorZIP.show()
}
// Lees de waarde van de linker lijnvolgsensor. Deze kan tussen de 0 en de 1023 liggen.
function LeesLijnVolgSensorLinks () {
    return Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
}
let VolgSpoorTijd = 0
let sensorVerschil = 0
let sensorLinks = 0
let sensorRechts = 0
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
ZetMotorKlaar()
