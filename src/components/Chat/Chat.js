import React, { useState, useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import Input from '../Input/Input';
import './Chat.css';
import Header from '../Header/Header';
import Messages from '../Messages/Messages';
import io from 'socket.io-client';
import queryString from 'query-string';
import axios from 'axios';

/**
 * This is the component that is the main Chat page
 * It is build of the sidebar, chatmessage section and Input text section
 */

let socket;

const Chat = ({ location, history }) => {
	const [ name, setName ] = useState('');
	const [ users, setUsers ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ messages, setMessages ] = useState([]);

	const ENDPOINT = process.env.REACT_APP_BASE_API_URL;

	useEffect(() => {
		(async () => {
			try {
				const { name } = queryString.parse(location.search);
				const { data } = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/users/${name}`);
				if (data.error) return history.push(`/`);

				socket = io(ENDPOINT);
				setName(name);
	
				socket.emit('join', { name }, (error) => {
					if (error) {
						alert(error);
					}
				});
				socket.on('message', (message) => {
					//add incoming message to messages list
					setMessages((messages) => [ ...messages, message ]);
				});

				socket.on('roomData', ({ users }) => {
					setUsers(users);
				});
			} catch (err) {}
		})();
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
