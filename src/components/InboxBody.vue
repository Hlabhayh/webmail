<template>
  <div class="inbox-body" >
    <searchbar :mails="mails" :title="title" @searching="search($event)"></searchbar>
    <div class="mail-option">
      <div class="chk-all">
        <input type="checkbox" class="mail-checkbox mail-group-checkbox" @click="selectAll" v-model="$store.state.allSelected"/>
        <div class="btn-group" >
          <a data-toggle="dropdown" class="btn mini all" onclick="document.getElementById('box1').style.display = 'block'">
            All
            <i class="fa fa-angle-down"></i>
          </a>
          <div id="box1" v-show="show">
            <ul class="dropdown-menu">
              <li><a href="#" @click="showAll"> None</a></li>
              <li><a href="#" @click="showRead"> Read</a></li>
              <li><a href="#" @click="showUnread"> Unread</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <a data-original-title="Refresh" data-placement="top" data-toggle="dropdown" href="/public/index.html" class="btn mini tooltips" @click.prevent.stop="refresh">
          <i class="fa fa-refresh"></i>
        </a>
      </div>
      <div class="btn-group hidden-phone">
        <a data-toggle="dropdown" class="btn mini blue" onclick="document.getElementById('box2').style.display = 'block'">
          More
          <i class="fa fa-angle-down"></i>
        </a>
        <div id="box2"  v-show="show">
          <ul class="dropdown-menu">
            <li>
              <a href="#" @click="markAsRead"><i class="fa fa-pencil"></i> Mark as Read</a>
            </li>
            <li>
              <a href="#"><i class="fa fa-ban"></i> Spam</a>
            </li>
            <li class="divider"></li>
            <li>
              <a href="#" @click="remove"><i class="fa fa-trash-o"></i> Delete</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-group">
        <a data-toggle="dropdown" class="btn mini blue" onclick="document.getElementById('box3').style.display = 'block'">
          Move to
          <i class="fa fa-angle-down"></i>
        </a>
        <div id="box3" v-show="show">
        <ul class="dropdown-menu">
          <li>
            <a href="#"><i class="fa fa-pencil"></i> Mark as Read</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-ban"></i> Spam</a>
          </li>
          <li class="divider"></li>
          <li>
            <a href="#" @click="fullRemove"><i class="fa fa-trash-o"></i> Delete</a>
          </li>
        </ul>
        </div>
      </div>
      <paginator :total="filteredMails.length" :per-page="perPage" @page="goto($event)" ></paginator>
    </div>
    <table class="table table-inbox table-hover">
      <tbody v-show="!viewMessage" v-for="mail in paginatedMails" :key="mail">   
        <tr :class="{ unread: mail.readAt === null, read: mail.readAt !== null }">
          <td class="inbox-small-cells">
            <input type="checkbox" class="mail-checkbox" v-model="$store.state.checked" :value="mail.id"/>
          </td>
          <td class="inbox-small-cells">
            <a href="#" v-if="typeof mail.important !== true" @click.prevent.stop="mail.important = !mail.important">
              <i :class="['fa', 'fa-star', { 'inbox-started': mail.important }]"></i></a>
          </td>
          <td class="view-message dont-show">{{ mail.sender.name }}</td>
          <td class="view-message"  @click="showMessage(mail)">{{ mail.subject }}</td>
          <td class="view-message inbox-small-cells">
            <i :class="{ 'fa fa-paperclip': mail.attachment !== null }"></i>
          </td>
          <td class="view-message text-right">{{ mail.sentAt }}</td>
        </tr>
      </tbody>
      <tbody v-if="filteredMails == !mails && filteredMails != !viewMessage">
        <h1>NOT FOUND</h1>
      </tbody>
      <tbody v-if="viewMessage" >
        <div class="message-box" v-for="message in messages" :key="message">
          <div class="message-options">
            <button class="btn btn-primary" @click="navigateBack">
              <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
            </button>
            <button class="btn btn-danger" @click="deleteMessage">
              <span class="btn-label"><i class="glyphicon glyphicon-trash"></i></span> Delete
            </button>
          </div>
          <p><strong>From: </strong>{{ message.sentAt }}</p>
          <p><strong>Date: </strong>{{ message.sender.name }}</p>        
          <p><strong>Message :</strong>{{ message.content }}</p>
          <hr>
          <div class="message"></div>
          <div>
            <h4>{{ message.attachment }}</h4>
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

var boxes = ['box1', 'box2', 'box3'];
  window.addEventListener('mouseup', (e) => {
    for(var i=0; i < boxes.length; i++) {
      var box = document.getElementById(boxes[i]);
      if(e.target != box && e.target.parentNode != box) {
        box.style.display = 'none';
      }
    }
  });

export default {
  name: 'InboxBody',
  components: {
    Paginator,
    Searchbar,
  },
  props: {
    mails: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      page: 1,
      perPage: 20,
      filteredMails: [],
      show: false,
      viewMessage: false,
      messages: [],

    };
  },
  methods: {
    ...mapGetters(['showAll','showRead','showUnread','markAsRead','selectAll','markAsRead','remove','refresh']),

    showMessage(mail) {
      this.messages.push(mail);
      this.filteredMails = this.messages; 
      this.messages.map(mail => { return mail.readAt = new Date()});
      this.viewMessage = true;
    },
    navigateBack() {
      this.filteredMails = this.mails;
      this.messages = [];
      this.viewMessage = false;
    },
    deleteMessage() {
      alert('are you sure you want to delete this mail !');
      this.viewMessage = false;
      this.messages.map(mail => { return mail.deletedAt = new Date()});
      this.filteredMails = this.mails;
      this.messages = [];
      this.$store.dispatch('deleteMail');
    },
    paginate(mails) {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;
      return mails.slice(from, to);
    },
    goto(page) {
      this.page = page + 1;
    },
    search(mails) {
      this.filteredMails = mails;
    },
  },
  watch: {
    mails() {
      this.filteredMails = this.mails
    },
  },
  computed: {
    ...mapState(['checked']),

    paginatedMails() {
      return this.paginate(this.filteredMails)
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
  display: inline-block;
  width: auto;
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
