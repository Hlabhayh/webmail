<template>
<div class="inbox-head">
      <h3>Inbox</h3>
      <form action="#" class="pull-right position">
        <div class="input-append">
          <input
            type="text"
            class="sr-input"
            placeholder="Search Mail"
            v-model="keyword"
            @keyup.enter="search()"
          />
          <button class="btn sr-btn" type="button" @click="search()">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
</template>

<script>
export default {
    name: 'Searchbox',
    props: {
        mails: {
            type: Array,
            required: true,
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {
            keyword: '',
            filteredMails: [],
        };
    },
    methods: {
        search() {
            this.filteredMails = this.mails.filter((mail) => {
                return mail.sender.name
                .toLowerCase()
                .includes(this.keyword.toLowerCase())
            });
            this.$emit('searching', this.filteredMails);
            this.keyword = '';        },
    },
};
</script>

<style>

</style>