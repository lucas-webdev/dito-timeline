import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function sortEvents(events) {
	return events.sort((a, b) => {
		const timestampA = a.custom_data.find(el => el.key === 'transaction_id').value;
		const timestampB = b.custom_data.find(el => el.key === 'transaction_id').value

		return timestampA - timestampB;
	});
}

export default function TimelineBox(props) {
	const events = sortEvents(props.eventsList);	

	const eventList = events.map((event) =>
	  <li key={event.timestamp}>{event.timestamp}</li>
	);

	return <div className="timeline-box">
		<div className="timeline-box__header"></div>
		<div className="timeline-box__content">
			<div className="timeline-box__content--sub-header">
				<span>Produto</span>
				<span>Preço</span>
			</div>
			<div className="timeline-box__content--list">
				{eventList}
			</div>
		</div>
	</div>
}