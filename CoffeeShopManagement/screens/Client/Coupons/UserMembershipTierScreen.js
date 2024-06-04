import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView } from 'react-native';
import Bronze from './Membership Type/Bronze';
import Silver from './Membership Type/Silver';
import Gold from './Membership Type/Gold';
import Diamond from './Membership Type/Diamond';


export default function MembershipTier() {
  const [selectedTier, setSelectedTier] = useState(null);

  const handleTierPress = (tier) => {
    setSelectedTier(tier);
  };

  const renderContent = () => {
    switch (selectedTier) {
      case 'Mới':
        return
      case 'Đồng':
        return <Bronze />
      case 'Bạc':
        return <Silver />
      case 'Vàng':
        return <Gold />
      case 'Kim Cương':
        return <Diamond />
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.heading}>
          <View style={styles.card}></View>
        </View>

        <View style={styles.tier}>
          <Pressable onPress={() => handleTierPress('Mới')} style={[styles.tierItem, selectedTier === 'Mới' && styles.selectedItem]}>
            <Text style={[styles.tierText, selectedTier === 'Mới' && styles.selectedText]}>Mới</Text>
          </Pressable>

          <Pressable onPress={() => handleTierPress('Đồng')} style={[styles.tierItem, selectedTier === 'Đồng' && styles.selectedItem]}>
            <Text style={[styles.tierText, selectedTier === 'Đồng' && styles.selectedText]}>Đồng</Text>
          </Pressable>

          <Pressable onPress={() => handleTierPress('Bạc')} style={[styles.tierItem, selectedTier === 'Bạc' && styles.selectedItem]}>
            <Text style={[styles.tierText, selectedTier === 'Bạc' && styles.selectedText]}>Bạc</Text>
          </Pressable>

          <Pressable onPress={() => handleTierPress('Vàng')} style={[styles.tierItem, selectedTier === 'Vàng' && styles.selectedItem]}>
            <Text style={[styles.tierText, selectedTier === 'Vàng' && styles.selectedText]}>Vàng</Text>
          </Pressable>

          <Pressable onPress={() => handleTierPress('Kim Cương')} style={[styles.tierItem, selectedTier === 'Kim Cương' && styles.selectedItem]}>
            <Text style={[styles.tierText, selectedTier === 'Kim Cương' && styles.selectedText]}>Kim Cương</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          {renderContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4F1E9',
  },
  heading: {
    width: '100%',
    height: 250,
    backgroundColor: '#E4F1E9',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    height: 150,
    backgroundColor: '#B2D3CF',
    borderRadius: 20,
  },
  tier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 55,
    paddingHorizontal: 30,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  tierItem: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingBottom: 5,
  },
  selectedItem: {
    borderBottomColor: '#006C5E',
  },
  tierText: {
    fontFamily: 'lato-bold',
    fontSize: 16,
    color: '#000',
    lineHeight: 18
  },
  selectedText: {
    color: '#006C5E',
  },
  content: {
    flex: 1,
    height: 600,
    backgroundColor: 'white',
    padding: 20,
  },
  contentText: {
    fontFamily: 'lato-bold',
    fontSize: 18,
    color: '#333',
    lineHeight: 20
  },
});
