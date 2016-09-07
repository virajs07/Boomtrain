import store from '../store'
import API from '../apis'
import objectPath from 'object-path'
import _ from 'lodash'


var Github = {
	/**
	 * This method is to fetch data for the public github reposotories
	 * @param  {Number} ---> currentRepo --- The current repository to fetch from
	 */
	fetch:(currentRepo)=>{
		var options = {
			"since":currentRepo
		}
		API.Github.fetch(options).then((response)=>{
			var nextPage = Github.getNextPageUrl(response)
			var data = store.get().data||[]
			data = data.concat(response.body)
			if(!isNaN(nextPage))
				store.get().set({currentRepo:nextPage,data:data})
		}).catch((err)=>{
			console.log("error is "+err)
		})
	},

	/**
	 * This methid is to update the user data that is set from the modal
	 * @param  {Object} ---> user --- The user whose data has been update. It contains the whole github repository details
	 */
	update:(user)=>{
		var options = {
			"user":user
		}
		API.Github.update(options).then((response)=>{
			var allData = _.map(store.get().data, _.clone)||[]
			_.each(allData,function(data){
				if(data.id===user.id){
					data.name = user.name
					data.description = user.description
				}
			})
			store.get().set({data:allData})
		}).catch((err)=>{
			console.log("error is "+err)
		})
	},

	/**
	 * This function gets the next page to start fetch from for the user
	 * @param  {Object} ---> response -- the response from the github API
	 * @return {Number} ---> The next repo ti fetch the data 
	 */
	getNextPageUrl:(response)=>{
		const link = objectPath.get(response,"headers.link")||""
		if (!link) {
			return null
		}
		const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
		if (!nextLink) {
			return null
		}
		const nextRepo = nextLink.split(';')[0].slice(1, -1).split('=')||""		
		return nextRepo && nextRepo.length ? parseInt(nextRepo[1],10) : 0
	}
}

export default Github;