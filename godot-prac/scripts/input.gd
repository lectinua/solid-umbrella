extends Node

onready var remain := $HBoxContainer/VBoxContainer/VBoxContainer/Label
onready var field := $HBoxContainer/VBoxContainer/VBoxContainer/LineEdit

var remain_sec: float = 60

func start2wait(_wait4sec: String):
	if _wait4sec != null:
		remain_sec = float(_wait4sec)
		util.timer(self, '_wait_for_sec', 1, true)
		util.set_font(remain, 30)
		remain.set_text(str(int(remain_sec)))
#
func _wait_for_sec():
	if remain_sec > 0:
		remain_sec -= 1
		remain.set_text(str(int(remain_sec)))
		if remain_sec <= 5:
			util.set_font(remain, 30, Color.red)
	else:
		util.stopTimer(self, '_wait_for_sec')
		next()

func _on_Button_button_down():
	Dialogic.set_variable('input.result', field.text)
	next()

func next():
	Dialogic.next_event()
	get_tree().get_current_scene().remove_child(self)
