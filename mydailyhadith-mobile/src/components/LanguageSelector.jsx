import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

const LanguageSelector = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      {['English', 'French'].map((lang) => {
        const selected = value === lang;
        return (
          <Pressable
            key={lang}
            onPress={() => onChange(lang)}
            style={[styles.chip, selected && styles.chipSelected]}
            android_ripple={{ color: '#e5e7eb' }}
          >
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
              {lang}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  chipSelected: {
    backgroundColor: '#1d4ed8',
    borderColor: '#1d4ed8',
  },
  chipText: { fontSize: 13, color: '#374151' },
  chipTextSelected: { color: '#fff', fontWeight: '600' },
});

export default LanguageSelector;


