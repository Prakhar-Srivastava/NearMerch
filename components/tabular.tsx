import React from 'react'
import {Component,ReactNode} from 'react'
import {View,Text,StyleSheet,Alert,AsyncStorage,ScrollView, TouchableOpacity,} from 'react-native'
import global_styles from '../styles/global'
type Loc={
	lat: Number,
	lng: Number,
}
type Geo={
	location: Loc
}
type onClickType={
	(event?: any): void,
}
type TableRowProps={
	name: string,
	geometry: Geo,
	index?: number,
	onClick?: onClickType,
	buttonLabel?: string,
}
const rowStyle=StyleSheet.create({
	name: {
		textAlign: 'left',
		fontWeight: 'bold',
		fontSize: 20,
		color: '#000',
		alignSelf: 'flex-start',
		justifyContent: 'flex-start',
		marginBottom: 10,
	},
	location: {
		textAlign: 'left',
		color: '#444',
		alignSelf: 'flex-start',
		justifyContent: 'flex-start',
	},
	row: {
		...global_styles.container,
		borderBottomColor: '#979797',
		borderBottomWidth: 1,
		padding: 5,
	},
	button: {
		...global_styles.button,
		backgroundColor: 'red',
	}
})
export const TableRow=(props: TableRowProps)=>(
	<View style={rowStyle.row}>
		<Text style={rowStyle.name}>{props.name}</Text>
		<Text style={rowStyle.location}>Latitude: {props.geometry.location.lat}</Text>
		<Text style={rowStyle.location}>Longitude: {props.geometry.location.lng}</Text>
		{props.onClick?(
			<TouchableOpacity
				onPress={props.onClick}
				style={rowStyle.button}
			>
				<Text style={{color: '#fff', textAlign: 'center'}}>
					{props.buttonLabel||'Click'}
				</Text>
			</TouchableOpacity>
		):null}
	</View>
)
type State={
	results?: TableRowProps[],
}
type Props={}
export default class Tab extends Component<Props,State>{
	state: State={}
	constructor(props: Props){
		super(props)
		this._loadData=this._loadData.bind(this)
		this.isDataLoaded=this.isDataLoaded.bind(this)
	}
	componentDidMount(){
		this._loadData().then(res=>this.setState({results: res})).catch(error=>Alert.alert('Error','No data found!'))
	}
	isDataLoaded() :boolean{
		if(this.state.results)
			return this.state.results.length > 0
		return false
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
			this.state.results.map((i,idx)=><TableRow geometry={i.geometry} name={i.name} key={idx}/>)
			:<Text>No data found!!</Text>}
		</ScrollView>)
	}
}
