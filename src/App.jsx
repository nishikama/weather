import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import getDataFromAPI from './getDataFromAPI';
import Prefecturelist from './components/Prefecturelist';

const App = () => {
	const getPrefectureUrl =
		'https://weather.eda3gyo.com/json/prefecturecode.json';
	return (
		<BrowserRouter>
			<div className="card-body col-md-6 mx-auto">
				<h1 className="card-title">全国の天気予報</h1>
				<Prefecturelist
					requestUrl={getPrefectureUrl}
					sentData={{}}
					getData={(url, data) => getDataFromAPI(url, data)}
				/>
			</div>
		</BrowserRouter>
	);
};
export default App;
