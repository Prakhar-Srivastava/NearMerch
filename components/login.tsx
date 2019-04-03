import React from 'react'
import {Component} from 'react'
import {View,StyleSheet,Text,TouchableOpacity,ScrollView,Image,Alert} from 'react-native'
import {Actions} from 'react-native-router-flux'
//import * as firebase from 'firebase'
import {InputField} from './Form'
import global_style from '../styles/global.js'
const initial_state={
	isTouched: false,
}
type State=Readonly<typeof initial_state>
const initial_props={}
type Props=Readonly<typeof initial_props>
const firebaseConfig={
	apiKey: 'AIzaSyDWKooSx5H1c6sY18PZ-KL160PG8iL1Gpoo',
	authDomain: 'mistri-app-1551015331280.firebaseapp.com',
	databaseURL: 'https://mistri-app-1551015331280.firebaseio.com',
	projectId: 'mistri-app-1551015331280',
	storageBucket: 'mistri-app-1551015331280.appspot.com',
	messagingSenderId: '1067777476274',
}
//firebase.initializeApp(firebaseConfig)
//const rootRef=firebase.database
export default class Login extends Component<Props,State>{
	state: State=initial_state
	texts: {email: string,password: string}
	constructor(props: Props){
		super(props)
		this.handleClick=this.handleClick.bind(this)
		this.texts={email: '',password: ''}
	}
	handleEmailEdit=(value: string)=>{
		this.texts.email=value
	}
	handlePasswordEdit=(value: string)=>{
		this.texts.password=value
	}
	handleClick(){
		if(!this.state.isTouched)
			return this.setState({...this.state, isTouched: true})
		//Alert.alert('Texts',JSON.stringify(this.texts))
		const {email,password}=this.texts
		if(email==='test@test.com'&&password==='test')
			return Actions.normaluser()
		else if(email==='admin@test.com'&&password==='admin')
			return Actions.admin()
		else
			Alert.alert('Invalid credentials','The provided credentiasls do not match any of the users\' details, please check.')
	}
	render(){
		return (
			<View style={!this.state.isTouched?global_style.container:{}}>
				{this.state.isTouched?
				<ScrollView
					style={{
						flex: 0,
						textAlign: 'left'
					}}>
					<InputField
						keyboardType={'email-address'}
						placeholder={'someone@example.com'}
						label={'Email'}
						handleEdit={this.handleEmailEdit}
					/>
					<InputField
						label={'Password'}
						handleEdit={this.handlePasswordEdit}
						isPassword={true}
					/>
				</ScrollView>
					:null}
				<Image
					source={require('../images/splash.png')}
					style={global_style.bg}
					resizeMode={'repeat'}
				/>
				<TouchableOpacity
					style={global_style.button}
					onPress={this.handleClick}
				>
					<Text
						style={{
							textAlign: 'center',
							color: '#fff'
						}}>
							Login
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={global_style.button}
					onPress={()=>Actions.mapscr()}
				>
					<Text
						style={{
							textAlign: 'center',
							color: '#fff'
						}}>
							Find Mechanics
					</Text>
				</TouchableOpacity>
			</View>
		)
	}
}
