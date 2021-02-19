import React, { useContext, useState } from "react";
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Dimensions
} from "react-native";

const { height, width } = Dimensions.get('screen');

export default function OutOfService({
    isVisible
}) {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
            >
                <View style={[styles.centeredView, { backgroundColor: "rgba(33,44,54,0.9)" }]}>
                    <View style={styles.headerSection}>

                        <Text style={styles.outOfService}>OUT OF SERVICE!</Text>

                    </View>
                    <Image style={styles.gif} source={require('../shared/assets/gif/out-of-service.gif')} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        height: height * 0.9,
        width: width * 0.9,
        backgroundColor: "white",
        borderRadius: 5,
    },
    gif: {
        height: height * 0.6,
        width: width * 0.9,

    },
    headerSection: {
        width: width * 0.9,
        alignItems: 'center',
        height: 33,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center'
    },
    outOfService: {
       borderWidth: 0,
       width: '100%',
       textAlign: 'center',
       fontSize: 25,
       fontWeight: 'bold'
    }

});
