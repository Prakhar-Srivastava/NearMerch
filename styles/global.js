import React from 'react'
import {StyleSheet} from 'react-native'
const global_style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	bg: {
		zIndex: -1,
		flex: 1,
		position: 'absolute',
	},
	button: {
		borderColor: '#fff',
		borderWidth: 1,
		borderRadius: 4,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 10,
		textAlign: 'center',
		width: '98%',
		backgroundColor: '#444',
	},
})
export default global_style
