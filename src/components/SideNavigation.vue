<template>
  <div>
    <compose></compose>
    <ul class="inbox-nav inbox-divider">
      <li :class="{active: filter === 'inbox'}">
        <a href="#" @click.prevent="receivedMails"><i class="fa fa-inbox"></i> Inbox 
        <span class="label label-danger pull-right">{{ inboxCounter }}</span>
        </a>
      </li>
      <li :class="{active: filter === 'sent'}">
        <a href="#" @click.prevent="sentMails"><i class="fa fa-envelope-o"></i> Sent Mail 
        <span class="label label-success pull-right">{{ sentCounter }}</span>
        </a>
      </li>
      <li :class="{active: filter === 'important'}">
        <a href="#" @click.prevent="importantMails"><i class="fa fa-bookmark-o"></i> Important 
        <span class="label label-info pull-right">{{ importantCounter }}</span>
        </a>
      </li>
      <li :class="{active: filter === 'trash'}">
        <a href="#" @click.prevent="trashMails"><i class="fa fa-trash-o"></i> Trash 
        <span class="label label-default pull-right">{{ trashCounter }}</span>
        </a>
      </li>
    </ul>
    <ul class="nav nav-pills nav-stacked labels-info inbox-divider">
      <li>
        <h4>Labels</h4>
      </li>
      <li>
        <a href="#"> <i class="fa fa-sign-blank text-danger"></i> Work </a>
      </li>
      <li>
        <a href="#"> <i class="fa fa-sign-blank text-success"></i> Design </a>
      </li>
      <li>
        <a href="#"> <i class="fa fa-sign-blank text-info"></i> Family </a>
      </li>
      <li>
        <a href="#"> <i class="fa fa-sign-blank text-warning"></i> Friends </a>
      </li>

      <li>
        <a href="#"> <i class="fa fa-sign-blank text-primary"></i> Office </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Compose from './Compose';

export default {
  name: "SideNavigation",
  props: {
    mails: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    filter: {
      type: String,
    },
  },
  components: {
    Compose,
  },
  updated() {
    switch (this.filter) {
      case 'inbox':
        this.receivedMails();
        break;
      case 'sent':
        this.sentMails();
        break;
      case 'important':
        this.importantMails();
        break;
      case 'trash':
        this.trashMails();
        break;
    
      default:
        break;
    }
  },
  computed: {
    inbox() {
      return this.mails.filter((mail) => {
        return mail.sent === false && mail.deletedAt === null;
      });
    },
    sent() {
      return this.mails.filter((mail) => {
        return mail.sent === true && mail.deletedAt === null;
      });
    },
    trash() {
      return this.mails.filter((mail) => {
        return mail.deletedAt !== null;
      });
    },
    important() {
      return this.mails.filter((mail) => {
        return mail.important === true && mail.deletedAt === null;
      });
    },
    inboxCounter() {
      return this.inbox.length;
    },
    sentCounter() {
      return this.sent.length;
    },
    trashCounter() {
      return this.trash.length;
    },
    importantCounter() {
      return this.important.length;
    },
  },
  methods: {
    receivedMails() {
      this.$emit('selected-filter', 'inbox')
      this.$emit('selected-mails', this.inbox)
    },
    sentMails() {
      this.$emit('selected-filter', 'sent')
      this.$emit('selected-mails', this.sent);
    },
    importantMails() {
      this.$emit('selected-filter', 'important')
      this.$emit('selected-mails', this.important);
    },
    trashMails() {
      this.$emit('selected-filter', 'trash')
      this.$emit('selected-mails', this.trash);
    },
  },
};
</script>

<style lang="scss">
$color_1: #fff;
$color_4: #6a6a6a;
$color_5: #5c5c5e;
$color_6: #9d9f9e;

ul.inbox-nav {
  display: inline-block;
  margin: 0;
  padding: 0;
  width: 100%;
  li {
    display: inline-block;
    line-height: 45px;
    width: 100%;
    a {
      color: $color_4;
      display: inline-block;
      line-height: 45px;
      padding: 0 20px;
      width: 100%;
      &:hover {
        background: none repeat scroll 0 0 #d5d7de;
        color: $color_4;
      }
      &:focus {
        background: none repeat scroll 0 0 #d5d7de;
        color: $color_4;
      }
      i {
        color: $color_4;
        font-size: 16px;
        padding-right: 10px;
      }
      span.label {
        margin-top: 13px;
      }
    }
  }
  li.active {
    a {
      background: none repeat scroll 0 0 #d5d7de;
      color: $color_4;
    }
  }
}
.inbox-divider {
  border-bottom: 1px solid #d5d8df;
}

ul.labels-info {
  li {
    h4 {
      color: $color_5;
      font-size: 13px;
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 5px;
      text-transform: uppercase;
    }
    margin: 0;
    a {
      border-radius: 0;
      color: $color_4;
      &:hover {
        background: none repeat scroll 0 0 #d5d7de;
        color: $color_4;
      }
      &:focus {
        background: none repeat scroll 0 0 #d5d7de;
        color: $color_4;
      }
      i {
        padding-right: 10px;
      }
    }
  }
}
.nav.nav-pills.nav-stacked.labels-info {
  p {
    color: $color_6;
    font-size: 11px;
    margin-bottom: 0;
    padding: 0 22px;
  }
}
.fileinput-button {
  background: none repeat scroll 0 0 #eeeeee;
  border: 1px solid #e6e6e6;
  float: left;
  margin-right: 4px;
  overflow: hidden;
  position: relative;
  input {
    cursor: pointer;
    direction: ltr;
    font-size: 23px;
    margin: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(-300px, 0px) scale(4);
  }
}
.btn-send {
  background: none repeat scroll 0 0 #00a8b3;
  color: $color_1;
  &:hover {
    background: none repeat scroll 0 0 #00a8b3;
    color: $color_1;
    background: none repeat scroll 0 0 #009da7;
  }
}

</style>