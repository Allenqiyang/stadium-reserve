import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/login",
    component: () => import("../views/login/Login.vue")
  },
  {
    path: "/",
    component: () => import("../views/Main.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("../views/home/Home.vue")
      },
      {
        path: "reserve",
        component: () => import("../views/reserve/Reserve.vue")
      },
      {
        path: "moment",
        component: () => import("../views/moment/Moment.vue")
      },
      {
        path: "detail",
        component: () => import("../views/moment/MomentDetail.vue")
      },
      {
        path: "stadium",
        component: () => import("../views/Stadium/Stadium.vue"),
        redirect: "/stadium/basketball",
        children: [
          {
            path: "basketball",
            component: () => import("../views/Stadium/childs/Basketball.vue")
          },
          {
            path: "football",
            component: () => import("../views/Stadium/childs/Football.vue")
          },
          {
            path: "tennis",
            component: () => import("../views/Stadium/childs/Tennis.vue")
          },
          {
            path: "badminton",
            component: () => import("../views/Stadium/childs/Badminton.vue")
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

// router.beforeEach((to) => {
//   if(to.path !== 'login') {
//     const token = localStorage.getItem('token')
//     if(!token) {
//       return '/login'
//     }
//   }
// })

export default router