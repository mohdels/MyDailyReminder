import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnnouncementBanner = ({ language }) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>
        {language === 'French'
          ? '🚀 Cette application est encore en amélioration'
          : '🚀 This application is still being improved'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: { backgroundColor: '#d4af37', paddingVertical: 6, paddingHorizontal: 12 },
  bannerText: { textAlign: 'center', color: '#111827', fontWeight: '600' },
});

export default AnnouncementBanner;


