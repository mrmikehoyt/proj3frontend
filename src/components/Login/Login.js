import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch'
		}
	}
}));

const formStyle = {
	textAlign: 'center',
	marginTop: '30px',
	borderStyle: 'solid',
	borderRadius: '20px',
	borderColor: '#1b3863'
};

const SignUp = () => {
	let history = useHistory();
	const classes = useStyles();
	const [ state, setState ] = useState({
		username: '',
		password: ''
	});

	const handleInput = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	function handleSignUp() {
		history.push('/signUP');
	}

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/users/login`, state);
			localStorage.setItem('token', data.token);
			history.push(`/chat?name=${state.username}`);
		} catch (err) {
			console.log('error registering==>>>', err);
		}
	};

	return (
		<div style={formStyle}>
			<form className={classes.root} onSubmit={handleLogin}>
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
				<Button variant="contained" color="primary" type="submit">
					Login
				</Button>
				<br />
				<br />
				<h3>Don't Have an Account?</h3>
				<p>Click Button below to Sign up</p>
				<Button variant="contained" color="default" onClick={handleSignUp}>
					SignUp
				</Button>
			</form>
		</div>
	);
};

export default SignUp;
