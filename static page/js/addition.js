
// global attribute 

// user
var userNow = "default user";

$(document).ready(function(){
	// 加载scrollbar
	jQuery('.scrollbar-macosx').scrollbar();
	
	global.setMainPosition();
	global.updateChatScrollbar();	
	
	// webSocket 操作
//	start();
	//webSocket.send('2');
});

function Global(){};
Global.prototype.setMainPosition = function(){
	var paddingTop = ($(document).height() - $("#main").height()) / 2;
	
	$("#main").css("padding-top", paddingTop);
};	
Global.prototype.updateChatScrollbar = function (){
	// 设置chat-bd scrollbar 滑动条在最下面
	$(".chat-bd").scrollTop(10000000000);
};
var global = new Global();


// panel attribute
function Panel(){};
Panel.prototype.clickOptBut = function(){
	var menu = $(".panel-menu");
	if (menu.css("z-index") < 0) {
		menu.css("z-index",1000);
	}else{
		menu.css("z-index",-1000);
	}
};
Panel.prototype.searchFriend = function(){
	var keyword = $("#search-keyword").val();
	
	if (keyword != "") {
		$("#search-result").css("z-index", 1000);
	}else{
		$("#search-result").css("z-index", -1000);
	}
};
Panel.prototype.createFriendItem = function(username){
	var item = document.getElementById("tp_friend_item").querySelector("div").cloneNode(true);
	
	item.id = "fi-" + username;
	item.querySelector("span").innerHTML = username;
	
	var list = document.querySelector('#friend-list-content');
	
	list.insertBefore(item, list.childNodes[2]);
	
	return item;
}
Panel.prototype.createChatItem = function(_i_id){
	var username = _i_id.substring(3);
	var type = _i_id.substring(0,2);
	
	var item = document.getElementById("tp_chat_item").querySelector("div").cloneNode(true);
	item.id = "ci-" + _i_id;
	item.querySelector("span").innerHTML = username;
	if (type == "gi") {
		item.querySelector("img").src = "img/default_group.png";
	}
	
	var list = document.querySelector('#chat-list-content');
	
	list.insertBefore(item, list.childNodes[2]);
	
	return item;
};
Panel.prototype.openChat = function(_i_id){
	var username = _i_id.substring(3);
	
	var item = $("#chat-list-content").children("#ci-" + _i_id)[0];	
	if (item == null) {
		item = this.createChatItem(_i_id);
	}
	// 跳转到chat页面
	tabCtrl.showChat();
	
	// item 操作
	this.openChatArea("ci-" + _i_id);
};
Panel.prototype.showChatAreaItem = function(username){
	var mcid = "mc-" + username;
	
	document.getElementById("member_name").innerHTML = username;
	document.getElementById("title_text").innerHTML = username;
	
	var items = $("#message_container_list").children();
	for (var i = 0; i < items.length; i++) {
		if (items[i].id == mcid) {
			items[i].style.display = "block";
		}else{
			items[i].style.display = "none";
		}
	}
	
	this.currentMessageContainer = mcid;
};
Panel.prototype.createChatAreaItem = function(username){ 
	
	var item = document.getElementById("tp_message_container").querySelector("div").cloneNode(true);
	
	item.id = "mc-" + username;
	
	document.getElementById('message_container_list').appendChild(item);
	
	return item;
};
Panel.prototype.openChatArea = function(ci__i_id){
	var username = ci__i_id.substring(6);
	
	var item = $("#message_container_list").children("#mc-" + username)[0];
	if (item == null) {
		item = this.createChatAreaItem(username);
	}
	
	// 显示该 chatAreaItem
	this.showChatAreaItem(username);
	
	// 更新 chatScrollbar
	global.updateChatScrollbar();
	
	// 修改点击效果	background: #3a3f45; outline: none; 
	var items = $("#chat-list-content").children();
	for (var i = 1; i < items.length; i++) {
		if (items[i].id == ci__i_id) {
			$("#" + items[i].id).css("background", "#3a3f45");
		}else{
			$("#" + items[i].id).css("background", "#2e3238");
		}
	}
};
Panel.prototype.currentMessageContainer = "";
var panel = new Panel(); 

function TabCtrl(){};
TabCtrl.prototype.currentTab = 1;
TabCtrl.prototype.showChat = function(){
	if (this.currentTab != 1) {
		$(".tab-chat").css("background-position", "-185px -96px");
		$(".tab-group").css("background-position", "-376px -322px");
		$(".tab-friends").css("background-position", "-220px -96px");
		
		$("#chat-list").css("position", "relative");
		$("#chat-list").css("z-index", 100);
		$("#friend-list").css("position", "absolute");
		$("#friend-list").css("z-index", -100);
		$("#group-list").css("position", "absolute");
		$("#group-list").css("z-index", -100);
		
		this.currentTab = 1;
	}
};
TabCtrl.prototype.showFriends = function(){
	if (this.currentTab != 2) {
		$(".tab-chat").css("background-position", "-150px -96px");
		$(".tab-group").css("background-position", "-376px -322px");
		$(".tab-friends").css("background-position", "-304px -246px");
		
		$("#chat-list").css("position", "absolute");
		$("#chat-list").css("z-index", -100);
		$("#friend-list").css("position", "relative");
		$("#friend-list").css("z-index", 100);
		$("#group-list").css("position", "absolute");
		$("#group-list").css("z-index", -100);
		
		this.currentTab = 2;
	}
};
TabCtrl.prototype.showGroup = function(){
	if (this.currentTab != 3) {
		$(".tab-chat").css("background-position", "-150px -96px");
		$(".tab-group").css("background-position", "-304px -281px");
		$(".tab-friends").css("background-position", "-220px -96px");
		
		$("#chat-list").css("position", "absolute");
		$("#chat-list").css("z-index", -100);
		$("#friend-list").css("position", "absolute");
		$("#friend-list").css("z-index", -100);
		$("#group-list").css("position", "relative");
		$("#group-list").css("z-index", 100);
		
		this.currentTab = 3;
	}
};
var tabCtrl = new TabCtrl();


// chatArea attribute
function ChatArea(){};
ChatArea.prototype.isTitleClicked = false;
ChatArea.prototype.clickTitle = function(){
	if (!this.isTitleClicked) {
		$(".title-but").css("background-position", "-477px -55px");
		$(".chatroom_members").css("z-index", 100);

		this.isTitleClicked = true;
	}else{
		$(".title-but").css("background-position", "-477px -65px");
		$(".chatroom_members").css("z-index", -100);

		this.isTitleClicked = false;
	}
};
ChatArea.prototype.sendMsg = function(){ 
	 
	var myMsg = document.getElementById("tp_message_me").querySelector("div").cloneNode(true);
	var msg = document.getElementById("send_content").value;
	var currentMessageContainer = panel.currentMessageContainer;
	
	if (msg != "") {
		myMsg.querySelector('pre').innerHTML = msg;
		
		if (currentMessageContainer != "") {
			document.getElementById(currentMessageContainer).appendChild(myMsg);
			
			var username = currentMessageContainer.substring(3);
			// 0:xyy:zxc:msg	type = 0; 单发 type = 1; 群发
			var sendMsg = "0:" + "me:" + username + ":" + msg;
			webSocket.send(sendMsg);
		} else{
			alert("请选择聊天对象");
		}
		
		// 更新 chatScrollbar
		global.updateChatScrollbar();
		
		// 清空 textarea
		document.getElementById("send_content").value = "";
	}
};
ChatArea.prototype.sendSocketMsg = function(msg){ 
	var myMsg = document.getElementById("tp_message_me").querySelector("div").cloneNode(true);
	var currentMessageContainer = panel.currentMessageContainer;
	
	myMsg.querySelector('pre').innerHTML = msg;
	document.getElementById(currentMessageContainer).appendChild(myMsg);
	
	// 更新 chatScrollbar
	global.updateChatScrollbar();
}
var chatArea = new ChatArea();

$(document).bind("keypress", function(e){
	var keyCode = e.keyCode || e.which || e.charCode;
    var ctrlKey = e.ctrlKey || e.metaKey;
    
    if(ctrlKey && keyCode == 10) {
        chatArea.sendMsg();
    }
});

function SocketAction(){};
SocketAction.prototype.updateOnlineUsers = function(users){
	for (var i = 0; i < users.length; i++) {
		panel.createFriendItem(users[i]);
	}
};
var socketAction = new SocketAction();


// WebSocket
var webSocket = new WebSocket('ws://localhost:8080/ChatOnline/websocket');

webSocket.onerror = function(event) {
	onError(event)
};
 
webSocket.onopen = function(event) {
	onOpen(event)
};

webSocket.onclose = function(event){
	
}
 
function onOpen(event) {
	console.log("Connection established")
}
 
function onError(event) {
	alert(event.data);
}
 
/* 核心方法 */
webSocket.onmessage = function(event) {
	onMessage(event);
};
 
function onMessage(event) {
	var response = event.data;
	
	if (response.substring(0.1) == "2") {
	// 返回 type:response type=2返回 userList
	var usersStr = response.substring(1);
	var users = usersStr.split(":");
	
	socketAction.updateOnlineUsers(users);
	}else if (response.substring(0.1) == "0" || response.substring(0.1) == "1") {
		// 返回 type:sender:msg
		var strs = usersStr.split(":", 3);
		var username = strs[1];
		var message = strs[2];
		
		// 打开chat
		panel.openChat("_i" + username);
		chatArea.sendSocketMsg(message);
	}else{
		
	}
}

function start() {
  webSocket.send('2');
  return false;
}