import { StyleSheet } from 'react-native';

export const tasksStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F6FF',
  },

  header: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },

  headerGreeting: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
  },

  headerDate: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },

  headerStats: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 6,
  },

  list: {
    padding: 16,
    paddingBottom: 100,
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },

  emptyText: {
    fontSize: 15,
    color: '#B0ACFF',
    marginTop: 8,
  },

  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },

  fabText: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 32,
  },

  // TaskCard
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  cardCompleted: {
    opacity: 0.5,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6C63FF',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxDone: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },

  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },

  cardContent: {
    flex: 1,
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
    marginLeft: 10,
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
    letterSpacing: 0.3,
  },

  cardBadgeTextDaily: {
    color: '#6C63FF',
  },

  cardBadgeTextOnce: {
    color: '#FF6B6B',
  },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    backgroundColor: '#F7F6FF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    paddingBottom: 40,
  },

  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D0CEFF',
    alignSelf: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 20,
  },

  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },

  typeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#EBEBFF',
  },

  typeBtnActive: {
    backgroundColor: '#6C63FF',
  },

  typeBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C63FF',
  },

  typeBtnTextActive: {
    color: '#fff',
  },

  dateBtn: {
    backgroundColor: '#EBEBFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateBtnText: {
    fontSize: 14,
    color: '#4A4A6A',
    fontWeight: '600',
    marginLeft: 8,
  },
});
