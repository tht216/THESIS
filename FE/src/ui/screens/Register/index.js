import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../../themes/Colors';
import {units} from '../../../themes/Units';
import CustomInput from '../../components/CustonInput';
import CustomButton from '../../components/CustomButton';
import SocialMediaCard from '../../components/SocialMediaCard';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styles from './styles';
import CircleImage from '../../../assets/svgs/circle';
import OrangeCircleImage from '../../../assets/svgs/orangeCircle';
// import Loading from '../components/Loading';

const Register = ({navigation}) => {
  // const {loading, createUser} = authFirebase();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const registerIntialValue = {
    email: '',
    password: '',
    rePassword: '',
    name: '',
    phone: '',
  };

  const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not in correct format')
      .required('Email is required'),
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Password must be a minimum of 6 characters')
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords are not the same')
      .required('Confirm password is required'),
  });

  const handleRegister = values => {
    // createUser(values.email, values.password, onClickLogin);
  };

  const onClickLogin = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* {false && <Loading />} */}
      <KeyboardAwareScrollView>
        <View style={styles.imageContainer}>
          <CircleImage />
          <OrangeCircleImage />
        </View>
        <View style={styles.bodyContainer}>
          <View>
            <Formik
              initialValues={registerIntialValue}
              onSubmit={handleRegister}
              validationSchema={registerValidationSchema}>
              {({values, errors, touched, handleChange, handleSubmit}) => (
                <>
                  <Text style={styles.title}>Sign Up</Text>
                  <View style={{marginTop: units.height / 27}}>
                    <Text style={styles.emailText}>E-mail</Text>
                    <CustomInput
                      placeHolder="Your E-mail"
                      type="email-address"
                      value={values.email}
                      onChangeText={handleChange('email')}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={{marginTop: units.height / 32}}>
                    <Text style={styles.emailText}>Name</Text>
                    <CustomInput
                      placeHolder="Your name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                    />
                    {errors.name && touched.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}
                  </View>
                  <View style={{marginTop: units.height / 32}}>
                    <Text style={styles.emailText}>Phone</Text>
                    <CustomInput
                      placeHolder="Your phone"
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                    />
                    {errors.phone && touched.phone && (
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    )}
                  </View>
                  <View style={{marginTop: units.height / 32}}>
                    <Text style={styles.emailText}>Password</Text>
                    <CustomInput
                      placeHolder="Your password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      secure
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={{marginTop: units.height / 32}}>
                    <Text style={styles.emailText}>Re-Password</Text>
                    <CustomInput
                      placeHolder="Re password"
                      value={values.rePassword}
                      onChangeText={handleChange('rePassword')}
                      secure
                    />
                    {errors.rePassword && touched.rePassword && (
                      <Text style={styles.errorText}>{errors.rePassword}</Text>
                    )}
                  </View>
                  <View style={styles.buttonContainer}>
                    <CustomButton title="Sign Up" onPress={handleSubmit} />
                    <View style={styles.loginContainer}>
                      <Text>Already have an account. </Text>
                      <TouchableOpacity onPress={onClickLogin}>
                        <Text style={{color: colors.ORANGE}}>Login</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </Formik>
            <View style={styles.signUpContainer}>
              <View style={styles.line} />
              <Text style={{marginHorizontal: units.width / 16}}>
                Sign up with
              </Text>
              <View style={styles.line} />
            </View>
            <View style={{marginVertical: units.height / 55}}>
              <SocialMediaCard />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;
