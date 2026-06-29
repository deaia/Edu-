import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button } from '@react-native-material/core';

const StudentDetailScreen = ({ route }: any) => {
  const { student } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.studentName}>{student.fullName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>البيانات الشخصية</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>اسم الأب:</Text>
          <Text style={styles.value}>{student.fatherName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>اسم الأم:</Text>
          <Text style={styles.value}>{student.motherName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>اللقب:</Text>
          <Text style={styles.value}>{student.familyName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>الجنس:</Text>
          <Text style={styles.value}>{student.gender === 'male' ? 'ذكر' : 'أنثى'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>العمر:</Text>
          <Text style={styles.value}>{student.age}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>معلومات التواصل</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>هاتف الطالب:</Text>
          <Text style={styles.value}>{student.studentPhone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>هاتف الوالد:</Text>
          <Text style={styles.value}>{student.parentPhone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>العنوان:</Text>
          <Text style={styles.value}>{student.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>معلومات الدفع</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>إجمالي الرسوم:</Text>
          <Text style={styles.value}>{student.totalFees}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>المدفوع:</Text>
          <Text style={styles.value}>{student.paidAmount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>المتبقي:</Text>
          <Text style={[styles.value, styles.remaining]}>
            {student.totalFees - student.paidAmount}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="تعديل" style={styles.button} />
        <Button title="حذف" style={[styles.button, styles.deleteButton]} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    alignItems: 'center',
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  remaining: {
    color: '#FF9800',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  button: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
});

export default StudentDetailScreen;
