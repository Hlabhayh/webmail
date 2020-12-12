<template>
  <div>
    <div class="inbox-body">
      <a data-toggle="modal" title="Compose" class="btn btn-compose"  @click="showModal = !showModal">
        Compose
      </a>
      <!-- Modal -->
      <div aria-labelledby="myModalLabel" role="dialog" id="myModal" v-if="showModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button aria-hidden="true" data-dismiss="modal" class="close" type="button" @click="showModal = !showModal">
                ×
              </button>
              <h4 class="modal-title">Compose</h4>
            </div>
            <div class="modal-body">
              <form role="form" class="form-horizontal" @submit.prevent="sendMessage(compose)">
                <div class="form-group">
                  <label class="col-lg-2 control-label" >To</label>
                  <div class="col-lg-10">
                    <input type="text" placeholder="To" id="inputEmail1" class="form-control" v-model="compose.sender.name"/>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-2 control-label">Subject</label>
                  <div class="col-lg-10">
                    <input type="text" placeholder="Subject" id="inputPassword1" class="form-control" v-model="compose.subject"/>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-2 control-label">Message</label>
                  <div class="col-lg-10">
                    <textarea rows="10" placeholder="write a new message" cols="30" class="form-control" v-model="compose.content"></textarea>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as Actions from '../store/action-types';

export default {
  name: 'compose',
  data() {
    return {
      showModal: false,
      compose: {
        subject: '',
        content: '',
        sender: {
          name: '',
          email: '',
        },
        important: null,
        attachment: null,
        sentAt: null,
        readAt: null,
        deletedAt: null
      }
    };
  },
  methods: {
    sendMessage(compose) {
      console.log(compose);
      this.$store.dispatch(Actions.MAIL_COMPOSE, this.compose);
    }
  },
  computed: {
    ...mapState({profile : state => state.profile})
  },
};
</script>

<style lang="scss">
$font_family_1: "Open Sans", sans-serif;

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
.modal-dialog {
  display:inline-flex;
  position: relative;
}
.modal-content {
  width: 100%;
}
</style>