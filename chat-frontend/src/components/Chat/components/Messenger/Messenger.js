import React from 'react'
import { useSelector } from 'react-redux'
import ChatHeader from '../ChatHeader/ChatHeader'
import MessageBox from '../MessageBox/MessageBox'
import MessageInput from '../MessageInput/MessageInput'
import './Messenger.scss'

const Messenger = () => {

    const chat = useSelector(state => state.chatReducer.currentChat)

    const activeChat = () => {
        return Object.keys(chat).length > 0
    }

    return (
        <div id='messenger' className='shadow-light'>
            {
                activeChat()
                    ? <div id='messenger-wrap'>
                        <ChatHeader chat={chat} />
                        <hr />
                        <MessageBox chat={chat} />
                        <MessageInput chat={chat} />
                    </div>
                    // : <p>No active chat</p>
                    : 
                    <div className='welcome-msg'>
                        <h1>Hello there!</h1>
                        <h2>Welcome to CHATterBOX</h2>
                        <h3>A full stack real time chat application using ReactJS, NodeJS, Express, PostgreSQL and Socket.io.
                            This was a collaborative project where we worked in a team of two.</h3>
                        <h4><strong>Anirban Das and Debadrita Roy</strong></h4>
                        <h6>and chhana</h6>
                        <h5>Thanks!</h5>
                    </div>    
            }
        </div>
    )
}

export default Messenger