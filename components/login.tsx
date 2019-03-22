import React from 'react'
import {Component} from 'react'
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import * as firebase from 'firebase'
import global_style from '../styles/global.js'
const initial_state={}
type State=Readonly<typeof initial_state>
const initial_props={}
type Props=Readonly<typeof initial_props>
const firebaseConfig={
	apiKey: 'AIzaSyDWKooSx5H1c6sY8PZ-KL160PG8iL1Gpoo',
	authDomain: 'mistri-app-1551015331280.firebaseapp.com',
	databaseURL: 'https://mistri-app-1551015331280.firebaseio.com',
	projectId: 'mistri-app-1551015331280',
	storageBucket: 'mistri-app-1551015331280.appspot.com',
	messagingSenderId: '1067777476274',
}
firebase.initializeApp(firebaseConfig)
const rootRef=firebase.database
export default class Login extends Component<Props,State>{
	constructor(props: Props){
		super(props)
		this.state=initial_state
	}
	render(){
		return (
			<View style={global_style.container}>
				<TouchableOpacity style={global_style.button} >
					<Text style={{textAlign: 'center', color: '#fff'}}>Login</Text>
				</TouchableOpacity>
			</View>
		)
	}
}
