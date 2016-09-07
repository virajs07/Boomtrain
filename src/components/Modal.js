import React,{ Component } from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import Actions from '../actions'
import _ from 'lodash'

class Mymodal extends Component{

	constructor(props){
		super(props)
		this.state={
			user:{}
		}
	}

	componentWillReceiveProps(obj){
		this.setState({user:_.clone(obj.user)})
	}

	/**
	 * The function to get the modal body for the current user
	 */
	getModalBody(){
		if(this.state.user){
			return(
				<div className="updateform">
					<div className="row">
						<div className="col-xs-3">
							Name:
						</div>
						<div className="col-xs-9">
							<input type="text" value={this.state.user.name} onChange={(e)=>this.updateUser("name",e.target.value)} />
						</div>
					</div>
					<div className="row">
						<div className="col-xs-3">
							Description:
						</div>
						<div className="col-xs-9">
							<textarea rows="4" cols="30" value={this.state.user.description} onChange={(e)=>this.updateUser("description",e.target.value)} />
						</div>
					</div>
					<div className="row">
						<div className="col-xs-6 text-center">
							<button className="btn btn-success pull-left" onClick={this.update.bind(this)}>Update</button>
				            <button className="btn btn-danger pull-right" onClick={this.props.hideModal}>Close</button>
			           </div>
		            </div>
				</div>
			)
		}		
	}

	/**
	 * This function updates the user data 
	 * @param  {String} key ---> Name of the key to be update
	 * @param  {String} value ---> The value to be updated/new value
	 */
	updateUser(key,value){
		var user = this.state.user
		user[key] = value
		this.setState({user:user})
	}

	/**
	 * This function calls the action to update the user data and hides the modal
	 */
	update(){
		var user = this.state.user
		Actions.Github.update(user)
		this.props.hideModal.call()
	}

	render(){
		return(
			<Modal show={this.props.show} keyboard={true} backdrop="static" onHide={this.props.hideModal} container={this}>
	            <Modal.Header closeButton>
	                <Modal.Title>Edit Row Data</Modal.Title>
	            </Modal.Header>
	            <Modal.Body>
	                {this.getModalBody()}
	            </Modal.Body>
	        </Modal>
        )
	}
}

export default Mymodal