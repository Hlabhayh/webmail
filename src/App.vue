<template>
  <div class="container" id="app">

        <div class="mail-box">

            <aside class="sm-side">
              <profile></profile>
              <side-navigation></side-navigation>
            </aside>

            <aside class="lg-side">
                <inbox-head></inbox-head>
                <inbox-body></inbox-body>
            </aside>

        </div>

    </div>
</template>
<script>

import profile from './components/Profile'
import InboxHead from './components/InboxHead'
import InboxBody from './components/InboxBody'
import SideNavigation from './components/SideNavigation'

export default {
  components: {
    SideNavigation,
    InboxBody,
    InboxHead,
    profile
  }
}
</script>

<style>
.mail-box {
  border-collapse: collapse;
  border-spacing: 0;
  display: table;
  table-layout: fixed;
  width: 100%;
}
.mail-box aside {
  display: table-cell;
  float: none;
  height: 100%;
  padding: 0;
  vertical-align: top;
}
.mail-box .sm-side {
  background: none repeat scroll 0 0 #e5e8ef;
  border-radius: 4px 0 0 4px;
  width: 25%;
}
.mail-box .lg-side {
  background: none repeat scroll 0 0 #fff;
  border-radius: 0 4px 4px 0;
  width: 75%;
}
.mail-box .sm-side .user-head {
  background: none repeat scroll 0 0 #00a8b3;
  border-radius: 4px 0 0;
  color: #fff;
  min-height: 80px;
  padding: 10px;
}


</style>
