import React from 'react'
import {
	FormControlLabel,
	Checkbox,
} from '@material-ui/core'

import './SideBar.css'

const SideBar = ({ users }) => {
	return (
		<div className="textContainer">
			<div>
				<h3>People in Chat room ({users.length})</h3>
			</div>
			<hr/>
			{
				users ?
					
				users.map(({ name }) => (
					<div>
						<p key={name}>
							<FormControlLabel
								control={
									<Checkbox
										checked={true}
										name="checkedB"
										color="primary"
							/>
								}
							label={name}
							/>
						</p>
						<hr/>
					</div>
				))
					: null
			} 
		
		</div>
	);
};

export default SideBar;