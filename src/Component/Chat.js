import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Chat.css'
import { db } from '../Redux/Firebase';
import { useStateValue } from '../Redux/StateProvider';
import firebase from 'firebase/compat/app';

function Chat() {

    const [input, setInput] = useState('');
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const { roomId } = useParams();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapsort) => (
                setRoomName(snapsort.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy("timestamp", "asc")
                .onSnapshot((snapsort) => (
                    setMessages(snapsort.docs.map((doc) => doc.data()))
                ))
        }
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            messages: input,
            email: user.email
        })


        setInput('')
    }
    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    {
                        messages.length >= 1 ? <p>Last seen at {new Date(messages[messages.length - 1].timestamp?.toDate()).toUTCString()}</p> : ""
                    }

                    {/* <p>Last seen at {new Date(messages[messages.length - 1].timestamp?.toDate()).toUTCString()}</p> */}
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p key={message.timestamp} className={`chat__message ${message.email === user.email && "chat__reciever"}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.messages}
                        <span className='chat__timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}


            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>

                <form>
                    <input type="text" placeholder='Type a message' value={input} onChange={(e) => { setInput(e.target.value) }} />
                    <button type='submit' onClick={sendMessage}>Send a message</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>

            </div>
        </div>
    )
}

export default Chat