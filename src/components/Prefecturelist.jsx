import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import getDataFromAPI from '../getDataFromAPI';
import Arealist from './Arealist';

const Prefecturelist = (props) => {
	const [prefectureData, setPrefectureData] = useState(null);
	const history = useHistory();
	useEffect(() => {
		const result = props
			.getData?.(props.requestUrl, props.sentData)
			.then((response) => setPrefectureData(response));
	}, [props]);

	const getAreaUrl = 'https://weather.eda3gyo.com/json/areacode.json';

	return (
		<>
			<div className="form-group">
				<label htmlFor="prefecture">都道府県：</label>
				{prefectureData === null ? (
					<p>now loading...</p>
				) : (
					<select
						id="prefecture"
						className="form-control"
						value={prefectureData.code}
						onChange={(e) => {
							history.push(`/${e.target.value}`);
						}}
					>
						<option value="">都道府県を選択してください。</option>
						{prefectureData.data.map((x, index) => (
							<option key={index} value={x.code}>
								{x.prefecture}
							</option>
						))}
					</select>
				)}
			</div>
			<div>
				{prefectureData === null ? (
					<p>now loading...</p>
				) : (
					prefectureData.data.map((x, index) => (
						<Route
							key={index}
							path={`/${x.code}`}
							render={(props) => (
								<Arealist
									requestUrl={getAreaUrl}
									sentData={{}}
									getData={(url, data) =>
										getDataFromAPI(url, data)
									}
								/>
							)}
						/>
					))
				)}
			</div>
		</>
	);
};
export default Prefecturelist;
