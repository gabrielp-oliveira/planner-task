import * as io from 'socket.io-client'
import api from '../api/api'

const socket_Client = io.io('http://localhost:8080/')


export function listenEvent(eventName, callBack){
    return socket_Client.on(eventName, callBack)
  }

export function emitEvent(eventName, data){
    return socket_Client.emit(eventName, data)
  }

