<template>
  <div class="user-head">
    <a class="inbox-avatar" href="javascript:;">
      <img width="64" hieght="60" :class="{ full: fullWidthImage }" @click="fullWidthImage = !fullWidthImage" :src="profile.avatar" >
    </a>
    <div class="user-name">
      <h5>
        <a href="#">{{ profile.firstName +' '+ profile.lastName }}</a>
      </h5>
      <span>
        <a href="#">{{ profile.email }}</a>
      </span>
    </div>
    <a class="mail-dropdown pull-right" href="javascript:;">
      <i class="fa fa-chevron-down"></i>
    </a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
 name: 'Profile',
 data() {
    return {
      profile: [],
      'fullWidthImage': true
    } 
  },
  mounted () {
        axios.get('http://localhost:3000/profile')
        .then(response => {
            this.profile = response.data
        })
        .catch(function (error) {
            console.log(error)
        })
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.full {
  width: 100%;

}
img {
  width: 270px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  transition: width 0.2s;
  margin-bottom: 5px;
  position: relative;;
}

img:hover {
  cursor: pointer;
}
.mail-box .sm-side .user-head {
  background: none repeat scroll 0 0 #00a8b3;
  border-radius: 4px 0 0;
  color: #fff;
  min-height: 80px;
  padding: 10px;
}

.user-head .inbox-avatar {
  float: left;
  width: 65px;
}
.user-head .inbox-avatar img {
  border-radius: 4px;
}
.user-head .user-name {
  display: inline-block;
  margin: 0 0 0 10px;
}
.user-head .user-name h5 {
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 0;
  margin-top: 15px;
}
.user-head .user-name h5 a {
  color: #fff;
}
.user-head .user-name span a {
  color: #87e2e7;
  font-size: 12px;
}
a.mail-dropdown {
  background: none repeat scroll 0 0 #80d3d9;
  border-radius: 2px;
  color: #01a7b3;
  font-size: 10px;
  margin-top: 20px;
  padding: 3px 5px;
}
</style>
