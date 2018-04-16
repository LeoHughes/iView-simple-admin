<style lang="less" scoped>
.header-bar {
  position: relative;
  background: #fff;

  .collapsible-icon {
    position: absolute;
    top: 0;
    left: 20px;
    &:hover {
      cursor: pointer;
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
  }
}
</style>

<template>
  <Header class="header-bar">
    <div class="collapsible-icon">
      <Icon :type="isCollapsed ? 'chevron-right' : 'chevron-left'" size="20" @click.native="toggleSiderMenu"></Icon>
    </div>

    <div class="header-control">
      <Dropdown>
        <Badge :count="messageCount" overflow-count="100">
          <Avatar class="avatar" size="large" :src="userInfo.avatar || ''"></Avatar>
        </Badge>
        <DropdownMenu slot="list">
          <DropdownItem>
            <p @click="linkTo({path:'/message',name:'Message',title:'未读消息'})">未读消息</p>
          </DropdownItem>
          <DropdownItem>
            <p @click="linkTo({path:'user/Center',name:'UserCenter',title:'个人中心'})">个人中心</p>
          </DropdownItem>
          <DropdownItem>
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
    }
  },
  async beforeMount(){
    this.getMessages(this.token);
  },
  methods: {
    ...mapActions(["loginOut","getMessages"]),
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
      // this.$refs.siderMenu.updateTabs(tabObj, 0);
      this.$emit('addTab',tabObj);
    }
  }
};
</script>