def AllesAfwerken():
    Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_LEFT)
    Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_RIGHT)
    basic.show_icon(IconNames.HAPPY)
def StartRechtsVooruit():
    Kitronik_Move_Motor.motor_on(Kitronik_Move_Motor.Motors.MOTOR_RIGHT,
        Kitronik_Move_Motor.MotorDirection.FORWARD,
        26)
def Aftellen(vanaf: number):
    index = 0
    while index <= vanaf:
        basic.show_string("" + str((vanaf - index)))
        index += 1

def on_button_pressed_a():
    Aftellen(3)
    StartRechtsVooruit()
    basic.pause(1000)
    AllesAfwerken()
input.on_button_pressed(Button.A, on_button_pressed_a)

def StartLinksVooruit():
    Kitronik_Move_Motor.motor_on(Kitronik_Move_Motor.Motors.MOTOR_LEFT,
        Kitronik_Move_Motor.MotorDirection.FORWARD,
        26)

def on_button_pressed_b():
    Aftellen(3)
    # Rechts starten door de motor links te draaien.
    StartRechtsVooruit()
    basic.pause(1000)
    Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_RIGHT)
    # Links starten door de motor rechts te draaien.
    StartLinksVooruit()
    basic.pause(1000)
    Kitronik_Move_Motor.motor_off(Kitronik_Move_Motor.Motors.MOTOR_LEFT)
    # Afwerken.
    AllesAfwerken()
input.on_button_pressed(Button.B, on_button_pressed_b)

def DoeIets(seconden: number):
    global maximumLoopTijd
    maximumLoopTijd = input.running_time() + seconden * 1000
    while input.running_time() < maximumLoopTijd:
        basic.show_string("/")
        basic.pause(100)
        basic.show_string("\\")
        basic.pause(100)
maximumLoopTijd = 0
AllesAfwerken()