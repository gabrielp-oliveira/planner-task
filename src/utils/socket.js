import * as io from 'socket.io-client'

const socket_Client = io.io(process.env.REACT_APP_SERVER_URL?process.env.REACT_APP_SERVER_URL+"/":'http://localhost:8080/')

export function listenEvent(eventName, callBack){
    return socket_Client.on(eventName, callBack)
  }

export function emitEvent(eventName, data){
    return socket_Client.emit(eventName, data)
  }
export function RemoveEvent(eventName, a){
    return socket_Client.off(eventName)
  }

