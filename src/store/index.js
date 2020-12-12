import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    mails: [],
    selectedMails: [],
    filter: 'inbox',
    message: {
      "id": "",
      "subject": "",
      "content": "",
      "sender": {
        "name": "",
        "email": "calderonwilliam@artworlds.com"
      },
      "label": "",
      "spam": false,
      "sent": true,
      "important": false,
      "attachment": null,
      "sentAt": new Date(),
      "readAt": null,
      "deletedAt": null,
    },
  },
  mutations: {
    mails(state, data) {
      state.mails = data
    },
    onSelectedMails(state, mails) {
      state.selectedMails = mails.sort((a, b) => 
      a.sentAt < b.sentAt ? 1 : -1);
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
    sendMessage(state) {
      axios.post('http://localhost:3000/mails', state.message)
      .then(function(){
        console.log('succesfuly sent');
        state.message.subject = '';
        state.message.content = '';
      }
      .bind(state)
    )},
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
    },
  },
  modules: {
  }
})
