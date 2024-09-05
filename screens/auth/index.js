import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';

import Button from '../../components/Button';

const GetStarted = ({ navigation, route }) => {

    const { t } = route.params;

    return (
        <LinearGradient colors={[Colors.WHITE, Colors.GRAY_LIGHT, Colors.GRAY]} style={styles.container}>
            {/* Body */}

            <View style={styles.HeaderContainer} >

                <Video
                    source={require('../../assets/videos/getStarted.mp4')}
                    rate={1.0}
                    volume={1.0}
                    muted={true}
                    resizeMode={"cover"}
                    repeat
                    style={styles.video}
                />

            </View>


            <View style={styles.bodyContainer} >
                <Text style={[Typography.H2, styles.title]}>{t("Welcome to Pictoria!")}</Text>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
                <Button
                    title={t('Get Started')}
                    tertiary
                    color={Colors.WHITE}
                    onPress={() => navigation.navigate(routes.Home)} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    // Body
    HeaderContainer: {
        flex: 0.8,
        paddingTop: 60,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBotton: 10,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        backgroundColor: Colors.WHITE
    },
    bodyContainer: {
        flex: 0.1,
        paddingBottom: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    title: {
        textAlign: 'center',
        color: Colors.LIGHT_BLACK
    },
    // Footer
    footerContainer: {
        paddingHorizontal: 100,
    },
});

export default GetStarted;
