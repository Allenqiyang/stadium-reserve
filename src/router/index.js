import { createRouter, createWebHistory } from "vue-router"
import cache from "@/utils/cache"
import { verifyToken } from "@/service"

const routes = [
  {
    path: "/login",
    component: () => import("../views/login/Login.vue")
  },
  {
    path: "/personal",
    component: () => import("../views/personal/Personal.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/not-found/NotFound.vue")
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

router.beforeEach(async (to) => {
  if(to.path !== '/login') {
    const token = cache.getCache('token')
    let res = null
    if(token) {
      res = await verifyToken()
    }
    if(!token || res.code !== 100) {
      router.push('/login')
    }
  }
  if(to.path === '/detail') {
    const detail = cache.getCache('momentDetail')
    if(!detail) {
      router.push('/home')
    }
  }
})

export default router