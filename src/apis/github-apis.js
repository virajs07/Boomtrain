import request from 'superagent'
import config from '../config'
import Promise from 'bluebird'

var Github = {
	
	//The API to fetch the details from github
	fetch:(options)=>{
		return new Promise((resolve,reject)=>{
			var url = config.baseURL + 'repositories'
			request.get(url).query(options).then((response,err)=>{
				if(err)
					reject(err)
				else
					resolve(response)
			})	
		})
	},

	// API to update the user details to requestbin url
	update:(options)=>{
		return new Promise((resolve,reject)=>{
			var url = config.baseExternalURL ;
			request.post(url).send(options).then((response,err)=>{
				if(err)
					reject(err)
				else
					resolve(response)
			})
		})
	}
}

export default Github;
