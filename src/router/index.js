import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const routes = [
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/customerlist',
    name: 'Customer',
    meta: {
      title: '用户管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'customerlist',
        component: () => import('@/views/customer/index'),
        name: 'Customerlist',
        meta: { title: '用户列表' }
      }
    ]
  },
  {
    path: '/interaction',
    component: Layout,
    name: 'Interaction',
    meta: {
      title: '党员互动',
      icon: 'nested'
    },
    children: [
      {
        path: 'interactionlist',
        component: () => import('@/views/interaction/index'),
        name: 'Interactionlist',
        meta: {
          title: '帖子列表',
        }
      }
    ]
  },
  {
    path: '/Rotationchart',
    component: Layout,
    name: 'Rotationchart',
    meta: {
      title: '轮播图列表',
      icon: 'nested'
    },
    children: [
      {
        path: 'Rotationchartlist',
        component: () => import('@/views/Rotationchart/index'),
        name: 'Rotationchartlist',
        meta: {
          title: '互动列表',
        }
      }
    ]
  },
  {
    path: '/Democraticappraisal',
    component: Layout,
    name: 'Democraticappraisal',
    meta: {
      title: '民主评议',
      icon: 'nested'
    },
    children: [
      {
        path: 'Democraticappraisallist',
        component: () => import('@/views/Democraticappraisal/index'),
        name: 'Democraticappraisallist',
        meta: {
          title: '评议列表',
        }
      }
    ]
  },
  {
    path: '/Thoughtreport',
    component: Layout,
    name: 'Thoughtreport',
    meta: {
      title: '心得总结',
      icon: 'nested'
    },
    children: [
      {
        path: 'Thoughtreportlist',
        component: () => import('@/views/Thoughtreport/index'),
        name: 'Thoughtreportlist',
        meta: {
          title: '总结列表',
        }
      }
    ]
  },
  {
    path: '/Summaryofexperience',
    component: Layout,
    name: 'Summaryofexperience',
    meta: {
      title: '思想汇报',
      icon: 'nested'
    },
    children: [
      {
        path: 'Summaryofexperiencelist',
        component: () => import('@/views/Summaryofexperience/index'),
        name: 'Summaryofexperiencelist',
        meta: {
          title: '汇报列表',
        }
      }
    ]
  },
  {
    path: '/newspaper',
    component: Layout,
    name: 'newspaper',
    meta: {
      title: '新闻管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'newspaperlist',
        component: () => import('@/views/newspaper/index'),
        name: 'newspaperlist',
        meta: {
          title: '新闻列表',
        }
      },
      {
        path: 'addnewspaper',
        component: () => import('@/views/newspaper/addnewpaper'),
        name: 'addnewspaper',
        meta: {
          title: '新增新闻',
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

const router = createRouter()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
