import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Arrow from '../assets/SVG/arrow-down-drop-circle-outline.svg';
import { theme } from '../core/theme';

//fonte: https://www.youtube.com/watch?v=64czVA1Po8w

const Dropdown = ({
	data = [],
	value = {},
	onSelect = () => { }
}) => {
	console.log('selectedItem', value)
	const [showOption, setShowOption] = useState(false)
	const onSelectItem = (val) => {
		setShowOption(false)
		onSelect(val)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.dropDownStyle}
				activeOpacity={0.8}
				onPress={() => setShowOption(!showOption)}>

				<Text>{!!value ? value?.value : `Escolha uma opção`}</Text>
				<Arrow width="20" height="20" fill="#203C01" style={{ transform: [{ rotate: showOption ? '180deg' : '0deg' }] }} />
			</TouchableOpacity >

			{showOption && (<View style={{
				padding: 8,
				borderRadius: 6,
				backgroundColor: theme.colors.octonary
				}}>
				{data.map((val, i) => {
					return (
						<TouchableOpacity
							key={String(i)}
							onPress={() => onSelectItem(val)}
							style={{
								...styles.selectedItemStyle,
								backgroundColor: value ? value.id == val.id ? theme.colors.octonary : 'white' : 'white',
								
							}}>
							<Text> {val.value} </Text>
						</TouchableOpacity>

					)
				})}
			</View>)}

		</View>
	);

};


const styles = StyleSheet.create({
	container: {

	},
	dropDownStyle: {
		backgroundColor: theme.colors.octonary,
		padding: 8,
		borderRadius: 6,
		minHeight: 42,
		justifyContent: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 6,
		fontSize: 12

	},
	selectedItemStyle :{
		paddingVertical: 8,
		borderRadius: 4,
		paddingHorizontal: 6,
		marginBottom: 4
	}
})

export default Dropdown;
