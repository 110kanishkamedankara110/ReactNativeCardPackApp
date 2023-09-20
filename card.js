import { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated, PanResponder, Image, Dimensions } from "react-native";
const { width: wWidth, height } = Dimensions.get("window");

const aspectRatio = 722 / 368;
const CARD_WIDTH = wWidth - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const IMAGE_HEIGHT = IMAGE_WIDTH * aspectRatio;

export function Card(props) {
    const rotX = useRef(new Animated.Value(1)).current;
    const rotZ = useRef(new Animated.Value(1)).current;
    const loc = useRef(new Animated.ValueXY({ x: 0, y: -height })).current;
    const pan = useRef(
        PanResponder.create(
            {
                onMoveShouldSetPanResponder: () => true,
                onStartShouldSetPanResponder: () => true,
                onPanResponderStart: (event, state) => {
                    Animated.parallel([
                        Animated.timing(rotX, {
                            toValue: 1,
                            useNativeDriver: true,
                            duration: 200,
                        }).start(),
                        Animated.timing(rotZ, {
                            toValue: 1,
                            useNativeDriver: true,
                            duration: 200,
                        }).start(),
                    ]);

                },
                onPanResponderMove: (event, state) => {
                    loc.setValue({ x: state.dx, y: state.dy });
                },
                onPanResponderRelease: (event, state) => {
                    let x = 0;
                    if (state.dx < -wWidth + (CARD_WIDTH) || state.dx > wWidth - (CARD_WIDTH)) {

                        if (state.dx < -wWidth + (CARD_WIDTH)) {
                            x = -wWidth;
                        } else if (state.dx > wWidth - (CARD_WIDTH)) {
                            x = wWidth;
                        } else {
                            x = 0;
                        }
                    }


                    Animated.parallel([
                        Animated.timing(rotX, {
                            toValue: 0,
                            useNativeDriver: true,
                            duration: 200,
                        }).start(),
                        Animated.spring(loc, {
                            toValue: ({ x: x, y: 0 }),
                            useNativeDriver: true,
                            bounciness: 5,
                        }).start(
                            () => {

                                if (props.index == 0) {
                                    props.setSuffle(true);
                                }
                            }
                        ),
                        Animated.timing(rotZ, {
                            toValue: 0,
                            useNativeDriver: true,
                            duration: 200,
                        }).start(),
                    ]);



                }
            }
        )
    ).current;

    useEffect(() => {
        reload();
    }, []);

    useEffect(() => {
        if (props.suffle) {
            reload();
            props.setSuffle(false);
        }
    });

    function reload() {
        Animated.parallel([
            Animated.timing(rotX, {
                toValue: 0,
                useNativeDriver: true,
                duration: 200,
                delay: props.index * 100,
            }).start(),
            Animated.spring(loc, {
                toValue: ({ x: 0, y: 0 }),
                useNativeDriver: true,
                delay: props.index * 100,
                bounciness: 5,
            }).start(),
            Animated.timing(rotZ, {
                toValue: 0,
                useNativeDriver: true,
                duration: 200,
                delay: props.index * 100,
            }).start(),
        ]);
    }

    const ui = (
        <View style={styles.container} pointerEvents="box-none">

            <Animated.View {...pan.panHandlers} style={[styles.card, {
                transform: [
                    {
                        rotateX: rotX.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["30deg", "0deg"]
                        }),
                    }
                    ,
                    {
                        rotateZ: rotZ.interpolate({
                            inputRange: [0, 1],
                            outputRange: [Math.random() * 20 - 10 + "deg", "0deg"],
                        }),
                    },
                    {
                        translateX: loc.x
                    },
                    {
                        translateY: loc.y
                    },
                    {
                        scale: rotZ.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1]
                        })
                    }

                ],
                zIndex:rotX.interpolate({
                    inputRange:[0,1],
                    outputRange:[1,99999],
                })
            }]}>
                <Image
                    source={props.image}
                    style={{
                        width: IMAGE_WIDTH,
                        height: IMAGE_WIDTH * aspectRatio,
                        backgroundColor: "white"
                    }}
                    resizeMode="contain"
                />
            </Animated.View>

        </View>

    );



    return ui;
}


const styles = StyleSheet.create(
    {
        container: {
            ...StyleSheet.absoluteFillObject,
            // position:"absolute",
            justifyContent: "center",
            alignItems: "center",
            
        },
        card: {
            backgroundColor: "white",
            borderRadius: 10,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            justifyContent: "center",
            alignItems: "center",
        },
    }
);