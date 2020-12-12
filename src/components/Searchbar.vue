<template>
<div class="inbox-head">
      <h3>{{ title }}</h3>
      <form class="pull-right position" @submit="search($event)">
        <div class="input-append">
          <input
            type="text"
            class="sr-input"
            placeholder="Search Mail"
            :value="keyword"
            @change="onType"
          />
          <button class="btn sr-btn" type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import * as Mutations from '../store/mutation-types';

export default {
  name: 'Searchbar',
  data() {
    return {
      typedKeyWord: '',
    };
  },

  methods: {
    search(e) {
      e.preventDefault();
      this.$store.commit(Mutations.SEARCH, this.typedKeyWord);
    },
    onType(e) {
      console.log(e)
      this.typedKeyWord = e.target.value;
    }
  },
  computed :{
    ...mapGetters(['title']),
    ...mapState({
      keyword: state => state.filters.keyword
    })
  }
};
</script>

<style lang="scss">
$color_1: #fff;
$color_7: #8a8a8a;

.inbox-head {
  background: none repeat scroll 0 0 #41cac0;
  border-radius: 0 4px 0 0;
  color: $color_1;
  min-height: 80px;
  padding: 20px;
  margin: -20px 0 10px -20px;
  h3 {
    display: inline-block;
    font-weight: 300;
    margin: 0;
    padding-top: 6px;
  }
  .sr-input {
    border: medium none;
    border-radius: 4px 0 0 4px;
    box-shadow: none;
    color: $color_7;
    float: left;
    height: 40px;
    padding: 0 10px;
  }
  .sr-btn {
    background: none repeat scroll 0 0 #00a6b2;
    border: medium none;
    border-radius: 0 4px 4px 0;
    color: $color_1;
    height: 40px;
    padding: 0 20px;
  }
}
</style>