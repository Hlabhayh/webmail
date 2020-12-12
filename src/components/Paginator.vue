<template>
  <ul class="unstyled inbox-pagination">
    <li>
      <span class="btn btn-sm btn-outline-secondary">
        {{ from }} - {{ to }} of {{ total }}
      </span>
    </li>
    <li>
      <a class="btn btn-sm btn-outline-secondary" @click="prev()">
				<i class="fa fa-angle-left pagination-left"></i>
			</a>
    </li>

    <li>
      <a class="btn btn-sm btn-outline-secondary" @click="next()">
        <i class="fa fa-angle-right pagination-right"></i>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
	name: 'Paginator',
	props: {
		total: {
			type: Number,
			required: true,
			default: 0,
		},
		perPage: {
			type: Number,
			required: false,
			default: 20,
		},
	},

	data() {
		return {
			page: 0,
		};
	},

	watch: {
		total() {
			this.page = 0;
			this.$emit('page', this.page);
		},
	},

	computed: {
		from() {
			return (this.page * this.perPage) + 1;
		},

		to() {
			let to = (this.page + 1) * this.perPage;
			return (to <= this.total) ? to : this.total;
		},
	},

	methods: {
		prev() {
			if (this.page) {
				this.page--;
				this.$emit('page', this.page);
			}
		},

		next() {
			if (this.page + 1 < Math.ceil(this.total / this.perPage)) {
				this.page++;
				this.$emit('page', this.page);
			}
		},
	},
};
</script>

<style lang="scss">
$color_10: #afafaf;

ul.inbox-pagination {
  float: right;
  li {
    float: left;
  }
}
.inbox-pagination {
  a.np-btn {
    background: none repeat scroll 0 0 #fcfcfc;
    border: 1px solid #e7e7e7;
    border-radius: 3px !important;
    color: $color_10;
    display: inline-block;
    padding: 5px 15px;
    margin-left: 5px;
  }
  li {
    span {
      display: inline-block;
      margin-right: 5px;
      margin-top: 7px;
    }
  }
}
</style>