import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SwitchToggle from 'toggle-switch-react-native'

export default function Example() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F7FA' }}>
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.section, { paddingTop: 60 , alignItems: 'center', justifyContent: 'center'}]}>
            <View style={styles.sectionBody}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.profile}>
                <Image
                  alt="avatar"
                  source={{
                    uri: 'https://scontent-sin6-4.xx.fbcdn.net/v/t39.30808-1/393698679_1495878884508043_550350055410841475_n.jpg?stp=dst-jpg_p720x720&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFQrRjJ4jcgm8OBg7oq1eI7I8q4OwXieYQjyrg7BeJ5hD9X8Ob17MNrJO2IF7pH46QHD9cdI-6578xG94UN4G7L&_nc_ohc=uEpw-hwbqVYAb7LoagK&_nc_ht=scontent-sin6-4.xx&oh=00_AfDH00MtvepW5D0qWXtOMEuXwJUyyWmBtxDl9CVNwBYceg&oe=661FF5EA'
                  }}
                  style={styles.profileAvatar} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin chung</Text>

            <View style={styles.row}>
              <View style={[styles.rowLabelText, { width: '48%'}]}>
                <Text style={styles.text}>Nguyen Quoc</Text>
              </View>
              <View style={[styles.rowLabelText, { width: '48%'}]}>
                  <Text style={styles.text}>Thang</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <View style={[styles.rowLabelText, { width: '100%'}]}>
                <Text style={styles.text}>Nam</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <View style={[styles.rowLabelText, { width: '100%'}]}>
                <Text style={styles.text}>01/01/2024</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Số điện thoại</Text>

            <View style={styles.row}>
              <View style={[styles.rowLabelText, { width: '100%'}]}>
                <Image style={{ height: 24, width: 24 }} src='/Users/nguyenquocthang/Documents/COFFEESHOP/CoffeeShopManagement/assets/vietnam.png'/>
                <Text style={styles.text}>0346129897</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Email</Text>

            <View style={styles.row}>
              <View style={[styles.rowLabelText, { width: '100%'}]}>
                <Text style={styles.text}>22521337@gm.uit.edu.vn</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tài khoản liên kết</Text>

            <View style={styles.rowLabelToggle}>

              <View style={styles.rowLabelToggle}>
                <View style={styles.iconContainer}>
                  <FontAwesome name='google' size={32} />
                </View>
                <Text style={styles.text}>Google</Text>
              </View>
              <SwitchToggle
                onColor="#4ECB71"
                offColor="gray"
                labelStyle={{ color: "black", fontWeight: "900" }}
                size='medium'
                value={isToggled}
                onToggle={handleToggle}
              />
            </View>
          </View>


        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
  },
  /** Content */
  content: {
    paddingHorizontal: 15,
  },
  /** Section */
  section: {
    paddingVertical: 10,
  },
  sectionTitle: {
    color: '#000',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold', // Use 'bold' for fontWeight: 600 in React Native
    lineHeight: 20,
    marginBottom: 15
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  /** Profile */
  profile: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
    fontFamily: 'Lato',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
    fontFamily: 'Lato',
  },
  /** Row */
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  rowLabelText: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#EBEBEB',
    borderRadius: 10,
  },
  rowLabelToggle: {
    alignItems: 'center', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },  
  /** button */
  button: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#006C5E',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    width: '100%',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontStyle: 'normal'
  },
  iconContainer: { 
    marginRight: 10,
  },
  text: {
    color: '#000',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});