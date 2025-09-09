import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, ScrollView, RefreshControl, ImageBackground } from 'react-native';
import LanguageSelector from '../components/LanguageSelector';
import { fetchHadeeth } from '../utils/api';
import HeaderMobile from '../components/HeaderMobile';
import AnnouncementBanner from '../components/AnnouncementBanner';
import HadithCards from '../components/HadithCards';
import SubscribeSection from '../components/SubscribeSection';

const HadithScreen = () => {
  const [language, setLanguage] = useState('English');
  const [hadeeth, setHadeeth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const load = async (lang) => {
    try {
      setLoading(true);
      const data = await fetchHadeeth(lang);
      setHadeeth(data);
      setError('');
    } catch (e) {
      setError('Failed to fetch the Hadeeth. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(language);
  }, [language]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load(language);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ImageBackground source={require('../../assets/DotR.jpg')} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay}>
      <AnnouncementBanner language={language} />
      <HeaderMobile language={language} />
      <View style={styles.controls}>
        <Text style={styles.label}>Language</Text>
        <LanguageSelector value={language} onChange={setLanguage} />
      </View>

      {loading ? (
        <View style={styles.center}> 
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.center}> 
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <HadithCards hadeeth={hadeeth} language={language} />
          <SubscribeSection language={language} />
        </ScrollView>
      )}
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(255,255,255,0.5)' },
  controls: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  label: { fontSize: 14, color: '#555', marginBottom: 6 },
  picker: { },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { },
  meta: { fontSize: 14, color: '#555', marginTop: 8 },
  metaBold: { fontWeight: '600' },
});

export default HadithScreen;



