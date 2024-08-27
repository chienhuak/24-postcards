import { makePlane, planesData } from "./earth3d.js"


// 頁面載入時，使用 JavaScript 建立 WebSocket 連線到 Server "/ws/queue" endpoint
const ws = new WebSocket('ws://127.0.0.1:8000/ws/queue')

ws.onopen = function(event) {
    console.log('已建立 WebSocket 通訊')
};

ws.onclose = function (e) {
	console.log('websocket 中斷: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
	console.log(e)
}

ws.onerror = function(e) {
    console.error('WebSocket 錯誤 :', e);
};

// 客户端在接收到 WebSocket 消息時，解析消息數據
ws.onmessage = async function(event) {
    const data = JSON.parse(event.data) //  WS Server 傳來的格式會是字串，如果 Server 傳來的格式直接是 JSON 未轉成字串的話，前後端都會報錯
	console.log('收到的待配對信件資料:', data);


	// 為每個待配對信件生成一個飛機動畫
	for (const item of data) {
		planesData.push(makePlane());
	}


}
