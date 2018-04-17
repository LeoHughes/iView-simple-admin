//默认路由配置
export default [{
    path: "*",
    name: "404",
    meta: {
      title: "error-404"
    },
    component: () =>
      import ("@/view/NotFound")
  },
  {
    path: "/403",
    name: "403",
    meta: {
      title: "error-403"
    },
    component: () =>
      import ("@/view/NotAuthorized")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录页"
    },
    component: () =>
      import ("@/view/Login")
  },
  {
    path: "/",
    name: "Index",
    meta: {
      requireAuth: true,
      title: "主页"
    },
    component: () =>
      import ("@/view/Index"),
    children: [{
        path: "/test/1",
        name: "Test",
        meta: {
          requireAuth: true,
          title: "测试子菜单1"
        },
        component: () =>
          import ("@/view/Test/Test")
      },
      {
        path: "/test/2",
        name: "TestChild",
        meta: {
          requireAuth: true,
          title: "测试子菜单2"
        },
        component: () =>
          import ("@/view/Test/TestChild")
      },
      {
        path: "/message",
        name: "Message",
        meta: {
          requireAuth: true,
          title: "消息中心"
        },
        component: () =>
          import ("@/view/UserCenter/Message")
      },
      {
        path: "/user/center",
        name: "UserCenter",
        meta: {
          requireAuth: true,
          title: "个人中心"
        },
        component: () =>
          import ("@/view/UserCenter/Center")
      }
    ]
  }
];