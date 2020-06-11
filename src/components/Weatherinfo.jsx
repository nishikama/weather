import React, { useState, useEffect } from 'react';

const Weatherinfo = (props) => {
	const [WeatherData, setWeatherData] = useState(null);
	useEffect(() => {
		const result = props
			.getData?.(props.requestUrl, props.sentData)
			.then((response) => setWeatherData(response));
	}, [props]);

	return (
		<div>
			{WeatherData === null ? (
				<p>now loading...</p>
			) : (
				<>
					<h2>{`${WeatherData.data.location.city}地方の天気`}</h2>
					<table className="table">
						<tbody>
							{WeatherData.data.forecasts.map((x, index) => (
								<tr key={index} className="d-flex">
									<td className="col-md-5">
										<h3 className="text-center">
											{x.date.slice(-2)}日
										</h3>
										<p className="text-center">
											<img
												src={x.image.url}
												alt={x.telop}
											/>
										</p>
										<p className="text-center">{x.telop}</p>
									</td>
									<td className="col-md-7 position-relative">
										<div className="d-flex h-50 red position-relative">
											<p className="col-md-8 d-flex justify-content-center align-items-center">
												最高気温
											</p>
											<p className="col-md-4 d-flex justify-content-center align-items-center">
												{x.temperature.max
													? `${x.temperature.max.celsius}℃`
													: '---'}
											</p>
										</div>
										<div className="d-flex h-50 blue position-relative">
											<p className="col-md-8 d-flex justify-content-center align-items-center">
												最低気温
											</p>
											<p className="col-md-4 d-flex justify-content-center align-items-center">
												{x.temperature.min
													? `${x.temperature.min.celsius}℃`
													: '---'}
											</p>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<p>{WeatherData.data.description.text}</p>
				</>
			)}
		</div>
	);
};
export default Weatherinfo;
