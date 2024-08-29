import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import Google from './../../assets/images/google.png'
import Apple from './../../assets/images/apple.png'

import { Colors, Typography } from '../../styles';

const Button = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={props.secondary ? styles.secondary : props.primary ? styles.primary : styles.tertiary}
            onPress={props.onPress}>
            {props.google ?
                <Image
                    source={Google}
                    style={{
                        alignSelf: "flex-start",
                        height: 20,
                        width: 20,
                        marginRight: 10,
                    }}
                />
                : 
                props.apple ?
                <Image
                    source={Apple}
                    style={{
                        alignSelf: "flex-start",
                        height: 24,
                        width: 20,
                        marginRight: 10,
                    }}
                />
                :
                <></>}
            <Text style={[Typography.H4, { color: props.color ? props.color : Colors.WHITE }]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    primary: {
        padding: 12,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: Colors.GRAY_THIN,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    secondary: {
        padding: 12,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Colors.WHITE,
        backgroundColor: Colors.TRANSPARENT,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    tertiary: {
        padding: 12,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: Colors.PRIMARY,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10
    },
});

export default Button;
