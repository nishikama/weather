import axios from 'axios';

const getDataFromAPI = async (requestUrl, data) => {
	let parameter = `?requesturl=${encodeURIComponent(requestUrl)}`;
	Object.keys(data).forEach((key) => {
		parameter += `&${key}=${encodeURIComponent(data[key])}`;
	});
	const mediatorUrl = 'https://weather.eda3gyo.com/php/getDataFromAPI.php';
	const result = await axios.get(`${mediatorUrl}${parameter}`);
	return result;
};
export default getDataFromAPI;
