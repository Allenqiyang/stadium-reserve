import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/",
    component: () => import("../views/Main.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("../views/Home.vue")
      },
      {
        path: "reserve",
        component: () => import("../views/Reserve.vue")
      },
      {
        path: "moment",
        component: () => import("../views/Moment.vue")
      },
      {
        path: "detail",
        component: () => import("../views/MomentDetail.vue")
      },
      {
        path: "stadium",
        component: () => import("../views/Stadium.vue"),
        redirect: "/stadium/basketball",
        children: [
          {
            path: "basketball",
            component: () => import("../components/Basketball.vue")
          },
          {
            path: "football",
            component: () => import("../components/Football.vue")
          },
          {
            path: "tennis",
            component: () => import("../components/Tennis.vue")
          },
          {
            path: "badminton",
            component: () => import("../components/Badminton.vue")
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to) => {
  if(to.path !== 'login') {
    const token = sessionStorage.getItem('token')
    if(!token) {
      return '/login'
    }
  }
})

export default router