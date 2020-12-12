<template>
  <div>
    <compose></compose>
    <ul class="inbox-nav inbox-divider">
      <li v-for="section in sections" :key="section.key" :class="{active: section.active}">
        <a href="#" @click.prevent="changeSection(section)"><i :class="sections.icon" class="fa"></i> {{ section.label }} 
        <span class="label pull-right" :class="section.color">{{ section.total }}</span>
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
import { mapGetters } from 'vuex';
import * as Mutations from '../store/mutation-types';

export default {
  name: "SideNavigation",
  components: {
    Compose,
  },
  computed: {
    ...mapGetters(['sections']),
  },
  methods: {
    changeSection(section) {
      this.$store.commit(Mutations.SECTION_CHANGE, section.key);
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