import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [{ user, dispatch }] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapsot => (
            setRooms(snapsot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ));
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ForumIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search a chat" type="text" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
