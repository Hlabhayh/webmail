import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    mails: [],
    selectedMails: [],
    filter: 'inbox',
  },
  mutations: {
    mails(state, data) {
      state.mails = data
    },
    onSelectedMails(state, mails) {
      state.selectedMails = mails;
    },
    onSelectedFilter(state, filter) {
      state.filter = filter;
    },
  },
  getters: {
    title(state) {
      switch (state.filter) {
        case 'inbox':
          return 'Inbox';
        case 'sent':
          return 'Sent Mail';
        case 'important':
          return 'Important';
        case 'trash':
          return 'Trash';
     
        default:
          return '';
      }
    },
  },
  actions: {
    getMails(context) {
      axios
      .get("http://localhost:3000/mails")
      .then((response) => {
        context.commit('mails', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  },
  modules: {
  }
})
