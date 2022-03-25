extends Node

onready var title_label := $PanelContainer/Title
#onready var util = get_node('/root/util')

func _ready():
	set_title()

func set_title():
	util.set_font(title_label, 50, Color.white)

func _on_TextureButton_pressed():
	if title_label.modulate.a > 0:
		util.timerDelta(self, '_to_alpha_zero', 1, true)
	
func _to_alpha_zero(_delta):
	if title_label.modulate.a > 0:
		title_label.modulate.a -= _delta * 5
	else:
		util.stopTimer(self, '_to_alpha_zero', true)
		get_tree().change_scene("res://scenes/lobby.tscn")
