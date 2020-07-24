import React,{ useState, useEffect } from 'react';
import SideBar from '../SideBar/SideBar'
import Input from '../Input/Input'
import './Chat.css';
import Header from '../Header/Header'
import Messages from '../Messages/Messages';
import io from "socket.io-client"
import queryString from 'query-string'

/**
 * This is the component that is the main Chat page
 * It is build of the sidebar, chatmessage section and Input text section
 */

let socket;

const Chat = ({location}) => {
	const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	 const ENDPOINT = 'https://dry-tor-59504.herokuapp.com/';
	
	useEffect(() => {
		/**
		 * once component loads
		 * get name from url
		 */
    const { name } = queryString.parse(location.search);
    socket = io(ENDPOINT);
		setName(name);

    socket.emit('join', { name}, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
		socket.on('message', message => {
			//add incoming message to messages list
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};

	return (
		<div className="outerContainer">
			<div className="container">
				<Header />
				 <Messages messages={messages} name={name} />
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
			<SideBar users={users} />
		</div>
	);
};

export default Chat;