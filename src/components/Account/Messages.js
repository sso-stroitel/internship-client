import React from 'react';
import {messages} from './data';

export default class Messages extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div className='account__messages'>
			<ul>
				{messages.map(message => (
					<li className='account__message' key={message.id}>
						<span className='account__company'>{message.company}</span><span className='account__text'>{message.message}</span><span className='account__date'>{message.date}</span>
					</li>
				))}
			</ul>
		</div>)
	}
}