import React, { useState, Fragment, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Friend from '../Friend/Friend'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setCurrentChat } from '../../../../store/actions/chat'
import Modal from '../../../Modal/Modal'
import ChatService from '../../../../services/chatService'
import './FriendList.scss'

const FriendList = () => {

    const dispatch = useDispatch()
    const chats = useSelector(state => state.chatReducer.chats)
    const socket = useSelector(state => state.chatReducer.socket)
    const user = useSelector(state => state.authReducer.user)

    const fileUpload = useRef()
    const msgInput = useRef()

    const [showFriendsModal, setShowFriendsModal] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const [showBroadcastModal, setShowBroadcastModal] = useState(false)
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')

    const openChat = (chat) => {
        dispatch(setCurrentChat(chat))
    }

    const searchFriends = (e) => {
        ChatService.searchUsers(e.target.value)
            .then(res => setSuggestions(res))
    }

    const handleMessage = (e) => {
        const value = e.target.value
        setMessage(value)

        // const receiver = {
        //     chatId: chat.id,
        //     fromUser: user,
        //     toUserId: chat.Users.map(user => user.id)
        // }

        // if (value.length === 1) {
        //     receiver.typing = true
        //     socket.emit('typing', receiver)
        // }

        // if (value.length === 0) {
        //     receiver.typing = false
        //     socket.emit('typing', receiver)
        // }

        // notify other users that this user is typing something
    }

    const handleKeyDown = (e, imageUpload) => {
        if (e.key === 'Enter') sendMessage(imageUpload)
    }

    const sendMessage = (imageUpload) => {

        if (message.length < 1) return

        const msg = {
            type: 'text',
            fromUser: user,
            message: message
        }

        setMessage('')
        setImage('')

        // send message with socket
        socket.emit('broadcast', msg)
    }

    const addNewFriend = (id) => {
        ChatService.createChat(id)
            .then(chats => {
                socket.emit('add-friend', chats)
                setShowFriendsModal(false)
            }).catch(err => console.log(err))
    }

    return (
        <div id='friends' className='shadow-light'>
            <div id='title'>
                <h3 className='m-0'>CHATters</h3>
                <button onClick={() => setShowFriendsModal(true)}>Search</button>
            </div>

            <hr />

            <div id='friends-box'>
                {
                    chats.length > 0
                        ? chats.map(chat => {
                            return <Friend click={() => openChat(chat)} chat={chat} key={chat.id} />
                        })
                        : <p id='no-chat'>No chats added</p>
                }
            </div>
            {
                showFriendsModal &&
                <Modal click={() => setShowFriendsModal(false)}>
                    <Fragment key='header'>
                        <h3 className='m-0'>Create new chat</h3>
                    </Fragment>

                    <Fragment key='body'>
                        <p>Find Other Users</p>
                        <input
                            onInput={e => searchFriends(e)}
                            type='text'
                            placeholder='Enter Name..'
                        />
                        <div id='suggestions'>
                            {
                                suggestions.map(user => {
                                    return <div key={user.id} className='suggestion'>
                                        <p className='m-0'>{user.firstName} {user.lastName}</p>
                                        <button onClick={() => addNewFriend(user.id)}>ADD</button>
                                    </div>
                                })
                            }
                        </div>
                    </Fragment>
                </Modal>
            }
        </div>
    )
}

export default FriendList