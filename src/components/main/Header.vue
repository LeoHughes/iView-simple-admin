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
        <Badge count="100" overflow-count="999">
          <Avatar class="avatar" size="large" :src="userInfo.avatar || ''"></Avatar>
        </Badge>
        <DropdownMenu slot="list">
          <DropdownItem>
            <router-link :to="{path:'/message'}">未读消息</router-link>
          </DropdownItem>
          <DropdownItem>
            <router-link :to="{path:'/user/center'}">个人中心</router-link>
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
    ...mapGetters(["userInfo"]),
    isCollapsed() {
      return this.isSiderCollapsed;
    }
  },
  methods: {
    ...mapActions(["loginOut"]),
    //收起边栏
    toggleSiderMenu() {
      this.$emit("toggleSiderMenu");
    },
    //登出
    userLoginOut() {
      this.loginOut();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>