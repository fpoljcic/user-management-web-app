import React, { useState, useEffect } from 'react';
import Img from 'react-image';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';



let socket, stompClient;

class Notifications extends React.Component{

    state = {
        allNotifications: [],
        visibility: true
    }
    constructor(props){
        super(props);
    }


    async componentWillMount(){
        
        socket = new SockJS('http://log-server-si.herokuapp.com/ws');
        stompClient = Stomp.over(socket);
    
        stompClient.connect({}, () => {
        if(stompClient.connected){
            
            stompClient.subscribe('/topic/warehouse', (msg) => {
                let data = JSON.parse(msg.body);
                console.log(data);
    
                let allNoti = this.state.allNotifications;
                allNoti.push(data);
                this.setState({allNotifications : allNoti});
                
              });
        }
          
        }, err => console.error(err));
    
        return () => stompClient.disconnect();
    }

    

  render(){
    var elements= [];
    var visible = true;
    var allElements = this.state.allNotifications;
    
    for(var i=0; i<allElements.length; i++){
       elements.push(<div value = {allElements[i]} />)
    }
    console.log(elements.length);
      
    return (
        <div>
            <div >
                <Img src = {require('../img/bell_icon.png')} width = '20px' height = '20px' />
                <div style= {{display: visible ? "visible" : "hidden"} }> 
                    {elements}
                </div>
            </div>
            
        </div>
        
      )
  }
  
}

export default Notifications;