import React,{ Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import store from '../store'
import Actions from '../actions'
import Mymodal from './Modal'
import _ from 'lodash'

class Table extends Component{

	constructor(props){
		super(props)
		this.state={
			showModal:false,
			user:{}
		}
	}

	componentWillMount(){
		Actions.Github.fetch(0)
		window.addEventListener("scroll", this.handleScroll);
	}

	/**
	 * To handle when scroll has reached the bottom of the page
	 */
	handleScroll(){
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
	    const body = document.body;
	    const html = document.documentElement;
	    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
	    const windowBottom = windowHeight + window.pageYOffset;
	    if (windowBottom >= docHeight) {
			Actions.Github.fetch(store.get().currentRepo);
	    } 
	}

	/**
	 * This function formats the link for repository name
	 * @param  {Object} cell ---> The cell to be displayed
	 * @param  {Object} row  ---> the whole row for the table
	 * @return {Object} ---> the final cell data to be displayed
	 */
	formatLink(cell,row){
		return row && row.owner 
		?<a href={row.owner.html_url} target='_blank'>{row.name}</a>
		:<a href="#">{row.name}</a>
	}

	/**
	 * This function formats Owner name and pic cell
	 * @param  {Object} cell ---> The cell to be displayed
	 * @param  {Object} row  ---> the whole row for the table
	 * @return {Object} ---> the final cell data to be displayed
	 */
	formatName(cell,row){
		return row && row.owner
		?<div className="row">
			<div className="col-xs-6" style={{maxWidth:150,width:150}}>{row.owner.login}</div>
			<div className="col-xs-6 pull-right"><img src={row.owner.avatar_url} alt={row.owner.login} title={row.owner.login} style={{maxWidth:150}}/></div>
		</div>
		:<div>No owner information</div>
	}

	/**
	 * This function formats the owner type
	 * @param  {Object} cell ---> The cell to be displayed
	 * @param  {Object} row  ---> the whole row for the table
	 * @return {Object} ---> the final cell data to be displayed
	 */
	formatOwnerType(cell,row){
		return row && row.owner
		?<div>{row.owner.type}</div>
		:<div></div>
	}

	/**
	 * This function formats the edit button in the table
	 * @param  {Object} cell ---> The cell to be displayed
	 * @param  {Object} row  ---> the whole row for the table
	 * @return {Object} ---> the final cell data to be displayed
	 */
	formatModalBtn(cell,row){
		return <button className="btn btn-primary" onClick={this.openModal.bind(this,row.id)}>Edit Data</button>
	}

	/**
	 * To set the state while hiding the modal
	 */
	hideModal(){
		this.setState({showModal:false});		
	}
	
	/**
	 * The function to open the modal
	 * @param  {Number} ---> id --- The id of the user for the modal to show data
	 */
	openModal(id){
		var allData = store.get().data || []
		var user = _.find(allData,(data)=>{
			return data.id === id
		})
		this.setState({showModal:true,user:user});
	}

	render(){
		var data = store.get().data || []
		return(
			<div>
				<BootstrapTable data={data} condensed={true}>
					<TableHeaderColumn width="200" dataField="name" dataFormat={this.formatLink.bind(this)}> Repository Name</TableHeaderColumn>
					<TableHeaderColumn width="600" dataField="description"> Description </TableHeaderColumn>
					<TableHeaderColumn width="400" dataField="owner" dataFormat={this.formatName.bind(this)}> Owner Name and Pic </TableHeaderColumn>
					<TableHeaderColumn width="150" dataField="owner" dataFormat={this.formatOwnerType.bind(this)}> Owner Type </TableHeaderColumn>
					<TableHeaderColumn width="100" dataField="id" isKey={true} dataFormat={this.formatModalBtn.bind(this)}>Edit Column</TableHeaderColumn>
				</BootstrapTable>
				<Mymodal user={this.state.user} show={this.state.showModal} hideModal={this.hideModal.bind(this)}/>
	        </div>
		)
	}
}

export default Table
