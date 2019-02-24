/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react'
import {Component} from 'react'
import {Router,Scene} from 'react-native-router-flux'
import Rootscreen from './components/Rootscreen'
import Mapscreen from './components/Mapscreen'
type Props = {}
export default class App extends Component<Props> {
	render() {
		return (
			<Router
				navigationBarStyle={{
					backgroundColor: '#000',
				}}
				titleStyle={{
					color: '#ddd',
					textAlign: 'center',
				}}
			>
				<Scene
					key={'root'}
					initial
					title={'NearMech'}
				>
					<Scene
						key={'splash'}
						title={'Near Mech'}
						component={Rootscreen}
					></Scene>
					<Scene
						key={'mapscr'}
						title={'Map'}
						component={Mapscreen}
					></Scene>
				</Scene>
			</Router>
		)
	}
}


