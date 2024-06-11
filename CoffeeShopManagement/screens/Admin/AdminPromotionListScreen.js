import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/Client/SearchBar";
import PromotionCard from "../../components/Admin/Card/PromotionCard";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseService";
import { useNavigation } from "@react-navigation/native";

const AdminPromotionListScreen = () => {
    const navigation = useNavigation();
    const [promotions, setPromotions] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [sortedPromotions, setSortedPromotions] = useState([]);

    const formatDate = (date) => {
        const d = date.toDate();
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            loadPromotions();
        });

        return unsubscribe;
    }, [navigation]);

    const loadPromotions = async () => {
        try {
            const q = query(collection(db, "promotions"));
            const querySnapshot = await getDocs(q);
            const loadedPromotions = [];
            querySnapshot.forEach((doc) => {
                loadedPromotions.push({
                    id: doc.id,
                    ...doc.data(),
                    dateCreated: formatDate(doc.data().dateCreated),
                });
            });
            setPromotions(loadedPromotions);
        } catch (error) {
            console.log("Error loading promotions:", error);
        }
    };

    useEffect(() => {
        const sortedPromotions = promotions.filter((promotion) =>
            promotion.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setSortedPromotions(sortedPromotions);
    }, [promotions, searchKeyword]);

    const handleSearch = (query) => {
        setSearchKeyword(query);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.searchBar}>
                    <SearchBar onChangeText={handleSearch} />
                </View>
                <ScrollView
                    style={styles.itemListContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {sortedPromotions.map((item) => (
                        <Pressable
                            key={item.id}
                            onPress={() =>
                                navigation.navigate("EditPromotionScreen", {
                                    promotionId: item.id,
                                })
                            }
                        >
                            <PromotionCard
                                promotionName={item.name}
                                imageSource={item.imageUrl}
                                promotionContent={item.content}
                                dateCreated={item.dateCreated}
                            />
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default AdminPromotionListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        margin: "3%",
    },
    itemListContainer: {
        flex: 1,
        marginTop: "2%",
    },
    searchBar: {
        flexDirection: "row",
    },
});
