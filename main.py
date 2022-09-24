def LusVolgSpoor(seconden: number):
    global maximumLoopTijd
    maximumLoopTijd = input.running_time() + seconden * 1000
    while input.running_time() < maximumLoopTijd:
        basic.pause(5)
        VolgSpoor()
def Aftellen():
    for index in range(4):
        basic.show_number(3 - index)
        moveMotorZIP.set_zip_led_color(index,
            Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.GREEN))
        moveMotorZIP.show()
        basic.pause(1000)

def on_button_pressed_a():
    Aftellen()
    ZetLEDLichten(65280)
    basic.show_icon(IconNames.HOUSE)
    LusVolgSpoor(5)
    ZetMoveMotorKlaar()
input.on_button_pressed(Button.A, on_button_pressed_a)

def LeesLijnVolgSensorRechts():
    return Kitronik_Move_Motor.read_sensor(Kitronik_Move_Motor.LfSensor.RIGHT)
def VolgSpoor():
    global sensorRechts, sensorLinks, sensorVerschil
    sensorRechts = LeesLijnVolgSensorRechts()
    sensorLinks = LeesLijnVolgSensorLinks()
    sensorVerschil = abs(sensorLinks - sensorRechts)
    if sensorVerschil > 10:
        if sensorLinks > sensorRechts:
            Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_RIGHT)
            Kitronik_Move_Motor.motor_on(Kitronik_Move_Motor.Motors.MOTOR_LEFT,
                Kitronik_Move_Motor.MotorDirection.FORWARD,
                1)
        else:
            Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_LEFT)
            Kitronik_Move_Motor.motor_on(Kitronik_Move_Motor.Motors.MOTOR_RIGHT,
                Kitronik_Move_Motor.MotorDirection.FORWARD,
                1)
    else:
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.FORWARD, 1)
def ZetMoveMotorKlaar():
    global moveMotorZIP
    basic.show_icon(IconNames.HAPPY)
    moveMotorZIP = Kitronik_Move_Motor.create_move_motor_zipled(4)
    ZetLEDLichten(255)
def ZetLEDLichten(kleur: number):
    moveMotorZIP.clear()
    moveMotorZIP.set_color(Kitronik_Move_Motor.colors(kleur))
    moveMotorZIP.show()
def LeesLijnVolgSensorLinks():
    return Kitronik_Move_Motor.read_sensor(Kitronik_Move_Motor.LfSensor.LEFT)
sensorVerschil = 0
sensorLinks = 0
sensorRechts = 0
moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = None
maximumLoopTijd = 0
ZetMoveMotorKlaar()