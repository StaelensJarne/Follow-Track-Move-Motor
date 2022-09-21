// Tel van 4 tot 0 en verander telkens 1 LED van kleur.
function Aftellen () {
    for (let index = 0; index <= 4; index++) {
        basic.showNumber(4 - index)
        // Kitronik_Move_Motor.ZipLedColors.GREEN = 65280
        moveMotorZIP.setZipLedColor(index, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Green))
        moveMotorZIP.show()
        basic.pause(500)
    }
}
// Waneer op knop A gedrukt word tel af en volg het spoor geduurende 10 seconden.
input.onButtonPressed(Button.A, function () {
    Aftellen()
    VolgSpoor(5)
    ZetMoveMotorKlaar()
})
// Lees de waarde van de rechter lijnvolgsensor. Deze kan tussen de 0 en de 1023 liggen.
function LeesLijnVolgSensorRechts () {
    return Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
}
// De functie om het spoor te volgen.
function VolgSpoor (seconden: number) {
    let maximumLoopTijd = 0
    while (maximumLoopTijd >= seconden) {
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
}
// Zet de :Move motor klaar voor hij de lijn zal volgen.
function ZetMoveMotorKlaar () {
    moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
    // Kitronik_Move_Motor.ZipLedColors.BLUE = 255
    ZetMotorLichten(255)
}
// Zet de LEDs op een andere kleur. De waarden kan je terugvinden op: https://github.com/KitronikLtd/pxt-kitronik-zip-64/blob/master/zip64.ts.
function ZetMotorLichten (kleur: number) {
    moveMotorZIP.setColor(Kitronik_Move_Motor.colors(kleur))
    moveMotorZIP.show()
}
// Lees de waarde van de linker lijnvolgsensor. Deze kan tussen de 0 en de 1023 liggen.
function LeesLijnVolgSensorLinks () {
    return Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
}
let sensorVerschil = 0
let sensorLinks = 0
let sensorRechts = 0
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
ZetMoveMotorKlaar()
