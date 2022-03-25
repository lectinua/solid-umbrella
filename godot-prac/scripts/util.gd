extends Node

onready var inputField = load('res://scenes/input.tscn')
onready var font = load("res://resources/font/spoqa.tres")

var timerDeltaArray: Array = []

func set_font(_node: Node, _size: int, _color: Color = Color.black):
	font.size = _size
	_node.set("custom_fonts/font", font)
	_node.add_color_override("font_color", _color)

func timer(_self: Node, _methodName: String, _time: float, _loop: bool = false, _force: bool = false):
	var timer = find(_self.get_children(), 'name', _methodName)
	if timer == null:
		timer = Timer.new()
		timer.set_name(_methodName)
		_self.add_child(timer)
	if _force or timer.is_stopped():
		if not timer.is_connected('timeout', _self, _methodName):
			timer.connect('timeout', _self, _methodName)
		timer.set_one_shot(not _loop)
		timer.set_wait_time(_time)
		timer.start()

# >> example
#func _on_TextureButton_pressed():
#	if title_label.modulate.a > 0:
#		util.timerDelta(self, '_to_alpha_zero', 1, true)
#
#func _to_alpha_zero(_delta):
#	if title_label.modulate.a > 0:
#		title_label.modulate.a -= _delta * 5
#	else:
#		util.stopTimer(self, '_to_alpha_zero', true)
func timerDelta(_self: Node, _methodName: String, _frame: int, _loop: bool = false, _force: bool = false):
	var timer = find(timerDeltaArray, 'name', _methodName)
	if timer == null:
		timer = TimerDelta.new(_self, _methodName, _frame, _loop)
		timerDeltaArray.append(timer)
	elif _force:
		timer.frame = 0
		
func stopTimer(_self: Node, _methodName: String, isDelta: bool = false):
	if isDelta:
		timerDeltaArray.erase(find(timerDeltaArray, 'name', _methodName))
	else:
		find(_self.get_children(), 'name', _methodName).stop()

func find(_array: Array, _getName: String, _findValue):
	for item in _array:
		if item.get(_getName) == _findValue:
			return item
			
func _process(_delta):
	for timer in timerDeltaArray:
		if timer.complete(_delta):
			timerDeltaArray.erase(timer)

class TimerDelta:
	var node: Node
	var name: String
	var frame: int = 0
	var waiting_frame: int
	var loop: bool
	
	func _init(_node: Node, _methodName: String, _waiting_frame: int, _loop: bool):
		self.node = _node
		self.name = _methodName
		self.waiting_frame = _waiting_frame
		self.loop = _loop
		
	func complete(_delta: float) -> bool:
		if waiting_frame > frame:
			frame += 1
			return false
		else:
			node.call(name, _delta)
			if loop:
				frame = 0
			return not loop

# no arg = infinity
func showInputField(wait4sec: String):
	var current = get_tree().get_current_scene()
	var input = find(current.get_children(), 'name', inputField.get_name())
	if input == null:
		input = inputField.instance()
		current.add_child(input)
		input.start2wait(wait4sec)
