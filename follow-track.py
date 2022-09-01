def Aftellen():
    for index in range(5):
        moveMotorZIP.set_zip_led_color(index,
            Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.GREEN))
        moveMotorZIP.show()
        basic.pause(1000)

def ZetMotorKlaar():
    global moveMotorZIP
    Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_LEFT)
    Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_RIGHT)
    moveMotorZIP = Kitronik_Move_Motor.create_move_motor_zipled(4)
    ZetMotorLichten(5)

def on_button_pressed_a():
    Aftellen()
    ZetMotorKlaar()
    VolgSpoor(10)
    ZetMotorKlaar()

input.on_button_pressed(Button.A, on_button_pressed_a)

def BerekenSensorVerschil():
    sensorRechts = LeesLijnVolgSensorRechts()
    sensorLinks = LeesLijnVolgSensorLinks()
    sensorVerschil = abs(sensorRechts - sensorLinks)
    return sensorVerschil

def LeesLijnVolgSensorRechts():
    return Kitronik_Move_Motor.read_sensor(Kitronik_Move_Motor.LfSensor.RIGHT)

def LeesLijnVolgSensorLinks():
    return Kitronik_Move_Motor.read_sensor(Kitronik_Move_Motor.LfSensor.LEFT)

def VolgSpoor(seconden: number):
    global VolgSpoorTijd, waardeVolgSpoor
    VolgSpoorTijd = input.running_time() + seconden * 1000
    waardeVolgSpoor = 0
    ZetMotorLichten(1)
    while input.running_time() < VolgSpoorTijd:
        basic.show_number(waardeVolgSpoor)
        waardeVolgSpoor = BerekenSensorVerschil()
        if 25 < waardeVolgSpoor and waardeVolgSpoor < 35:
            ZetMotorLichten(2)
        elif waardeVolgSpoor < 25:
            ZetMotorLichten(3)
        elif waardeVolgSpoor > 35:
            ZetMotorLichten(4)
    Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_LEFT)
    Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_RIGHT)

def ZetMotorLichten(kleur: number):
    moveMotorZIP.set_color(Kitronik_Move_Motor.colors(kleur))
    moveMotorZIP.show()

waardeVolgSpoor = 0
VolgSpoorTijd = 0
sensorVerschil = 0
sensorLinks = 0
sensorRechts = 0
moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = None
ZetMotorKlaar()