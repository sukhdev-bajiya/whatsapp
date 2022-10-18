import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { db } from '../Redux/Firebase'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
import { useStateValue } from '../Redux/StateProvider';

function Sidebar() {
    const [{ user }, dispatch] = useStateValue();
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapsort) =>
            setRooms(snapsort.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))
            )
        )

        return () => {
            unsubscribe()
        }
    }, []);

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton><DonutLarge /></IconButton>
                    <IconButton><Chat /></IconButton>
                    <IconButton><MoreVert /></IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat" />
                </div>

            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => <SidebarChat key={room.id} id={room.id} name={room.data.name} />)}
            </div>
        </div>
    )
}

export default Sidebar