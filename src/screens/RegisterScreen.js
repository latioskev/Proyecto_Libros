import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

const validateForm = ({ email, password, confirmPassword }) => {
  let errors = {};
  
  if (!email) {
    errors.email = 'El email es requerido';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'El email no es válido';
  }
  
  if (!password) {
    errors.password = 'La contraseña es requerida';
  } else if (!validatePassword(password)) {
    errors.password = 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial';
  }
  
  if (!confirmPassword) {
    errors.confirmPassword = 'Debe confirmar la contraseña';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return errors;
};

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); 

  const handleRegister = async () => {
    setIsLoading(true);

    const formErrors = validateForm({ email, password, confirmPassword });
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false); 
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      setErrors({ general: 'Error al registrarse: ' + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text h3 style={styles.title}>Registro</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors((prev) => ({ ...prev, email: null }));
        }}
        autoCapitalize="none"
        errorMessage={errors.email}
      />
      
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors((prev) => ({ ...prev, password: null }));
        }}
        secureTextEntry
        errorMessage={errors.password}
      />
      
      <Input
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setErrors((prev) => ({ ...prev, confirmPassword: null }));
        }}
        secureTextEntry
        errorMessage={errors.confirmPassword}
      />
      
      {errors.general && <Text style={styles.error}>{errors.general}</Text>}
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Registrarse"
          onPress={handleRegister}
          disabled={isLoading}
          containerStyle={styles.button}
        />
      )}
      
      <Button
        title="Volver al Login"
        type="outline"
        onPress={() => navigation.navigate('Login')}
        disabled={isLoading}
        containerStyle={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
