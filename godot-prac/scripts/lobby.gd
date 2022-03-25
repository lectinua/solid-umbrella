extends Node2D

func _ready():
	test_dialog()
	
func test_dialog():
	var dialog = Dialogic.start('test')
	add_child(dialog)
