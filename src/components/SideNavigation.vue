<template>
  <div>
    <div class="inbox-body">
      <a
        href="#myModal"
        data-toggle="modal"
        title="Compose"
        class="btn btn-compose"
      >
        Compose
      </a>
      <!-- Modal -->
      <div
        aria-hidden="true"
        aria-labelledby="myModalLabel"
        role="dialog"
        tabindex="-1"
        id="myModal"
        class="modal fade"
        style="display: none"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                aria-hidden="true"
                data-dismiss="modal"
                class="close"
                type="button"
              >
                ×
              </button>
              <h4 class="modal-title">Compose</h4>
            </div>
            <div class="modal-body">
              <form role="form" class="form-horizontal">
                <div class="form-group">
                  <label class="col-lg-2 control-label">To</label>
                  <div class="col-lg-10">
                    <input
                      type="text"
                      placeholder=""
                      id="inputEmail1"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-2 control-label">Cc / Bcc</label>
                  <div class="col-lg-10">
                    <input
                      type="text"
                      placeholder=""
                      id="cc"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-2 control-label">Subject</label>
                  <div class="col-lg-10">
                    <input
                      type="text"
                      placeholder=""
                      id="inputPassword1"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-2 control-label">Message</label>
                  <div class="col-lg-10">
                    <textarea
                      rows="10"
                      cols="30"
                      class="form-control"
                      id=""
                      name=""
                    ></textarea>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-lg-offset-2 col-lg-10">
                    <span class="btn green fileinput-button">
                      <i class="fa fa-plus fa fa-white"></i>
                      <span>Attachment</span>
                      <input type="file" name="files[]" multiple="" />
                    </span>
                    <button class="btn btn-send" type="submit">Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
    </div>
    <ul class="inbox-nav inbox-divider">
      <li :class="{active: filter === 'inbox'}">
        <a href="#" @click.prevent="receivedMails"><i class="fa fa-inbox"></i> Inbox 
        <span class="label label-success pull-right">{{ InboxCounter }}</span></a>
      </li>
      <li :class="{active: filter === 'sent'}">
        <a href="#" @click.prevent="sentMails"><i class="fa fa-envelope-o"></i> Sent Mail
          <span class="label label-info pull-right">{{ SentCounter }}</span>
        </a>
      </li>
      <li :class="{active: filter === 'important'}">
        <a href="#"  @click.prevent="importantMails"><i class="fa fa-bookmark-o"></i> Important
          <span class="label label-default pull-right">{{ ImportantCounter }}</span>
        </a>
      </li>
      <li :class="{active: filter === 'trash'}">
        <a href="#"  @click.prevent="trashMails"><i class="fa fa-trash-o"></i> Trash
          <span class="label label-danger pull-right">{{ TrashCounter }}</span>
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
  computed: {
    InboxCounter() {
      return this.mails.filter((mail) => {
        return mail.sent === false && mail.deletedAt === null;
        }).length
    },
    SentCounter() {
      return this.mails.filter((mail) => {
        return mail.sent === true && mail.deletedAt === null;
        }).length
    },
    TrashCounter() {
      return this.mails.filter((mail) => {
        return mail.deletedAt !== null;
        }).length
    },
    ImportantCounter() {
      return this.mails.filter((mail) => {
        return mail.important == true && mail.deletedAt === null;
      }).length
    },
  },
  methods: {
    receivedMails() {
      this.$emit('received')
    },
    sentMails() {
      this.$emit('sent');
    },
    importantMails() {
      this.$emit('important');
    },
    trashMails() {
      this.$emit('trash');
    },
  },
};
</script>

<style lang="scss">
$color_1: #fff;
$color_4: #6a6a6a;
$color_5: #5c5c5e;
$color_6: #9d9f9e;
$font_family_1: "Open Sans", sans-serif;

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
.modal-header {
  h4.modal-title {
    font-family: $font_family_1;
    font-weight: 300;
  }
}
.modal-body {
  label {
    font-family: $font_family_1;
    font-weight: 400;
  }
}
</style>