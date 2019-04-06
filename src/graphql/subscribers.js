let subscribers = {};
export default {
  getItem: (key) => {
     return subscribers[key];
   },
  setItem: (key) => {
    subscribers[key] = true;
    },
  deleteItem: (key) => {
    delete subscribers[key];
  },
  getSubscribers: () => {
    return subscribers;
  }
}