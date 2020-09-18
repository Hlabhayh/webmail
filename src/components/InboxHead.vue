<template>
<div class="inbox-head">
    <h3>Inbox</h3>
    <form action="#" class="pull-right position">
    <div class="input-append">
        <input type="text" class="sr-input" placeholder="Search Mail">
        <button class="btn sr-btn" type="button"><i class="fa fa-search"></i></button>
    </div>
    </form>  
</div>
</template>

<script>
export default {

}
</script>

<style>
.inbox-head {
  background: none repeat scroll 0 0 #41cac0;
  border-radius: 0 4px 0 0;
  color: #fff;
  min-height: 80px;
  padding: 20px;
}
.inbox-head h3 {
  display: inline-block;
  font-weight: 300;
  margin: 0;
  padding-top: 6px;
}
.inbox-head .sr-input {
  border: medium none;
  border-radius: 4px 0 0 4px;
  box-shadow: none;
  color: #8a8a8a;
  float: left;
  height: 40px;
  padding: 0 10px;
}
.inbox-head .sr-btn {
  background: none repeat scroll 0 0 #00a6b2;
  border: medium none;
  border-radius: 0 4px 4px 0;
  color: #fff;
  height: 40px;
  padding: 0 20px;
}
</style>