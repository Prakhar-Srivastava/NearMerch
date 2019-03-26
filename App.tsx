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
import Form from './components/Form'
import Login from './components/login'
import NormalUser from './components/NormalUser'
import MechTab from './components/tabular'
import DelTab from './components/Delete';
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
						title={'Login'}
						component={Login}
					></Scene>
					<Scene
						key={'admin'}
						title={'Admin Panel'}
						component={Rootscreen}
					></Scene>
					<Scene
						key={'normaluser'}
						title={'Find Mechanics'}
						component={NormalUser}
					></Scene>
					<Scene
						key={'mapscr'}
						title={'Map'}
						component={Mapscreen}
					></Scene>
					<Scene
						key={'mechtab'}
						title={'Added Mechanics'}
						component={MechTab}
					></Scene>
					<Scene
						key={'form'}
						title={'Add'}
						component={Form}
					></Scene>
					<Scene
						key={'delmech'}
						title={'Delete'}
						component={DelTab}
					></Scene>
				</Scene>
			</Router>
		)
	}
}


