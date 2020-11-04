<template>
  <div class="user-head">
    <a class="inbox-avatar" href="javascript:;">
      <img width="64" hieght="60" :src="profile.avatar" >
    </a>
    <div class="user-name">
      <h5>
        <a href="#" v-if="profile.firstName">{{ profile.firstName }} {{ profile.lastName }}</a>
        <a href="#" v-if="!profile.firstName">Loading ...</a>
      </h5>
      <span>
        <a href="#" v-if="profile.email">{{ profile.email }}</a>
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
      profile: {},
    } 
  },
  mounted () {
    axios.get('http://localhost:3000/profile')
    .then(response => {
      
      this.profile = response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$color_1: #fff;
$color_2: #87e2e7;

.user-head { 
	.inbox-avatar {
		float: left;
		width: 65px;
		img {
			border-radius: 4px;
		}
	}
	.user-name {
		display: inline-block;
		margin: 0 0 0 10px;
		h5 {
			font-size: 14px;
			font-weight: 300;
			margin-bottom: 0;
			margin-top: 15px;
			a {
				color: $color_1;
			}
		}
		span {
			a {
				color: $color_2;
				font-size: 12px;
			}
		}
	}
}
</style>