import { createStore } from 'vuex'
import axios from 'axios';
import * as Mutations from './mutation-types';
import * as Actions from './action-types';
import NProgress from 'nprogress';

const initialStatus = {
  isProcessing: false,
  isProcessed: false,
  error: null,
}

export default createStore({

  state: {
    mails: [],
    profile: {},
    mailsStatus: initialStatus,
    mail: null,
    section: 'inbox',
    selected: [],
    filters: {
      selection: null,
      keyword: null,
    },
  },

  mutations: {

    [Mutations.MAILS_PROCESSING](state) {
      state.mailsStatus = {
        ...initialStatus,
        isProcessing: true,
      };
    },
    [Mutations.MAILS](state, mails) {
      state.mails = mails.sort((a, b) => a.sentAt < b.sentAt ? 1 : -1);
      state.mailsStatus = {
        ...initialStatus,
        isProcessed: true,
      };
    },
    [Mutations.PROFILE](state, profile) {
      state.profile = profile;
      console.log(state.profile);
      state.mailsStatus = {
        ...initialStatus,
        isProcessed: true,
      };
    },
    [Mutations.MAILS_PROCESSING_ERROR](state, error) {
      state.mailsStatus = {
        ...initialStatus,
        error: error,
      };
    },
    [Mutations.SECTION_CHANGE](state, section) {
      state.section = section;
      state.filters.keyword = null;
      state.mail = null;
    },
    [Mutations.SEARCH](state, keyword) {
      state.filters.keyword = keyword;
    },
    [Mutations.MAIL_SELECT](state, mail) {
      state.mail = mail;
    },
    [Mutations.NAVIGATE_BACK](state, mail) {
      state.mail = null;
      state.mails = state.mails.map(m => {
        if (mail.id === m.id) {
          return mail;
        }
        return m;
      });
    },
    [Mutations.MARK_AS_UNREAD](state, mail) {
      state.mail = null;
      state.mails = state.mails.map(m => {
        if (mail.id === m.id) {
          return mail;
        }
        return m;
      });
    },
    [Mutations.MAIL_COMPOSE](state, compose) {
      state.mails.push(compose);
      location.reload();
    },
    [Mutations.MAIL_DELETE](state, mail) {
      state.mail = null;
      state.mails = state.mails.map(m => {
        if (mail.id === m.id) {
          return mail;
        }
        return m;
      });
    },
    [Mutations.ON_MOVE_TO_TRASH](state, checked) {
      state.mails = state.mails.map(m => {
        if (checked.id === m.id) {
          return checked;
        }
        return m;
      })
    },
    [Mutations.ON_MARK_AS_READ](state, markAsRead) {
      state.mails = state.mails.map(m => {
        if (markAsRead.id === m.id) {
          return markAsRead;
        }
        return m;
      })
    },
    [Mutations.MAIL_CHECK](state, e) {
      state.selected = e;
    },
    [Mutations.CHECK_ALL](state, e) {
      state.selected = e
    },
    [Mutations.MAIL_CHECK_READ](state, e) {
      state.selected = [e];
    },
    [Mutations.MAIL_CHECK_UNREAD](state, e) {
      state.selected = [e];
    },
    [Mutations.MAIL_UNCHECK_ALL](state) {
      state.selected = [];
      console.log(state.selected);
    },
    [Mutations.ON_IMPORTANT](state, mail) {
      state.mails = state.mails.map(m => m.id === mail.id ? mail : m);
    },
  },

  getters: {
    selected: state => state.selected,
    title(state) {
      switch (state.section) {
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
    mails(state) {
      return state.mails.filter(m => {
        switch (state.section) {
          case 'inbox':
            return !m.sent && !m.deletedAt;
          case 'sent':
            return m.sent && !m.deletedAt;
          case 'important':
            return m.important && !m.deletedAt;
          case 'trash':
            return m.deletedAt;
          default:
            return m;
        }
      }).filter(m => {
        if (!state.filters.keyword) {
          return m;
        }
        return m.sender.name
          .toLowerCase()
          .includes(state.filters.keyword)
      }).filter(m => {
        switch (state.filters.selection) {
          case 'read':
            return m.readAt;
          case 'unread':
            return !m.readAt;
          default:
            return m;
        }
      });
    },
    sections(state) {
      return [{
        key: 'inbox',
        label: 'Inbox',
        total: state.mails.filter((mail) => {
          return mail.sent === false && mail.deletedAt === null;
        }).length,
        active: state.section === 'inbox',
        icon: 'fa-inbox',
        color: 'label-danger',
      }, {
        key: 'sent',
        label: 'Sent Mails',
        total: state.mails.filter((mail) => {
          return mail.sent === true && mail.deletedAt === null;
        }).length,
        active: state.section === 'sent',
        icon: 'fa-envelope-o',
        color: 'label-success',
      }, {
        key: 'important',
        label: 'Important',
        total: state.mails.filter((mail) => {
          return mail.important === true && mail.deletedAt === null;
        }).length,
        active: state.section === 'important',
        icon: 'fa-bookmark-o',
        color: 'label-info',
      }, {
        key: 'trash',
        label: 'Trash',
        total: state.mails.filter((mail) => {
          return mail.deletedAt !== null;
        }).length,
        active: state.section === 'trash',
        icon: 'fa-inbox',
        color: 'label-default',
      }];
    }
  },

  actions: {

    [Actions.MAILS_LOAD](context) {
      NProgress.start();
      context.commit(Mutations.MAILS_PROCESSING);
      axios.get("http://localhost:3000/mails")
        .then(response => {
          NProgress.done();
          context.commit(Mutations.MAILS, response.data);
        })
        .catch(error => {
          NProgress.done();
          context.commit(Mutations.MAILS_PROCESSING_ERROR, error);
          console.error(error);
        });
    },
    [Actions.PROFILE_LOAD](context) {
      NProgress.start();
      context.commit(Mutations.MAILS_PROCESSING);
      axios.get("http://localhost:3000/profile")
        .then(response => {
          NProgress.done();
          context.commit(Mutations.PROFILE, response.data);
        })
        .catch(error => {
          NProgress.done();
          context.commit(Mutations.MAILS_PROCESSING_ERROR, error);
          console.error(error);
        });
    },
    [Actions.MAIL_DELETE](context, mail) {
      NProgress.start();
      axios.put("http://localhost:3000/mails/" + mail.id, {
        ...mail,
        deletedAt: new Date(),
      })
        .then((response) => {
          NProgress.done();
          context.commit(Mutations.MAIL_DELETE, response.data);
        })
        .catch(error => {
          NProgress.done();
          console.error(error);
        })
    },
    [Actions.ON_MOVE_TO_TRASH](context, checked) {
      NProgress.start();
      checked.forEach(mail => {
        axios.put("http://localhost:3000/mails/" + mail.id, {
          ...mail,
          deletedAt: new Date(),
        })
          .then((res) => {
            NProgress.done();
            context.commit(Mutations.ON_MOVE_TO_TRASH, res.data);
          })
          .catch(error => {
            NProgress.done();
            console.error(error);
          })
      });
    },
    [Actions.ON_MARK_AS_READ](context, markAsRead) {
      NProgress.start();
      markAsRead.forEach(mail => {
        axios.put("http://localhost:3000/mails/" + mail.id, {
          ...mail,
          readAt: new Date(),
        })
          .then((res) => {
            NProgress.done();
            console.log(res);
            context.commit(Mutations.ON_MARK_AS_READ, res.data);
          })
          .catch(error => {
            NProgress.done();
            console.error(error);
          })
      });
    },
    [Actions.NAVIGATE_BACK](context, mail) {
      NProgress.start();
      axios.put("http://localhost:3000/mails/" + mail.id, {
        ...mail,
        readAt: new Date(),
      })
        .then(res => {
          NProgress.done();
          context.commit(Mutations.NAVIGATE_BACK, res.data);
        })
        .catch(error => {
          NProgress.done();
          console.error(error);
        })
    },
    [Actions.MARK_AS_UNREAD](context, mail) {
      NProgress.start();
      axios.put("http://localhost:3000/mails/" + mail.id, {
        ...mail,
        readAt: null,
      })
        .then(res => {
          NProgress.done();
          context.commit(Mutations.MARK_AS_UNREAD, res.data);
        })
        .catch(error => {
          NProgress.done();
          console.error(error);
        })
    },
    [Actions.MAIL_COMPOSE](context, compose) {
      NProgress.start();
      axios.post("http://localhost:3000/mails/", {
        ...compose,
        sentAt: new Date(),
        sent: true,
      })
      .then(res => {
        NProgress.done();
        console.log(res);
        context.commit(Mutations.MAIL_COMPOSE, res.data);
      })
      .catch(error => {
        NProgress.done();
        console.error(error);
      })
    },
    [Actions.ON_IMPORTANT](context, m) {
      NProgress.start();
      axios.put('http://localhost:3000/mails/' + m.id, {
        ...m,
        important: !m.important,
      })
      .then((res) => {
        NProgress.done();
        context.commit(Mutations.ON_IMPORTANT, res.data);
      })
      .catch(error => {
        NProgress.done();
        console.error(error);
      })
    }
  },
  strict: true,
})
