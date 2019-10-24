const listItem = {
  border: 'none',
  paddingTop: 6,
  paddingBottom: 8,
};

export default {
  container: {
    width: 200,
    paddingTop: 60,
    paddingBottom: 60,
    height: '100%',
    position: 'fixed',
    overflowY: 'scroll',
  },
  listItem,
  divider: {
    ...listItem,
    padding: 0,
  },
};
