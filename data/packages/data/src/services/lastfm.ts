import { LASTFM_API_URL, LASTFM_API_KEY } from '../env';

const query = new URLSearchParams([
	['method', 'chart.getTopTracks'],
	['format', 'json'],
	['api_key', LASTFM_API_KEY],
]);

export const getChartTopTracks = `${LASTFM_API_URL}?${query}`;
