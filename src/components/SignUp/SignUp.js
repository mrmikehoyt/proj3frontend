import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const formStyle = {
	textAlign: 'center',
	marginTop: '30px',
	borderStyle: 'solid',
	borderRadius: '20px',
	borderColor: '#1b3863'
};

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	}
}));
const SignUp = (props) => {
	let history = useHistory();

	const [ state, setState ] = useState({
		username: '',
		password: ''
	});

	const classes = useStyles();

	function handleLogin() {
		history.push('/');
	}

	const handleInput = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/users/register`, state);
			localStorage.setItem('token', data.token);
			history.push(`/chat?name=${state.username}`);
		} catch (err) {
			console.log('error registering==>>>', err)
		}
	};

	return (
		<div style={formStyle}>
			<form className={classes.root} onSubmit={handleFormSubmit}>
				<TextField
					required
					id="standard-required"
					label="username"
					name="username"
					onChange={handleInput}
					variant="outlined"
				/>
				<TextField
					required
					id="standard-required"
					label="password"
					name="password"
					type="password"
					onChange={handleInput}
					variant="outlined"
				/>
				<Button type="submit" variant="contained" color="primary">
					SignUp
				</Button>
				<br />
				<br />
				<h3>Already a Member ?</h3>
				<p>Click Button below to Log in!</p>
				<Button variant="contained" color="default" onClick={handleLogin}>
					Login
				</Button>
			</form>
		</div>
	);
};

export default SignUp;
