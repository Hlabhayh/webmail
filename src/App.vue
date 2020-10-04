<template>
  <div class="container" id="app">
    <div class="mail-box">
      <aside class="sm-side">
        <profile></profile>
        <side-navigation 
        :mails="mails"
        :filter="filter"
        @selected-filter="onSelectedFilter($event)"
        @selected-mails="onSelectedMails($event)"
        >
        </side-navigation>
      </aside>

      <aside class="lg-side">
        <inbox-body :mails="selectedMails" :title="title"></inbox-body>
      </aside>
    </div>
  </div>
</template>
<script>
import Profile from "./components/Profile";
import InboxBody from "./components/InboxBody";
import SideNavigation from "./components/SideNavigation";
import axios from "axios";

export default {
  name: "App",
  components: {
    SideNavigation,
    InboxBody,
    Profile,
  },
  data() {
    return {
      mails: [],
      selectedMails: [],
      filter: 'inbox',
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/mails")
      .then((response) => {
        this.mails = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    onSelectedMails(mails) {
      this.selectedMails = mails;
    },
    onSelectedFilter(filter) {
      this.filter = filter;
    },
  },
  computed: {
    title() {
      switch (this.filter) {
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
  },
};
</script>

<style lang="scss">
$color_1: #fff;
$color_3: #01a7b3;
$color_11: #444;
$color_12: #777;
$color_13: #ff6c60;

.mail-box {
  .user-head {
    background: none repeat scroll 0 0 #00a8b3;
    border-radius: 4px 0 0;
    color: $color_1;
    min-height: 80px;
    padding: 10px;
  }
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
  table-layout: fixed;
  width: 100%;
  aside {
    display: table-cell;
    float: none;
    height: 100%;
    padding: 0;
    vertical-align: top;
  }
  .sm-side {
    background: none repeat scroll 0 0 #e5e8ef;
    border-radius: 4px 0 0 4px;
    width: 25%;
  }
  .lg-side {
    background: none repeat scroll 0 0 #fff;
    border-radius: 0 4px 4px 0;
    width: 75%;
  }
}
a.mail-dropdown {
  background: none repeat scroll 0 0 #80d3d9;
  border-radius: 2px;
  color: $color_3;
  font-size: 10px;
  margin-top: 20px;
  padding: 3px 5px;
}
.btn-compose {
  background: none repeat scroll 0 0 #ff6c60;
  color: $color_1;
  padding: 12px 0;
  text-align: center;
  width: 100%;
  &:hover {
    background: none repeat scroll 0 0 #f5675c;
    color: $color_1;
  }
}
.heading-inbox {
  h4 {
    border-bottom: 1px solid #ddd;
    color: $color_11;
    font-size: 18px;
    margin-top: 20px;
    padding-bottom: 10px;
  }
}
.sender-info {
  margin-bottom: 20px;
  img {
    height: 30px;
    width: 30px;
  }
}
.sender-dropdown {
  background: none repeat scroll 0 0 #eaeaea;
  color: $color_12;
  font-size: 10px;
  padding: 0 3px;
}
.view-mail {
  a {
    color: $color_13;
  }
}
.attachment-mail {
  margin-top: 30px;
  ul {
    display: inline-block;
    margin-bottom: 30px;
    width: 100%;
    li {
      float: left;
      margin-bottom: 10px;
      margin-right: 10px;
      width: 150px;
      img {
        width: 100%;
      }
      span {
        float: right;
      }
    }
  }
  .file-name {
    float: left;
  }
  .links {
    display: inline-block;
    width: 100%;
  }
}
.fileupload-buttonbar {
  .btn {
    margin-bottom: 5px;
  }
  .toggle {
    margin-bottom: 5px;
  }
}
.files {
  .progress {
    width: 200px;
  }
}
.fileupload-processing {
  .fileupload-loading {
    display: block;
  }
}
* {
  html {
    .fileinput-button {
      line-height: 24px;
      margin: 1px -3px 0 0;
    }
  }
  & + html {
    .fileinput-button {
      margin: 1px 0 0;
      padding: 2px 15px;
    }
  }
}
ul {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}
@media (max-width: 767px) {
  .files {
    .btn {
      span {
        display: none;
      }
    }
    .preview {
      * {
        width: 40px;
      }
    }
    .name {
      * {
        display: inline-block;
        width: 80px;
        word-wrap: break-word;
      }
    }
    .progress {
      width: 20px;
    }
    .delete {
      width: 60px;
    }
  }
}
</style>
