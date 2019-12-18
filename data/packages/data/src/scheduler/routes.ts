const BASE_URL = '/projects/schedule';

export const get_jobs = () => {
	return {
		method: 'GET',
		url: `${BASE_URL}/jobs`,
	};
};

export const get_jobs_failed = () => {
	return {
		method: 'GET',
		url: `${BASE_URL}/jobs/failed`,
	};
};

export const post_jobs_start = () => {
	return {
		method: 'POST',
		url: `${BASE_URL}/jobs/now/{name}`,
	};
};
