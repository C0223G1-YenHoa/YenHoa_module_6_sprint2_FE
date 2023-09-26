import React, { useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { NotificationContainer, NotificationManager } from 'react-notifications';

var stompClient = null;
const ChatRoom = () => {
    const [message, setMessage] = useState();

    useEffect(() => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
        console.log("123456");
    }, []);

    useEffect(() => {

    }, [message])

    const onConnected = () => {
        stompClient.subscribe('/user/'+ +'/private', onMessageReceived);
        console.log("123456");
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        setMessage(payloadData.message);
        console.log(message);
    }

    console.log(message);
    const onError = (err) => {
        console.log(err);

    }

    const createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };

    return (
        <div className="container">
            {
                message ? message : ""
            }
            <NotificationContainer />
        </div>

    )
}

export default ChatRoom