# Tel van 4 tot 0 en verander telkens 1 LED van kleur.
def Aftellen():
    for index in range(5):
        # Kitronik_Move_Motor.ZipLedColors.GREEN = 65280
        moveMotorZIP.set_zip_led_color(index,
            Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.GREEN))
        moveMotorZIP.show()
        basic.pause(1000)
# Waneer op knop A gedrukt word tel af en volg het spoor geduurende 10 seconden.

def on_button_pressed_a():
    Aftellen()
    VolgSpoor(10)
    ZetMotorKlaar()
input.on_button_pressed(Button.A, on_button_pressed_a)

# Zet de :Move motor klaar voor hij de lijn zal volgen.
def ZetMotorKlaar():
    global moveMotorZIP
    moveMotorZIP = Kitronik_Move_Motor.create_move_motor_zipled(4)
    # Kitronik_Move_Motor.ZipLedColors.BLUE = 255
    ZetMotorLichten(255)
    Kitronik_Move_Motor.stop()
# Bereken het verschil tussen de linkse en rechtse sensor.
def BerekenSensorVerschil():
    global sensorRechts, sensorLinks, sensorVerschil
    sensorRechts = LeesLijnVolgSensorRechts()
    sensorLinks = LeesLijnVolgSensorLinks()
    sensorVerschil = abs(sensorRechts - sensorLinks)
    return sensorVerschil
# Lees de waarde van de rechter lijnvolgsensor. Deze kan tussen de 0 en de 1023 liggen.
def LeesLijnVolgSensorRechts():
    return Kitronik_Move_Motor.read_sensor(Kitronik_Move_Motor.LfSensor.RIGHT)
# De functie om het spoor te volgen.
def VolgSpoor(seconden: number):
    global VolgSpoorTijd
    VolgSpoorTijd = input.running_time() + seconden * 1000
    while input.running_time() < VolgSpoorTijd:
        basic.show_number(waardeVolgSpoor)
        waardeVolgSpoor = BerekenSensorVerschil()
        if 18 < waardeVolgSpoor and waardeVolgSpoor < 25:
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.FORWARD, 5)
        elif waardeVolgSpoor < 25:
            Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.LEFT, 5)
        elif waardeVolgSpoor > 35:
            Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.RIGHT, 5)
    Kitronik_Move_Motor.stop()
# Waneer op knop B gedrukt wordt stop de :Move motor.

def on_button_pressed_b():
    Kitronik_Move_Motor.stop()
input.on_button_pressed(Button.B, on_button_pressed_b)

# Zet de LEDs op een andere kleur. De waarden kan je terugvinden op: https://github.com/KitronikLtd/pxt-kitronik-zip-64/blob/master/zip64.ts.
def ZetMotorLichten(kleur: number):
    moveMotorZIP.set_color(Kitronik_Move_Motor.colors(kleur))
    moveMotorZIP.show()
# Lees de waarde van de linker lijnvolgsensor. Deze kan tussen de 0 en de 1023 liggen.
def LeesLijnVolgSensorLinks():
    return Kitronik_Move_Motor.read_sensor(Kitronik_Move_Motor.LfSensor.LEFT)
VolgSpoorTijd = 0
sensorVerschil = 0
sensorLinks = 0
sensorRechts = 0
moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = None
ZetMotorKlaar()