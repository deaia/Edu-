import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Button } from '@react-native-material/core';
import { studentsAPI } from '../services/api';

const StudentListScreen = ({ navigation }: any) => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentsAPI.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentPress = (student: any) => {
    navigation.navigate('StudentDetail', { student });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.studentCard}>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{item.fullName}</Text>
              <Text style={styles.studentDetails}>العمر: {item.age}</Text>
              <Text style={styles.studentDetails}>الجنس: {item.gender === 'male' ? 'ذكر' : 'أنثى'}</Text>
            </View>
            <Button
              title="التفاصيل"
              onPress={() => handleStudentPress(item)}
              style={styles.detailButton}
            />
          </View>
        )}
      />
      <Button
        title="+ إضافة طالب جديد"
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentCard: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  studentInfo: {
    flex: 1,
    marginRight: 10,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  studentDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  detailButton: {
    width: 80,
  },
  addButton: {
    margin: 15,
    backgroundColor: '#4CAF50',
  },
});

export default StudentListScreen;
