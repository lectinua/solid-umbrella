extends Node

onready var title_label := $PanelContainer/Title
onready var util = get_node('/root/Util')

func _ready():
	set_title()

func set_title():
	var font = load("res://resources/font/spoqa.tres")
	font.size = 50
	title_label.set("custom_fonts/font", font)

func _on_TextureButton_pressed():
	if title_label.modulate.a > 0:
		util.timerDelta(self, '_to_alpha_zero', 1, true)
	
func _to_alpha_zero(_delta):
	if title_label.modulate.a > 0:
		title_label.modulate.a -= _delta * 5
	else:
		util.stopTimer(self, '_to_alpha_zero', true)
