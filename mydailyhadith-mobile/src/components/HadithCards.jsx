import React from 'react';
import { View, Text, StyleSheet, I18nManager } from 'react-native';

const SectionTitle = ({ children, color, rtl }) => (
  <Text style={[styles.sectionTitle, rtl && styles.arabicTitle, { color }]}>{children}</Text>
);

const Card = ({ children, rtl }) => (
  <View style={[styles.cardContainer, rtl && styles.cardRtl]}>
    <View style={styles.card}>{children}</View>
  </View>
);

export const HadithCards = ({ hadeeth, language }) => {
  const isFrench = language === 'French';
  const attributionArOneLine =
    typeof hadeeth.attribution_ar === 'string'
      ? hadeeth.attribution_ar.replace(/\s*\n+\s*/g, ' ')
      : hadeeth.attribution_ar;
  const ensureRtlEnd = (str) => (typeof str === 'string' ? `${str}\u200F` : str);
  return (
    <View style={styles.row}>
      <Card rtl>
        <SectionTitle color="#d4af37" rtl>الحديث</SectionTitle>
        <Text style={[styles.paragraph, styles.arabic, styles.fontArabic]}>{ensureRtlEnd(hadeeth.hadeeth_ar)}{'\n'}</Text>
        <Text style={[styles.meta, styles.arabic]}>
          <Text style={styles.metaBold}>التخريج: </Text>
          {attributionArOneLine}
          {'\n'}
          <Text style={styles.metaBold}>الصحة: </Text>
          {hadeeth.grade_ar}
          {'\n'}
        </Text>
        {hadeeth.explanation_ar ? (
          <>
            <SectionTitle color="#d4af37" rtl>الشرح</SectionTitle>
            <Text style={[styles.paragraph, styles.arabic, styles.fontArabic]}>{ensureRtlEnd(hadeeth.explanation_ar)}{'\n'}</Text>
          </>
        ) : null}
        {Array.isArray(hadeeth.hints_ar) && hadeeth.hints_ar.length > 0 ? (
          <>
            <SectionTitle color="#d4af37" rtl>الفوائد</SectionTitle>
            {hadeeth.hints_ar.map((hint, idx) => (
              <View key={idx} style={[styles.listItemRow, styles.arabicRow]}>
                <Text style={[styles.bullet, styles.arabic]}>•</Text>
                <Text style={[styles.listItem, styles.arabic, styles.fontArabic]}>{hint}</Text>
              </View>
            ))}
          </>
        ) : null}
      </Card>

      <Card>
        <SectionTitle color="#d4af37">{isFrench ? 'Le Hadith' : 'The Hadith'}</SectionTitle>
        <Text style={[styles.paragraph, styles.fontLatin]}>{hadeeth.hadeeth}{'\n'}</Text>
        <Text style={styles.meta}>
          <Text style={styles.metaBold}>{isFrench ? 'Attribution' : 'Attribution'}: </Text>
          {hadeeth.attribution}
          {'\n'}
          <Text style={styles.metaBold}>{isFrench ? 'Classement' : 'Grade'}: </Text>
          {hadeeth.grade}
          {'\n'}
        </Text>
        {hadeeth.explanation ? (
          <>
            <SectionTitle color="#d4af37">{isFrench ? 'Explication' : 'Explanation'}</SectionTitle>
            <Text style={[styles.paragraph, styles.fontLatin]}>{hadeeth.explanation}</Text>
          </>
        ) : null}
        {Array.isArray(hadeeth.hints) && hadeeth.hints.length > 0 ? (
          <>
            <SectionTitle color="#d4af37">{isFrench ? 'Avantages' : 'Benefits'}</SectionTitle>
            {hadeeth.hints.map((hint, idx) => (
              <View key={idx} style={styles.listItemRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.listItem, styles.fontLatin]}>{hint}</Text>
              </View>
            ))}
          </>
        ) : null}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { gap: 12, paddingHorizontal: 16 },
  cardContainer: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  card: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardRtl: { writingDirection: 'rtl' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  paragraph: { fontSize: 15, lineHeight: 30, color: '#111827' },
  arabic: { textAlign: 'right', writingDirection: 'rtl' },
  meta: { fontSize: 13, color: '#6b7280', marginTop: 8 },
  metaBold: { fontWeight: '600' },
  listItem: { fontSize: 15, lineHeight: 30, color: '#111827', flex: 1 },
  arabicTitle: { textAlign: 'right', writingDirection: 'rtl' },
  listItemRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, paddingRight: 0, paddingLeft: 0 },
  arabicRow: { flexDirection: 'row-reverse' },
  bullet: { width: 14, lineHeight: 30, textAlign: 'center' },
  fontArabic: { fontFamily: 'Amiri_400Regular' },
  fontLatin: { fontFamily: 'Merriweather_400Regular' },
});

export default HadithCards;


