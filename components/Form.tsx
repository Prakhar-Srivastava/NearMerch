import React from 'react'
import { View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,ViewStyle,Alert } from 'react-native';
import global_styles from '../styles/global'
interface handleEditInterfaceForInputs{
	(value: string): void,
}
type Props={
	label?: string,
	placeholder?: string,
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "number-pad" | "name-phone-pad" | "decimal-pad" | "twitter" | "web-search" | undefined,
	multiline?: boolean,
	style4View?: ViewStyle,
	isPassword?: false,
	handleEdit?: handleEditInterfaceForInputs
}
const initial_state={textValue: ''}
type State=Readonly<typeof initial_state>
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
	isPassword: boolean
	secureTextEntry: boolean
	state: State
	constructor(props: Props){
		super(props)
		this.label=props.label||'Label'
		this.placeholder=props.placeholder||'Enter here'
		this.keyboardType=props.keyboardType||'default'
		this.multiline=props.multiline||false
		this.isPassword=props.isPassword||false
		this.secureTextEntry=this.isPassword||false
		this.handleEdit=this.handleEdit.bind(this)
		this.state=initial_state
	}
	handleEdit(textValue: string){
		if(this.props.handleEdit)
			this.props.handleEdit(textValue)
		this.setState({textValue: textValue})
	}
	render(){
		return(
			<View style={[global_styles.container,{padding: 20,borderBottomColor: '#979797',borderBottomWidth: 0.7},this.props.style4View]}>
				<Text
					style={styles.label} ref={'label'}>
					{this.label}
				</Text>
				<TextInput
					style={this.multiline?styles.multilineInput:styles.input}
					placeholder={this.placeholder}
					keyboardType={this.keyboardType}
					multiline={this.multiline}
					secureTextEntry={this.secureTextEntry}
					onChangeText={this.handleEdit}
					value={this.state.textValue}
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
					onPress={()=>Alert.alert('Submitted!')}
				>
					<Text style={{color: '#fff',textAlign: 'center', padding: 5}}>Submit</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
)
export default Form
