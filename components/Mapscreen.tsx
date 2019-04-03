import React from 'react'
import {View,Text,StyleSheet,Dimensions,Alert,Image,AsyncStorage,Linking,TouchableOpacity} from 'react-native'
import global_style from '../styles/global.js'
import MapView from 'react-native-maps'
import {Marker,PROVIDER_GOOGLE,Callout} from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
type Props={}
const initialLoc={
	latitude: 0.0,
	longitude: 0.0,
	latitudeDelta: 0.0,
	longitudeDelta: 0.0,
}
type currentLocType=typeof initialLoc
const initialState={
	currentLoc: initialLoc,
	results: [],
}
type initialStateType={
	currentLoc: currentLocType,
	results: any[]|never[],
}
type State=Readonly<initialStateType>
const {width,height}=Dimensions.get('window')
const aspectratio=width/height
const styles=StyleSheet.create({
	map: {
		...StyleSheet.absoluteFillObject,
	},
	markerCallout: {
		...global_style.container,
		backgroundColor: '#fff',
		padding: 5,
		borderRadius: 13,
		width: 200,
	},
	calloutTitle: {
		fontWeight: 'bold',
		fontSize: 15,

	},
	callButton: {
		...global_style.button,
		backgroundColor: 'green',
	},
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
const BaseURL='https://maps.googleapis.com/maps/api/place/nearbysearch/json?key='
const APIKey='AIzaSyCof3Ti1ZaxwbJQCPq2nCm4PTbuvOBeOWg'
const option='rankby=distance&type=car_repair'
export default class Mapscreen extends React.Component<Props,State>{
	constructor(props: Props){
		super(props)
		this.state=initialState
	}
	componentDidMount(){
		Geolocation.getCurrentPosition(
			(position: any)=>{
				const URL=`${BaseURL}${APIKey}&location=${position.coords.latitude},${position.coords.longitude}&${option}`
				fetch(URL).then(resp=>resp.json()).then(data=>
					{
						AsyncStorage.getItem('Markers',
						(error,markers)=>{
							if(markers)
								markers=JSON.parse(markers)
							else{
								 //Alert.alert('Storage error', JSON.stringify(error))
								 markers=''
							}
							this.setState({
								currentLoc: {
									latitude: position.coords.latitude,
									longitude: position.coords.longitude,
									latitudeDelta: 0.0922,
									longitudeDelta: aspectratio,
								},
								results: [...data.results,...markers],})
						})
				})},
				(error: any)=>Alert.alert('Error',error.message),
				{enableHighAccuracy: true,timeout: 15000,maximumAge: 1000}
				)
	}
	render(){
		return (
			<View style={global_style.container} >
				{this.state.results.length>0?
					<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					initialRegion={this.state.currentLoc }
					customMapStyle={mapstyle}
					>
						<Marker
							coordinate={{
								latitude: this.state.currentLoc.latitude,
								longitude: this.state.currentLoc.longitude
							}}
							title={'My Location'}
						>
								<Image
									source={require('../images/marker-circle.png')}
									style={{height: 10,width: 10}} />
						</Marker>
						{
					this.state.results.map((res: any, index: number)=>{
						const {lat,lng}=res.geometry.location
						return (<Marker
							coordinate={{latitude: lat,longitude: lng}}
							title={res.name}
							description={res.vicinity}
							key={index} >
						<Callout tooltip>
							<View style={styles.markerCallout}>
								<Text style={styles.calloutTitle}>{res.name}</Text>
								<Text>{'\n'}{res.vicinity||res.address}</Text>
								{res.phone?<Text>Contact: {res.phone}</Text>:null}
							</View>
							</Callout>
						</Marker>)
				})
					}</MapView>:<Loader />}
			</View>
		)
	}
}
