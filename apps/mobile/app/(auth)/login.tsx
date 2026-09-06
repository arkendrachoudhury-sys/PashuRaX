import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>PashuRaX</Text>
      <TextInput style={styles.input} placeholder={t('auth.email')} />
      <TextInput style={styles.input} placeholder={t('auth.password')} secureTextEntry />
      <Button title={t('auth.login')} onPress={() => {}} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: 'white' },
  logo: { fontSize: 32, fontWeight: 'bold', color: 'green', textAlign: 'center', marginBottom: 40 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});
