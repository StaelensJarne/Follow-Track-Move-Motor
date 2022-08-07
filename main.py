def AllesAfwerken():
    basic.show_icon(IconNames.HAPPY)

def Aftellen(vanaf: number):
    index = 0
    while index <= vanaf:
        basic.show_string("" + str((vanaf - index)))
        index += 1

def on_button_pressed_a():
    Aftellen(3)
    DoeIets()
    AllesAfwerken()

input.on_button_pressed(Button.A, on_button_pressed_a)

def DoeIets():
    for index2 in range(4):
        basic.show_string("/")
        basic.pause(100)
        basic.show_string("\\")
        basic.pause(100)

AllesAfwerken()