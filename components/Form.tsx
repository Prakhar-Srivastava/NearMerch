import React from 'react'
import { View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import global_styles from '../styles/global'
type Props={
	label?: string,
	placeholder?: string,
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "number-pad" | "name-phone-pad" | "decimal-pad" | "twitter" | "web-search" | undefined,
	multiline?: boolean,
}
const initila_state={}
type State=Readonly<typeof initila_state>
const styles=StyleSheet.create({
	input: {
		backgroundColor: '#eee',
		width: '100%',
		padding: 10,
		height: 40,
		borderRadius: 7,
		fontSize: 15,
		
	},
	label: {
		textAlign: 'left',
		fontWeight: 'bold',
		fontSize: 20,
		color: '#000',
		alignSelf: 'flex-start',
		justifyContent: 'flex-start',
		marginBottom: 10,
	},
	multilineInput: {
		backgroundColor: '#eee',
		width: '100%',
		padding: 10,
		height: 65,
		borderRadius: 7,
		fontSize: 15,
	},
})
export class InputField extends React.Component<Props,State>{
	label: string
	placeholder: string
	keyboardType: "default" | "email-address" | "numeric" | "phone-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "number-pad" | "name-phone-pad" | "decimal-pad" | "twitter" | "web-search" | undefined
	multiline: boolean
	constructor(props: Props){
		super(props)
		this.label=props.label||'Label'
		this.placeholder=props.placeholder||'Enter here'
		this.keyboardType=props.keyboardType||'default'
		this.multiline=props.multiline||false
	}
	render(){
		return(
			<View style={[global_styles.container,{padding: 20,borderBottomColor: '#979797',borderBottomWidth: 0.7}]}>
				<Text
					style={styles.label} ref={'label'}>
					{this.label}
				</Text>
				<TextInput
					style={this.multiline?styles.multilineInput:styles.input}
					placeholder={this.placeholder}
					keyboardType={this.keyboardType}
					multiline={this.multiline}
				/>
			</View>
		)
	}
}
const Form=(props: any)=>(
		<ScrollView style={{backgroundColor: '#fff'}}>
			<InputField label={'Name'} placeholder={'John\'s Shop'}/>
			<InputField label={'Contact Number'} placeholder={'1234567890'} keyboardType={'phone-pad'} />
			<InputField label={'Email'} placeholder={'someone@example.com'} keyboardType={'email-address'} />
			<InputField label={'Address'} />
			<View style={[global_styles.container,{margin: 10}]}>
				<TouchableOpacity 
					style={[global_styles.button]}
					onPress={()=>alert('Submitted!')}
				>
					<Text style={{color: '#fff',textAlign: 'center', padding: 5}}>Submit</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
)
export default Form