import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';

export const Popup = (props) => {
	const { isOpen, onClose, data, onSubmit } = props;
	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			aria-labelledby="form-dialog-title"
			fullWidth={true}
		>
			<DialogTitle id="form-dialog-title">{data.name}</DialogTitle>
			<DialogContent style={{overflowY: 'unset'}}>
				{data.description}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Назад
				</Button>
				<Button onClick={onSubmit} color="primary">
					Откликнуться
				</Button>
			</DialogActions>
		</Dialog>
	)
}