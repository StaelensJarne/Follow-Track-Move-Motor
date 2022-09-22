def Aftellen():
    for index in range(5):
        basic.show_number(4 - index)
        moveMotorZIP.set_zip_led_color(index,
            Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.GREEN))
        moveMotorZIP.show()
        basic.pause(1000)

def on_button_pressed_a():
    Aftellen()
    VolgSpoor(25)
input.on_button_pressed(Button.A, on_button_pressed_a)

def LeesLijnVolgSensorRechts():
    return Kitronik_Move_Motor.read_sensor(Kitronik_Move_Motor.LfSensor.RIGHT)
def VolgSpoor(seconden: number):
    global maximumLoopTijd, sensorRechts, sensorLinks, sensorVerschil
    maximumLoopTijd = input.running_time() + seconden * 1000
    while input.running_time() < maximumLoopTijd:
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
    moveMotorZIP = Kitronik_Move_Motor.create_move_motor_zipled(4)
    ZetLEDLichten(255)
def ZetLEDLichten(kleur: number):
    moveMotorZIP.set_color(Kitronik_Move_Motor.colors(kleur))
    moveMotorZIP.show()
def LeesLijnVolgSensorLinks():
    return Kitronik_Move_Motor.read_sensor(Kitronik_Move_Motor.LfSensor.LEFT)
sensorVerschil = 0
sensorLinks = 0
sensorRechts = 0
maximumLoopTijd = 0
moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = None
ZetMoveMotorKlaar()