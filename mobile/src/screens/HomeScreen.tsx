import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { Button } from '@react-native-material/core';
import { studentsAPI } from '../services/api';

const HomeScreen = () => {
  const [data, setData] = useState({
    totalStudents: 0,
    presentToday: 0,
    totalPayments: 0,
    averageAttendance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await studentsAPI.getAll();
      setData({
        totalStudents: response.data.length,
        presentToday: Math.floor(Math.random() * response.data.length),
        totalPayments: response.data.reduce((sum: number, s: any) => sum + s.paidAmount, 0),
        averageAttendance: 85,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏫 نظام إدارة التعليم</Text>
        <Text style={styles.headerSubtitle}>أهلاً وسهلاً</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.card, styles.cardBlue]}>
          <Text style={styles.cardValue}>{data.totalStudents}</Text>
          <Text style={styles.cardLabel}>إجمالي الطلاب</Text>
        </View>
        <View style={[styles.card, styles.cardGreen]}>
          <Text style={styles.cardValue}>{data.presentToday}</Text>
          <Text style={styles.cardLabel}>الحاضرون اليوم</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.card, styles.cardOrange]}>
          <Text style={styles.cardValue}>{data.totalPayments}</Text>
          <Text style={styles.cardLabel}>إجمالي الدفوعات</Text>
        </View>
        <View style={[styles.card, styles.cardPurple]}>
          <Text style={styles.cardValue}>{data.averageAttendance}%</Text>
          <Text style={styles.cardLabel}>متوسط الحضور</Text>
        </View>
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.quickActionsTitle}>الإجراءات السريعة</Text>
        <Button
          title="تسجيل حضور"
          style={styles.actionButton}
        />
        <Button
          title="تسجيل دفعة"
          style={styles.actionButton}
        />
        <Button
          title="إضافة امتحان"
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
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
  header: {
    padding: 20,
    backgroundColor: '#2196F3',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'right',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  card: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBlue: {
    backgroundColor: '#2196F3',
  },
  cardGreen: {
    backgroundColor: '#4CAF50',
  },
  cardOrange: {
    backgroundColor: '#FF9800',
  },
  cardPurple: {
    backgroundColor: '#9C27B0',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  quickActionsContainer: {
    padding: 15,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  actionButton: {
    marginBottom: 10,
    backgroundColor: '#2196F3',
  },
});

export default HomeScreen;
