<style lang="less" scoped>
@import url('../../assets/style/variable.less');

.header-bar {
  position: relative;
  background: #fff;

  .collapsible-icon {
    position: absolute;
    top: 0;
    left: 20px;

    button{
      &:hover,&:focus{
        box-shadow: none;
        color: @dark;
      }
    }
  }

  .header-control {
    position: absolute;
    top: 0;
    right: 50px;

    .avatar {
      &:hover {
        cursor: pointer;
      }
    }

    .dropdownMenu-item{
      padding:0 0;

      p{
        padding: 10px 6px;
      }
    }
    

  }
}
</style>

<template>
  <Header class="header-bar">
    <div class="collapsible-icon">
      <Switch size="large" :value="isCollapsed" @on-change="toggleSiderMenu">
        <span slot="open">收起</span>
        <span slot="close">展开</span>
      </Switch>
    </div>

    <div class="header-control">
      <Dropdown>
        <Badge :count="messageCount" overflow-count="100">
          <Avatar class="avatar" size="large" :src="avatarUrl"></Avatar>
        </Badge>
        <DropdownMenu slot="list">
          <DropdownItem class="dropdownMenu-item">
            <p @click="linkTo({path:'/message',name:'Message',title:'消息中心'})">消息中心</p>
          </DropdownItem>
          <DropdownItem class="dropdownMenu-item">
            <p @click="linkTo({path:'/user/center',name:'UserCenter',title:'个人中心'})">个人中心</p>
          </DropdownItem>
          <DropdownItem class="dropdownMenu-item">
            <p @click="userLoginOut">退出</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </Header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainHeader",
  props: {
    isSiderCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["token","userInfo","messageCount"]),
    isCollapsed() {
      return this.isSiderCollapsed;
    },
    avatarUrl(){
      return this.userInfo !== null ? this.userInfo.avatar : '';
    }
  },
  async beforeMount(){
    await this.getUnReadMessagesCount();
  },
  methods: {
    ...mapActions(["loginOut","getUnReadMessagesCount"]),
    //收起边栏
    toggleSiderMenu() {
      this.$emit("toggleSiderMenu");
    },
    //登出
    userLoginOut() {
      this.loginOut();
      this.$router.push({ path: "/login" });
    },
    //跳转
    linkTo(tabObj){
      this.$router.push({path:tabObj.path});
      this.$emit('addTab',tabObj);
    }
  }
};
</script>