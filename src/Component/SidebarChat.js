import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../Redux/Firebase'
import './SidebarChat.css'

function SidebarChat({ id, name, addNewChat }) {

    const [messages, setMessages] = useState("")

    const createChat = () => {
        const roomName = prompt('Please enter name for chat room')

        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    useEffect(() => {
        if (id) {
            db.collection('rooms').doc(id).collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data()))
                )
        }
    }, [id]);

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    {messages[0]?.messages ? <p style={{ color: "grey" }}>{messages[0]?.messages.slice(0, 25)}...</p> : ""}
                </div>
            </div>
        </Link>
    ) :
        (
            <div onClick={createChat} className='sidebarChat'>
                <h2>Add new Chat</h2>
            </div>
        )
}

export default SidebarChat