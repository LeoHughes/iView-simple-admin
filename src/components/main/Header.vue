<style lang="less">

</style>

<template>
  <Header class="layout-header-bar">
    <div class="collapsible-icon">
      <Icon :type="isCollapsed ? 'chevron-left' : 'chevron-right'" size="16" @click.native="toggleSiderMenu"></Icon>
    </div>

    <Dropdown class="header-control">
      <a href="javascript:void(0)">
        {{ userRoleName }}
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>个人中心</DropdownItem>
        <DropdownItem>
          <p @click="userLoginOut">退出</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Header>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
    ...mapState({
      'userRoleName': state => state.user.userInfo.roleName || ''
    }),
    isCollapsed(){
      return this.isSiderCollapsed
    }
  },
  methods: {
    ...mapActions(['loginOut']),
    //收起边栏
    toggleSiderMenu(){
      this.$emit('toggleSiderMenu');
    },
    //登出
    userLoginOut() {
      this.loginOut();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>