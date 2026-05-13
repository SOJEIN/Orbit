import { StyleSheet } from 'react-native';

export const calendarStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F6FF',
  },

  calendarWrap: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },

  sectionSubtitle: {
    fontSize: 12,
    color: '#A0A0B0',
    marginTop: 2,
    textTransform: 'capitalize',
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },

  emptyText: {
    fontSize: 14,
    color: '#B0ACFF',
    marginTop: 8,
  },

  // TaskCard (mismo diseño que Tasks)
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  cardCompleted: {
    opacity: 0.45,
  },

  cardContent: {
    flex: 1,
    marginLeft: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
  },

  cardTitleDone: {
    textDecorationLine: 'line-through',
    color: '#B0ACFF',
  },

  cardMeta: {
    fontSize: 12,
    color: '#A0A0B0',
    marginTop: 3,
  },

  cardBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 8,
  },

  cardBadgeDaily: {
    backgroundColor: '#EEF0FF',
  },

  cardBadgeOnce: {
    backgroundColor: '#FFF0F0',
  },

  cardBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },

  cardBadgeTextDaily: {
    color: '#6C63FF',
  },

  cardBadgeTextOnce: {
    color: '#FF6B6B',
  },
});
