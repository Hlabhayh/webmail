<template>
  <div class="inbox-body" >
    <searchbar></searchbar>
    <div class="mail-option">
      <div class="chk-all">
        <input type="checkbox" class="mail-checkbox mail-group-checkbox" @click="onCheckAll" v-model="isChecked" />
        <div class="btn-group" >
          <a data-toggle="dropdown" class="btn mini all"> All
            <i class="fa fa-angle-down"></i>
          </a>
          <div id="box1" >
            <ul class="dropdown-menu">
              <li><a  @click.prevent="onCheckNone"  style="cursor: pointer;"> None</a></li>
              <li><a  @click.prevent="onCheckRead" style="cursor: pointer;"> Read</a></li>
              <li><a  @click.prevent="onCheckUnread" style="cursor: pointer;"> Unread</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <a data-original-title="Refresh" data-placement="top" data-toggle="dropdown" href="/public/index.html" class="btn mini tooltips">
          <i class="fa fa-refresh"></i>
        </a>
      </div>
      <div class="btn-group hidden-phone">
        <a data-toggle="dropdown" class="btn mini blue">
          More
          <i class="fa fa-angle-down"></i>
        </a>
        <div id="box2">
          <ul class="dropdown-menu">
            <li>
              <a @click.prevent="onMarkAsRead" style="cursor: pointer;"><i class="fa fa-pencil"></i> Mark as Read</a>
            </li>
            <li>
              <a href="#" style="cursor: pointer;"><i class="fa fa-ban"></i> Spam</a>
            </li>
            <li class="divider"></li>
            <li>
              <a  @click.prevent="onMoveToTrash" style="cursor: pointer;"><i class="fa fa-trash-o" ></i> Delete</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-group">
        <a data-toggle="dropdown" class="btn mini blue">
          Move to
          <i class="fa fa-angle-down"></i>
        </a>
        <div id="box3">
        <ul class="dropdown-menu">
          <li>
            <a href="#"><i class="fa fa-pencil"></i> Mark as Read</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-ban"></i> Spam</a>
          </li>
          <li class="divider"></li>
          <li>
            <a href="#"><i class="fa fa-trash-o"></i> Delete</a>
          </li>
        </ul>
        </div>
      </div>
      <paginator :total="mails.length" :per-page="perPage" @page="goto($event)" ></paginator>
    </div>
    <table class="table table-inbox table-hover" v-if="!mail">
      <tbody v-for="m in paginatedMails" :key="m.id">   
        <tr :class="{ unread: !m.readAt, read: m.readAt}">
          <td class="inbox-small-cells">
            <input type="checkbox" class="mail-checkbox" @change.prevent="onCheckMail" :value="m"  v-model="checked" :checked="selected[m.id]"/>
          </td>
          <td class="inbox-small-cells">
            <a href="#">
              <i class="fa fa-star" :class="{'inbox-started': m.important }" @click.prevent="OnImportant(m)"  :value="m.id"></i>
            </a>
          </td>
          <td class="view-message dont-show">{{ m.sender.name }}</td>
          <td class="view-message"  @click="onSelectMail(m)">{{ m.subject }}</td>
          <td class="view-message inbox-small-cells">
            <i v-if="m.attachment" class="fa fa-paperclip"></i>
          </td>
          <td class="view-message text-right">{{ m.sentAt }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-inbox table-hover" v-if="mail">
      <tbody>
        <div class="message-box">
          <div class="message-options">
            <button class="btn btn-primary" @click="navigateBack(mail)">
              <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
            </button>
            <button class="btn btn-success" @click="MarkAsUnread(mail)">
              <span class="glyphicon glyphicon-envelope"></span> mark as unread
            </button>
            <button class="btn btn-danger" @click="deleteMail(mail)">
              <span class="btn-label"><i class="glyphicon glyphicon-trash"></i></span> Delete
            </button>
          </div>
          <p><strong>From: </strong>{{ mail.sentAt }}</p>
          <p><strong>Date: </strong>{{ mail.sender.name }}</p>        
          <p><strong>Message :</strong>{{ mail.content }}</p>
          <hr>
          <div class="message"></div>
          <div>
            <h4>{{ mail.attachment }}</h4>
            <ul>
            </ul>
          </div>
        </div>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import {  mapGetters, mapState } from 'vuex';
import Paginator from './Paginator';
import Searchbar from './Searchbar';
import * as Mutations from '../store/mutation-types';
import * as Actions from '../store/action-types';

export default {
  name: 'InboxBody',
  components: {
    Paginator,
    Searchbar,
  },
  data() {
    return {
      page: 1,
      perPage: 20,
      checked: [],
      isChecked: false,
    };
  },
  methods: {
    OnImportant(m) {
      this.$store.dispatch(Actions.ON_IMPORTANT, m)
    },
    onCheckNone() {
      this.checked = [];
      this.isChecked = false;
      this.$store.commit(Mutations.MAIL_UNCHECK_ALL);
    },
    onCheckRead() {
      this.checked = [];
      this.isChecked = false;
      this.checked = this.mails.filter(m => m.readAt);
      this.$store.commit(Mutations.MAIL_CHECK_READ, this.checked);
    },
    onCheckUnread() {
      this.checked = [];
      this.isChecked = false;
      this.checked = this.mails.filter(m => !m.readAt);
      this.$store.commit(Mutations.MAIL_CHECK_UNREAD, this.checked);
    },
    onSelectMail(mail) {
      this.$store.commit(Mutations.MAIL_SELECT, mail);
    },
    onCheckMail() {
      this.isChecked = false;
      this.$store.commit(Mutations.MAIL_CHECK, this.checked);
    },
    onCheckAll() {
      this.isChecked = !this.isChecked;
      this.checked = [];
      if(this.isChecked) {
        this.checked = [...this.mails];  
      }
      this.$store.commit(Mutations.CHECK_ALL,this.checked, this.checked);
    },
    navigateBack(mail) {
      this.$store.dispatch(Actions.NAVIGATE_BACK, mail);
    },
    MarkAsUnread(mail) {
      this.$store.dispatch(Actions.MARK_AS_UNREAD, mail);
    },
    deleteMail(mail) {
      const action = confirm('are you sure you want to delete this mail !');
      if(action) {
        this.$store.dispatch(Actions.MAIL_DELETE, mail);
      }
    },
    onMoveToTrash() {
      const action = confirm('are you sure you want to delete this mails !');
      if(action) {
      this.$store.dispatch(Actions.ON_MOVE_TO_TRASH, this.checked);
      }
    },
    onMarkAsRead() {
      this.$store.dispatch(Actions.ON_MARK_AS_READ, this.checked);
    },
    paginate(mails) {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;
      return mails.slice(from, to);
    },
    goto(page) {
      this.page = page + 1;
    },
  },
  computed: {
    ...mapGetters(['mails', 'selected']),
    ...mapState(['mail',]),

    paginatedMails() {
      return this.paginate(this.mails)
    },
  },
};
</script>

<style lang="scss">
$color_8: #f78a09;
$color_9: #d5d5d5;
$color_10: #5f6169;

.mail-option {
  display: inline-block;
  margin-bottom: 10px;
  width: 100%;
  .chk-all {
    margin-right: 10px;
    background: none repeat scroll 0 0 #fcfcfc;
    border: 1px solid #e7e7e7;
    border-radius: 3px !important;
    color: $color_10;
    display: inline-block;
    padding: 5px 10px;
    input[type="checkbox"] {
      margin-top: 0;
      margin-right: 10px;
    }
  }
  .btn-group {
    margin-right: 10px;
    a.btn {
      background: none repeat scroll 0 0 #fcfcfc;
      border: 1px solid #e7e7e7;
      border-radius: 3px !important;
      color: $color_10;
      display: inline-block;
      padding: 5px 10px;
    }
    a.all {
      border: medium none;
      padding: 0;
    }
  }
}
.inbox-body {
  padding: 20px;
  .modal {
    .modal-body {
      input {
        border: 1px solid #e6e6e6;
        box-shadow: none;
      }
      textarea {
        border: 1px solid #e6e6e6;
        box-shadow: none;
      }
    }
  }
}
.table-inbox {
  border: 1px solid #d3d3d3;
  margin-bottom: 0;
  tr {
    td {
      padding: 10px !important;
      &:hover {
        cursor: pointer;
      }
      .fa-star.inbox-started {
        color: $color_8;
      }
      .fa-star {
        &:hover {
          color: $color_8;
        }
        color: $color_9;
      }
    }
  }
  tr.unread {
    td {
      background: none repeat scroll 0 0 #f7f7f7;
      font-weight: 600;
    }
  }
  h1 {
    text-align: center;
    font-size: 2rem;
    padding-bottom: 10px;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
}
.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
}
.btn-group:hover .dropdown-menu {
  display: block;
}

.message-options {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
.message-box {
  margin: 10px;
}
.select-checkbox {
  align-content: stretch;
}

</style>
