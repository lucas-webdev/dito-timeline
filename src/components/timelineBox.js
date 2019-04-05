import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class TimelineBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			events: []
		}
	}

	componentDidMount() {
		fetch('https://storage.googleapis.com/dito-questions/events.json')
		.then(response => response.json())
		.then(eventsList => {
			this.setState({events: eventsList.events});
			console.log(this.state.events);
		})
		.catch(console.log);
	}

	render() {
		const eventList = this.state.events.map((event) =>
		  <li key={event.timestamp}>{event.event}</li>
		);
		return (
			<div>
				<ul>
					{eventList}
				</ul>
			</div>
		);
	}
}