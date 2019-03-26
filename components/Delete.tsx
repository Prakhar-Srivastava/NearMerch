import React from 'react'
import {Component,ReactNode} from 'react'
import {Text,Alert,AsyncStorage,ScrollView,} from 'react-native'
import {TableRow} from './tabular'
type Loc={
	lat: Number,
	lng: Number,
}
type Geo={
	location: Loc
}
type TableRowProps={
	name: string,
	geometry: Geo,
	index?: number
	(event?: any): void,
}
type State={
	results?: TableRowProps[],
}
type Props={}
class Row extends Component<any,Object>{
	constructor(props: any){
		super(props)
	}
}
export default class DelTab extends Component<Props,State>{
	state: State={}
	constructor(props: Props){
		super(props)
		this._loadData=this._loadData.bind(this)
		this.isDataLoaded=this.isDataLoaded.bind(this)
	}
	isDataLoaded() :boolean{
		if(this.state.results)
			return this.state.results.length > 0
		return false
	}

	componentDidMount(){
		this._loadData().then(res=>this.setState({results: res})).catch(error=>Alert.alert('Error','No data found!'))
	}
	async _loadData(): Promise<TableRowProps>{
		const data=await AsyncStorage.getItem('Markers')
		if(data){
			return new Promise<TableRowProps>((res,reject)=>res(JSON.parse(data)))
		}
		return new Promise<TableRowProps>((res,reject)=>reject(new Error('Storage Error')))
	}
	render(): ReactNode{
		return (<ScrollView style={{
			backgroundColor: '#fff',
		}}>
			{this.isDataLoaded()?
				this.state.results.map((i,idx)=><TableRow geometry={i.geometry} name={i.name} key={idx} onClick={()=>{
					this.setState(prevState=>{
						let {results} = prevState
						if(results){
							results.splice(idx,1)
							AsyncStorage.setItem('Markers',JSON.stringify(results))
						}
						return {...prevState, results: results}
					})
				}} buttonLabel={'Delete'}/>)
			:<Text>No data found!!</Text>}
		</ScrollView>)
	}
}
