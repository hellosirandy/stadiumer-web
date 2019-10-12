const listItem = {
  border: 'none',
  paddingTop: 6,
  paddingBottom: 8,
};

export default {
  container: {
    width: 240,
    paddingTop: 60,
    height: '100%',
    position: 'fixed',
    // backgroundColor: '#f8f9fa',
  },
  listItem,
  divider: {
    ...listItem,
    padding: 0,
  },
};
