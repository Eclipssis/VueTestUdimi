import axios from 'axios'

const apiDomain = 'https://api.quwi.com/v2'

export default {
	request(method, uri, data = null) {
		let token
		let headers
		const url = apiDomain + uri


		if (process.browser) {
			token = localStorage.getItem('token')
		}

		if (token) {
			headers = {
				Authorization: 'Bearer ' + token,
			};
		}

		return new Promise((resolve, reject) => {
			axios({ method, url, data, headers })
				.then((response) => {
					resolve(response)
				})
				.catch((error) => {
					reject(error.response)
				})
		})
	}
}
