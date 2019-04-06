import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TimelineBox from './timelineBox';
import '../index.css';

export default class Timeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			events: []
		}
	}

	componentDidMount() {
		fetch('https://storage.googleapis.com/dito-questions/events.json')
		.then(response => response.json())
		.then(eventsList => {
			this.setState({
				events: this.sortEvents(eventsList.events),
				isLoading: false
			});
		})
		.catch(console.log);
	}

	sortEvents(events) {
		return events.sort((a, b) => {
			return a.timestamp - b.timestamp;
		});
	}

	render() {
		if(!this.state.isLoading){
			return (
				<div class="purchase-timeline">
					<TimelineBox purchases={this.state.events} />
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