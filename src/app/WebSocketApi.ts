import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MainComponent } from './main/main.component';

export class WebSocketAPI {
    webSocketEndPoint: string = 'https://techlog-backend.herokuapp.com/ws';
    notify: string = "/notification/changes";
    stompClient: any;
    mainComponent: MainComponent;
    constructor(mainComponent: MainComponent){
        this.mainComponent = mainComponent;
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        this.stompClient.debug = () => {};
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.notify, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message) {
        console.log("calling notify api via web socket");
        this.stompClient.send("/app/notify", {"token": "aksjdh7h&jhbJ@^jhb"}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        //console.log("Message Recieved from Server :: " + message.body);
        // check for wrong headers
        if(message.body != "Unauthorized")
            this.mainComponent.handleMessage(JSON.parse(message.body));
    }
}