<template>
  <div class="inbox-body">
    <searchbar :mails="mails" @searching="search($event)"></searchbar>
    <div class="mail-option">
      <div class="chk-all">
        <input type="checkbox" class="mail-checkbox mail-group-checkbox" />
        <div class="btn-group">
          <a
            data-toggle="dropdown"
            href="#"
            class="btn mini all"
            aria-expanded="false"
          >
            All
            <i class="fa fa-angle-down"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#"> None</a></li>
            <li><a href="#"> Read</a></li>
            <li><a href="#"> Unread</a></li>
          </ul>
        </div>
      </div>

      <div class="btn-group">
        <a
          data-original-title="Refresh"
          data-placement="top"
          data-toggle="dropdown"
          href="#"
          class="btn mini tooltips"
        >
          <i class="fa fa-refresh"></i>
        </a>
      </div>
      <div class="btn-group hidden-phone">
        <a
          data-toggle="dropdown"
          href="#"
          class="btn mini blue"
          aria-expanded="false"
        >
          More
          <i class="fa fa-angle-down"></i>
        </a>
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
      <div class="btn-group">
        <a data-toggle="dropdown" href="#" class="btn mini blue">
          Move to
          <i class="fa fa-angle-down"></i>
        </a>
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
      <paginator :total="filteredMails.length" :per-page="perPage" @page="goto($event)"></paginator>
    </div>
    <table class="table table-inbox table-hover">
      <tbody v-for="mail in paginatedMails" :key="mail">
        <tr :class="{ unread: mail.readAt == null, read: mail.readAt != null }">
          <td class="inbox-small-cells">
            <input type="checkbox" class="mail-checkbox" />
          </td>
          <td class="inbox-small-cells"><i class="fa fa-star"></i></td>
          <td class="view-message dont-show">{{ mail.sender.name }}</td>
          <td class="view-message">{{ mail.subject }}</td>
          <td class="view-message inbox-small-cells">
            <i :class="{ 'fa fa-paperclip': mail.attachment != null }"></i>
          </td>
          <td class="view-message text-right">{{ mail.sentAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Paginator from './Paginator';
import Searchbar from './Searchbar';

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
  },
  data() {
    return {
      page: 1,
      perPage: 20,
      keyword: '',
      filteredMails: [],
    };
  },
  methods: {
    paginate(mails) {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;
      return mails.slice(from, to);
    },
    search(mails) {
      this.filteredMails = mails
    },
    goto(page) {
      this.page = page + 1;
      console.log(this.page);
    }
  },
  watch: {
    mails() {
      this.filteredMails = this.mails;
    },
  },

  computed: {
    paginatedMails() {
      return this.paginate(this.filteredMails);
    }
  }
};
</script>

<style>
.inbox-body {
  padding: 20px;
}
.inbox-head {
  background: none repeat scroll 0 0 #41cac0;
  border-radius: 0 4px 0 0;
  color: #fff;
  min-height: 80px;
  padding: 20px;
  margin-top: -20px;
  margin-left: -20px;
  margin-bottom: 10px;
}
.inbox-head h3 {
  display: inline-block;
  font-weight: 300;
  margin: 0;
  padding-top: 6px;
}
.inbox-head .sr-input {
  border: medium none;
  border-radius: 4px 0 0 4px;
  box-shadow: none;
  color: #8a8a8a;
  float: left;
  height: 40px;
  padding: 0 10px;
}
.inbox-head .sr-btn {
  background: none repeat scroll 0 0 #00a6b2;
  border: medium none;
  border-radius: 0 4px 4px 0;
  color: #fff;
  height: 40px;
  padding: 0 20px;
}
.table-inbox {
  border: 1px solid #d3d3d3;
  margin-bottom: 0;
}
.table-inbox tr td {
  padding: 12px !important;
}
.table-inbox tr td:hover {
  cursor: pointer;
}
.table-inbox tr td .fa-star.inbox-started,
.table-inbox tr td .fa-star:hover {
  color: #f78a09;
}
.table-inbox tr td .fa-star {
  color: #d5d5d5;
}
.table-inbox tr.unread td {
  background: none repeat scroll 0 0 #f7f7f7;
  font-weight: 600;
}
ul.inbox-pagination {
  float: right;
}
ul.inbox-pagination li {
  float: left;
}
.mail-option {
  display: inline-block;
  margin-bottom: 10px;
  width: 100%;
}
.mail-option .chk-all,
.mail-option .btn-group {
  margin-right: 5px;
  padding-left: 10px;
}
.mail-option .chk-all,
.mail-option .btn-group a.btn {
  background: none repeat scroll 0 0 #fcfcfc;
  border: 1px solid #e7e7e7;
  border-radius: 3px !important;
  color: #afafaf;
  display: inline-block;
  padding: 5px 10px;
}
.inbox-pagination a.np-btn {
  background: none repeat scroll 0 0 #fcfcfc;
  border: 1px solid #e7e7e7;
  border-radius: 3px !important;
  color: #afafaf;
  display: inline-block;
  padding: 5px 15px;
}
.mail-option .chk-all input[type="checkbox"] {
  margin-top: 0;
}
.mail-option .btn-group a.all {
  border: medium none;
  padding: 1;
}
.inbox-pagination a.np-btn {
  margin-left: 5px;
}
.inbox-pagination li span {
  display: inline-block;
  margin-right: 5px;
  margin-top: 7px;
}
</style>
