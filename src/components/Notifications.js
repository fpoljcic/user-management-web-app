import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

let socket, stompClient;

const soundUrl = `https://ia800203.us.archive.org/14/items/slack_sfx/confirm_delivery.mp3`;
const notificationSound = new Audio(soundUrl);

const Notifications = (props) => {
    const [count, setCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [sel, setSel] = useState([]);

    useEffect(() => {
        socket = new SockJS('https://log-server-si.herokuapp.com/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            if (stompClient.connected) {
                stompClient.subscribe('/topic/user_management', (notif) => {
                    let notification = JSON.parse(notif.body);
                    notifications.unshift(notification);
                    sel.unshift(1);
                    setSel(sel);
                    setNotifications(notifications);
                    setCount(count + 1);
                    notify();
                });
            }
        }, (err) => {
            console.log('error pri konekciji ' + err);
        });

        return () => stompClient.disconnect();
    }, [count, notifications, sel]);

    const notify = () => {
        notificationSound.play();
    }

    const returnRightLink = (action) => {
        switch (action) {
            case "login":
                return "/dashboard/user_log";
            case "password_change":
                return "/dashboard/user_log";
            case "open_office":
                return "/dashboard/user_log";
            default:
                return "/dashboard/home";
        }
    }

    const returnRightPage = (action) => {
        switch (action) {
            case "login":
                return "6";
            case "password_change":
                return "6";
            case "open_office":
                return "6";
            default:
                return "1";
        }
    }

    return (
        <div>
            <Dropdown disabled={notifications.length === 0} overlay={
                <Menu>
                    {notifications.map((notif, index) =>
                        <Menu.Item key={index} onClick={() => {
                            props.setSelected(returnRightPage(notif.payload.action));
                            if (sel[index] === 0) {
                                // vec jednom selektovana
                                return;
                            }
                            setCount(count - 1);
                            sel[index] = 0;
                            setSel(sel);
                        }}>
                            <Link to={returnRightLink(notif.payload.action)}>
                                <div style={sel[index] === 0 ? { color: 'grey' } : { color: 'red' }}>
                                    <img alt="Notification type" height="20px" src={`/${notif.type}.png`} />
                                    {" " + notif.payload.description}
                                </div>
                            </Link>
                        </Menu.Item>
                    )}
                </Menu>
            }>
                <div>
                    <img alt="Bell" style={{ marginTop: '15px' }} height="40px" className="ant-menu-item" src={count === 0 ? "/bell.png" : "/bell2.png"} />
                    <div style={{ fontWeight: 'bold', color: count === 0 ? 'white' : 'red', marginTop: '-68px', marginLeft: '53px' }}>
                        {count}
                    </div>
                </div>
            </Dropdown>
        </div>
    )
}

export default Notifications;