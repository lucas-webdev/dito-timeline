import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default function TimelineBox(props) {

	let sortedPurchases = sortEvents(props.finalPurchases);

	let fullPurchases = sortedPurchases.map(p => {
		return {
			date: new Date(p.timestamp).toLocaleDateString(),
			time: new Date(p.timestamp).toLocaleTimeString(),
			store: p.custom_data.find(el => el.key === 'store_name').value,
			revenue: formatRevenue(p.revenue),
			products: props.productsPurchases.filter(product => product.custom_data.find(el => el.key === 'transaction_id').value === p.custom_data.find(el => el.key === 'transaction_id').value)
		}
	});

	const timelineBox = fullPurchases.map(p =>
		<div className="timeline-event">
			<img src="/icons/check.svg" className="timeline__mark" />
			<div className="timeline-box" key={p.time}>
				<div className="timeline-box__header">
					<div className="timeline-box__header--item">
						<img src="/icons/calendar.svg" />
						<span>{p.date}</span>
					</div>
					<div className="timeline-box__header--item item--clock">
						<img src="/icons/clock.svg" />
						<span>{p.time}</span>
					</div>
					<div className="timeline-box__header--item">
						<img src="/icons/place.svg" />
						<span>{p.store}</span>
					</div>
					<div className="timeline-box__header--item">
						<img src="/icons/money.svg" />
						<span>{p.revenue}</span>
					</div>
				</div>
				<div className="timeline-box__content">
					<div className="timeline-box__content--header">
						<span>Produto</span>
						<span>Preço</span>
					</div>
					{
						p.products.map(pr =>
							<div className="timeline-box__content--list" key={pr.timestamp}>
								<span>{pr.custom_data.find(el => el.key === 'product_name').value}</span>
								<span>{formatRevenue(pr.custom_data.find(el => el.key === 'product_price').value)}</span>
							</div>
						)
					}
				</div>
			</div>
		</div>
	)

	return timelineBox;

}

function sortEvents(events) {
	return events.sort((a, b) => {
  	return new Date(b.timestamp) - new Date(a.timestamp)
	});
}

function formatRevenue(revenue) {
	return `R$ ${revenue.toFixed(2).toString().replace('.', ',')}`;
}