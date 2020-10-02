<template>
  <div class="inbox-body">
    <searchbar 
    :mails="mails" 
    :currentView="currentView" 
    @searching="search($event)"
    >
    </searchbar>
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
      <paginator
        :total="filteredMails.length"
        :per-page="perPage"
        @page="goto($event)"
      ></paginator>
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
       <tbody v-if="filteredMails == !mails"> <h1> NOT FOUNDED ! </h1> </tbody>
    </table>
  </div>
</template>

<script>
import Paginator from "./Paginator";
import Searchbar from "./Searchbar";

export default {
  name: "InboxBody",
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
    showReceivedMails: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    showSentMails: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    showImportantMails: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    showTrashMails: {
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
      keyword: "",
      filteredMails: [],
      currentView: 'Inbox',
    };
  },
  methods: {
    paginate(mails) {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;
      return mails.slice(from, to);
    },
    search(mails) {
      this.filteredMails = mails;
    },
    goto(page) {
      this.page = page + 1;
    },
  },
  watch: {
    mails() {
      this.filteredMails = this.mails.filter((mail) => {
        return mail.sent == false && mail.deletedAt == null
      });
    },
    showReceivedMails() {
      this.filteredMails = this.showReceivedMails;
      this.currentView = 'Inbox';
    },
    showSentMails() {
      this.filteredMails = this.showSentMails;
      this.currentView = 'Sent';
    },
    showImportantMails() {
      this.filteredMails = this.showImportantMails;
      this.currentView = 'Important';
    },
    showTrashMails() {
      this.filteredMails = this.showTrashMails;
      this.currentView = 'Trash';
    },
  },
  computed: {
    paginatedMails() {
      return this.paginate(this.filteredMails);
    },
  },
};
</script>

<style lang="scss">
$color_8: #f78a09;
$color_9: #d5d5d5;
$color_10: #afafaf;

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
      padding: 12px !important;
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
</style>
