import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import global_style from '../styles/global.js'
import MapView from 'react-native-maps'
import {Marker,PROVIDER_GOOGLE} from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
type Props={}
const EmptyInitialState={}
type State=Readonly<typeof EmptyInitialState>
const {width,height}=Dimensions.get('window')
const aspectratio=width/height
const styles=StyleSheet.create({
	map: {
		...StyleSheet.absoluteFillObject,
	}
})
const mapstyle=[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]
const Loader = (props: Props)=>(
	<Text>Getting your current location...</Text>
)
export default class Mapscreen extends React.Component<Props,State>{
	constructor(props: Props){
		super(props)
		this.state=EmptyInitialState
	}
	componentDidMount(){
		Geolocation.getCurrentPosition(
			position=>{
				fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCof3Ti1ZaxwbJQCPq2nCm4PTbuvOBeOWg&location=${position.coords.latitude},${position.coords.longitude}&rankby=distance&type=car_repair`)
					.then(resp=>resp.json())
					.then(data=>this.setState({
					currentLoc: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: aspectratio,
					},
					results: data.results,
				}))
				},
				error=>alert(error.message),
				{enableHighAccuracy: true,timeout: 15000,maximumAge: 1000}
		)
	}
	render(){
		return (
			<View style={global_style.container} >
				{this.state.currentLoc?
					<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					initialRegion={this.state.currentLoc }
					customMapStyle={mapstyle}
					>{
					this.state.results.map((res: any, index: number)=>{
						const {lat,lng}=res.geometry.location
						return (<Marker coordinate={{latitude: lat,longitude: lng}} title={res.name} key={index}/>)
				})
					}</MapView>:<Loader />}
			</View>
		)
	}
}
