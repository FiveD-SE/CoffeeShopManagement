import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TextInput, 
  Pressable 
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.section}>
          <View style={styles.rowLabelText}>
            <TextInput
              style={styles.input}
              onChangeText={setOldPassword}
              value={oldPassword}
              placeholder="Mật khẩu cũ"
              secureTextEntry={!showOldPassword}
            />
            <Pressable onPress={toggleOldPasswordVisibility}>
              <Feather 
                name={showOldPassword ? 'eye' : 'eye-off'} 
                size={25} 
                style={styles.icon} 
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.rowLabelText}>
            <TextInput
              style={styles.input}
              onChangeText={setNewPassword}
              value={newPassword}
              placeholder="Mật khẩu mới"
              secureTextEntry={!showNewPassword}
            />
            <Pressable onPress={toggleNewPasswordVisibility}>
              <Feather 
                name={showNewPassword ? 'eye' : 'eye-off'} 
                size={25} 
                style={styles.icon} 
              />
            </Pressable>
          </View>
        </View>

        <Text style={styles.passwordRequirement}>Mật khẩu cần dài ít nhất 8 ký tự</Text>

        <View style={styles.section}>
          <View style={styles.rowLabelText}>
            <TextInput
              style={styles.input}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Nhập lại mật khẩu mới"
              secureTextEntry={!showConfirmPassword}
            />
            <Pressable onPress={toggleConfirmPasswordVisibility}>
              <Feather 
                name={showConfirmPassword ? 'eye' : 'eye-off'} 
                size={25} 
                style={styles.icon} 
              />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  section: {
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  passwordRequirement: {
    marginBottom: 20,
    fontSize: 14,
    color: '#9C9C9C',
    fontFamily: 'Lato-Regular',
  },
  button: {
    backgroundColor: '#3A3A3A',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
  },
  rowLabelText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#9C9C9C',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  icon: {
    color: '#3A3A3A',
    marginRight: 15,
  },
});

export default ChangePassword;
