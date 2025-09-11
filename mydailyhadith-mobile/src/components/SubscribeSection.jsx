import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { subscribeToEmails } from '../utils/api';

const SubscribeSection = ({ language = 'English' }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage(language === 'French' ? '⚠️ Veuillez entrer un email valide.' : '⚠️ Please enter a valid email.');
      return;
    }
    try {
      setLoading(true);
      const res = await subscribeToEmails(email);
      const msg = res?.message || res;
      setMessage(`✅ ${msg}`);
      setEmail('');
    } catch (e) {
      const apiMsg = e?.response?.data?.message;
      setMessage(`❌ ${apiMsg || e.message || (language === 'French' ? 'Échec de l\'abonnement.' : 'Failed to subscribe.')}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{language === 'French' ? 'S’abonner par e-mail' : 'Subscribe via Email'}</Text>
      <View style={styles.row}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={language === 'French' ? 'Votre email' : 'Your email'}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <Pressable onPress={onSubscribe} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? (language === 'French' ? 'Envoi…' : 'Sending…') : (language === 'French' ? 'S’abonner' : 'Subscribe')}</Text>
        </Pressable>
      </View>
      {!!message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#f3f4f6', padding: 12, marginHorizontal: 16, borderRadius: 10, marginVertical: 16 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  button: { backgroundColor: '#1d4ed8', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: '#fff', fontWeight: '600' },
  message: { marginTop: 8, fontSize: 13, color: '#374151' },
});

export default SubscribeSection;


