import { XMLHttpRequest } from 'xmlhttprequest';
import { RequestParams } from '../types';

function createXHR() {
	return new XMLHttpRequest();
}

export const request = ({ url, method = 'GET' }: RequestParams) => ({
	url,
	createXHR,
});
