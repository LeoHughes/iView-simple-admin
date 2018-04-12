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
    right: 20px;
    width: 300px;
  }
}
</style>

<template>
  <Header class="header-bar">
    <div class="collapsible-icon">
      <Icon :type="isCollapsed ? 'chevron-right' : 'chevron-left'" size="20" @click.native="toggleSiderMenu"></Icon>
    </div>

    <Row class="header-control">

      <Col span="12">
      <Tooltip>
        <template slot="content">
          <router-link :to="{path:'/message'}">test</router-link>
        </template>
        <Badge dot>
          <Icon type="ios-bell-outline" size="20"></Icon>
        </Badge>
      </Tooltip>
      </Col>

      <Col span="12">
      <Dropdown>
        <a href="javascript:void(0)">
          {{ userRoleName }}
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>
            <router-link :to="{path:'/user/center'}">个人中心</router-link>
          </DropdownItem>
          <DropdownItem>
            <p @click="userLoginOut">退出</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </Col>

    </Row>
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
      userRoleName: state => state.user.userInfo.roleName || ""
    }),
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