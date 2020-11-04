import { createStore } from 'vuex'
import axios from 'axios';
import randomMessages from '../data/randome-messages';

export default createStore({
  state: {
    mails :[],
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
    checked: [],
    allSelected: false,
  },
  mutations: {
    mails(state, data) {
      state.mails = data;
    },
    theSelectedMails(state, mail) {
      state.selectedMails = mail.sort((a, b) => 
      a.sentAt < b.sentAt ? 1 : -1);
    },
    theSelectedFilter(state, filter) {
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
    refresh(state){
      let randomIndex = Math.floor(Math.random() * randomMessages.length);
      let temp = [randomMessages[randomIndex]];
      state.mails = temp.concat(state.mails.slice(0));
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
    showAll(state) {
      state.selectedMails = state.mails;
    },
    showRead(state) {
      state.selectedMails = state.mails.filter(mail => {return mail.readAt !== null })
    },
    showUnread(state) {
      state.selectedMails = state.mails.filter(mail => {return mail.readAt === null })
    },
    selectAll(state){ 
      state.allSelected = !state.allSelected; 
      state.checked = [];
      if(state.allSelected){
        state.checked = state.selectedMails.map(m => m.id);
      }
    },
    markAsRead(state) {
      state.checked.map(mail => { 
        mail.readAt = new Date();
      })
    },
    remove(state) {
      state.checked.map((mail) => {
          mail.deletedAt = new Date();
      })
     },
  },
  actions: {
    getMails(context) {
      axios.get("http://localhost:3000/mails")
      .then(response => {
        context.commit('mails', response.data);
      })
      .catch(error => {
        console.error(error);
      });
    },
    deleteMail(context, mail) {
      axios.put("http://localhost:3000/mails/" + mail.id, mail)
      .then(() => {
        context.commit('deletedMail', mail)
      })
      .catch(error => {
        console.error(error);
      })
    }
  },
  modules: {
  }
})
