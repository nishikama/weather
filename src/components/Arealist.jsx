import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import getDataFromAPI from '../getDataFromAPI';
import Weatherinfo from './Weatherinfo';

const Arealist = (props) => {
	const [areaData, setAreaData] = useState(null);
	const history = useHistory();
	const location = useLocation();
	useEffect(() => {
		const result = props
			.getData?.(props.requestUrl, props.sentData)
			.then((response) => {
				const areas = response.data.filter((x) => {
					return location.pathname.slice(1, 3) === x.code.slice(0, 2);
				});
				setAreaData(areas);
			});
	}, [props, location.pathname]);

	const getWeatherUrl =
		'http://weather.livedoor.com/forecast/webservice/json/v1';

	return (
		<>
			<div className="form-group">
				<label htmlFor="area">市区町村：</label>
				{areaData === null ? (
					<p>now loading...</p>
				) : (
					<select
						id="area"
						className="form-control"
						value={areaData.code}
						onChange={(e) => {
							history.push(
								`/${e.target.value.slice(0, 2)}/${
									e.target.value
								}`
							);
						}}
					>
						<option value="">市区町村を選択してください。</option>
						{areaData.map((x, index) => (
							<option key={index} value={x.code}>
								{x.area}
							</option>
						))}
					</select>
				)}
			</div>
			<div>
				{areaData === null ? (
					<p>now loading...</p>
				) : (
					<Switch>
						{areaData.map((x, index) => {
							return (
								<Route
									key={index}
									exact
									path={`/${x.code.slice(0, 2)}/${x.code}`}
									render={(props) => (
										<Weatherinfo
											requestUrl={getWeatherUrl}
											sentData={{ city: x.code }}
											getData={(url, data) =>
												getDataFromAPI(url, data)
											}
										/>
									)}
								/>
							);
						})}
					</Switch>
				)}
			</div>
		</>
	);
};
export default Arealist;
