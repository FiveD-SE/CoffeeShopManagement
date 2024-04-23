import { useStyles, createStyleSheet } from "styles";
import { View, Text } from "react-native";
import Icon from "assets/vectors/Icon.svg";

export function Store(props) {
    const { styles, theme } = useStyles(stylesheet);

    return (
        <View style={styles.root} testID={props.testID}>
            <View style={styles.image} testID="2349:4708"></View>
            <View style={styles.content} testID="2349:4709">
                <View style={styles.title} testID="2349:4710">
                    <Text style={styles.theCoffeeHouse} testID="2349:4711">
                        {`THE COFFEE HOUSE`}
                    </Text>
                    <Text style={styles.branchName} testID="2349:4712">
                        {`HCM Đường D1`}
                    </Text>
                </View>
                <Text style={styles.distance} testID="2349:4713">
                    {`Cách đây 3.3 km`}
                </Text>
            </View>
            <View style={styles.button} testID="2349:4721">
                <Icon />
            </View>
        </View>
    );
}

const stylesheet = createStyleSheet((theme) => ({
    root: {
        flexDirection: "row",
        width: 330,
        padding: 15,
        alignItems: "center",
        rowGap: 15,
        columnGap: 15,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 1)",
    },
    image: {
        width: 80,
        height: 80,
        flexShrink: 0,
        borderRadius: 5,
        backgroundColor: "rgba(203, 203, 212, 1)",
    },
    theCoffeeHouse: {
        color: "rgba(58, 58, 58, 0.501960813999176)",
        textAlign: "center",
        fontFamily: "Lato",
        fontSize: 10,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 12,
        textTransform: "uppercase",
    },
    branchName: {
        color: "rgba(58, 58, 58, 1)",
        textAlign: "center",
        fontFamily: "Lato",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: 12,
    },
    content: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        alignSelf: "stretch",
    },
    title: {
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 10,
        columnGap: 10,
    },
    distance: {
        color: "rgba(58, 58, 58, 0.501960813999176)",
        textAlign: "center",
        fontFamily: "Lato",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 12,
    },
    button: {
        flexDirection: "row",
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
    },
}));
