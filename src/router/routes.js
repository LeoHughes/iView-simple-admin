//默认路由配置
export default [{
    path: "*",
    name: "404",
    component: () =>
      import ("@/view/NotFound")
  },
  {
    path: "/403",
    name: "403",
    component: () =>
      import ("@/view/NotAuthorized")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import ("@/view/Login")
  },
  {
    path: "/",
    name: "Index",
    meta: { requireAuth: true },
    component: () =>
      import ("@/view/Index"),
    children: [{
      path: "/test",
      name: "Test",
      meta: { requireAuth: true },
      component: () =>
        import ("@/view/Test")
    }]
  }
];