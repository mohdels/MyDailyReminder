import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/fr-ca';
import momentHijri from 'moment-hijri';

const HeaderMobile = ({ language }) => {
  const formattedDate = useMemo(() => {
    if (language === 'French') {
      const m = moment().locale('fr-ca');
      const weekday = m.format('dddd');
      const day = m.format('D');
      const month = m.format('MMMM');
      const year = m.format('YYYY');
      return `${capitalize(weekday)}, ${day} ${capitalize(month)}, ${year}`;
    }
    return moment().locale('en').format('LLLL').replace(/\d{1,2}:\d{2}:\d{2}\s*(AM|PM)?/, '').replace(/\s*,\s*$/, '');
  }, [language]);

  const hijriDate = useMemo(() => momentHijri().format('iYYYY/iMMMM/iD'), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{language === 'French' ? 'Hadith du Jour' : 'Hadith of the Day'}</Text>
      <Text style={styles.subtitle}>{formattedDate} | {hijriDate}</Text>
    </View>
  );
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#d4af37', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 },
  subtitle: { fontSize: 14, color: '#333', marginTop: 6 },
});

export default HeaderMobile;


