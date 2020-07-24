
import React from 'react'
import {
	TextField,
	Button,
} from '@material-ui/core'

import './Input.css'

const Input = (props) => {

	const handleSend = (e) => {
		props.sendMessage(e);
	}

	return (
		<div className="form">
			<TextField
          id="filled-full-width"
          // label="Label"
          style={{ margin: 8 }}
          placeholder="Enter a Message"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
				variant="outlined"
				className="input"
				 	value={props.message}
					onChange={({ target: { value } }) => props.setMessage(value)}
					onKeyPress={event => event.key === 'Enter' ? props.sendMessage(event) : null}
			/>
			<Button variant="contained" color="primary" onClick={handleSend} className="sendButton">
				Send
			</Button>
		</div>
	);
};

export default Input;