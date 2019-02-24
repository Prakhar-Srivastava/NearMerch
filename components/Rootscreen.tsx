import React from 'react'
import {View,Image,TouchableOpacity,StatusBar,Text} from 'react-native'
import {Actions} from 'react-native-router-flux'
import global_style from '../styles/global.js'
type Props={}
const Rootscreen=(props: Props)=>(
	<View style={[global_style.container,{paddingTop: 150,}]}>
		<StatusBar
			backgroundColor={'#000'}
			barStyle={'light-content'}
		/>
		<Image
			source={require('../images/splash.png')}
			style={global_style.bg}
			resizeMode={'repeat'}
		/>
		<TouchableOpacity
			style={global_style.button}
			onPress={()=>Actions.mapscr()}
		>
			<Text style={{textAlign: 'center',color: '#fff'}}>
				Find Mechanics
			</Text>
		</TouchableOpacity>
	</View>
)
export default Rootscreen
