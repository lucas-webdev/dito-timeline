import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TimelineBox from './timelineBox';

export default class Timeline extends Component {
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
			this.setState({events: eventsList.events, isLoading: true});
		})
		.catch(console.log);
	}

	render() {
		if(this.state.isLoading){
			return (
				<div>
					<TimelineBox eventsList={this.state.events} />
				</div>
			);
		}
		else {
			return (
				<div>Carregando...</div>
			)
		}
	}
}