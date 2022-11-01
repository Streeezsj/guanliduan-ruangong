import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
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
      name: '高校科研项目管理系统',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '科研项目统计管理  ', icon: 'dashboard' }
    }]
  },

  {
    path: '/Reseach',
    component: Layout,
    redirect: '/Reseach/ItemList',
    name: 'Reseach',
    meta: { title: '高校科研项目', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'ItemList',
        name: 'ItemList',
        component: () => import('@/views/Reseach/itemList'),
        meta: { title: '科研项目列表', icon: 'table' }
      },
      {
        path: 'AddItem',
        name: 'AddItem',
        hidden: true,
        component: () => import('@/views/Reseach/additem'),
        meta: { title: '添加科研项目', icon: 'table' }
      },
      {
        path: 'Addhuman',
        name: 'Addhuman',
        hidden: true,
        component: () => import('@/views/Reseach/addhuman'),
        meta: { title: '添加科研项目人员', icon: 'table' }
      },
      {
        path: 'EditItem/:itemId',
        name: 'EditItem',
        hidden: true,
        component: () => import('@/views/Reseach/edititem'),
        meta: { title: '科研信息编辑', icon: 'table' }
      },
    ]
  },

  {
    path: '/Examine',
    component: Layout,
    redirect: '/Examine/examineList',
    name: 'Examine',
    meta: { title: '项目审批', icon: 'el-icon-s-help' },
    children: [{
      path: 'ExamineList',
      name: 'ExamineList',
      component: () => import('@/views/ExamineList/index'),
      meta: { title: '项目审批  ', icon: 'dashboard' }
    }]
  },

  {
    path: '/Progress',
    component: Layout,
    redirect: '/Progress/progressList',
    name: 'Progress',
    meta: { title: '进度管理', icon: 'el-icon-s-help' },
    children: [{
      path: 'ProgressList',
      name: 'ProgressList',
      component: () => import('@/views/ProgressList/index'),
      meta: { title: '进度管理', icon: 'dashboard' }
    }]
  },

  {
    path: '/Money',
    component: Layout,
    redirect: '/Money/moneyList',
    name: 'Money',
    meta: { title: '经费管理', icon: 'el-icon-s-help' },
    children: [{
      path: 'MoneyList',
      name: 'MoneyList',
      component: () => import('@/views/MoneyList/index'),
      meta: { title: '经费管理  ', icon: 'dashboard' }
    }]
  },
  {
    path: '/UserControll',
    component: Layout,
    redirect: '/UserControll/UserList',
    name: 'UserControll',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'UserList',
        name: 'UserList',
        component: () => import('@/views/UserControll/userList'),
        meta: { title: '用户管理列表', icon: 'form' }
      },
      {
        path: 'AddUser',
        name: 'AddUser',
        hidden: true,
        component: () => import('@/views/UserControll/adduser'),
        meta: { title: '添加用户信息', icon: 'table' }
      },
      {
        path: 'EditUser/:userId',
        name: 'EditUser',
        hidden: true,
        component: () => import('@/views/UserControll/edituser'),
        meta: { title: '用户信息编辑', icon: 'table' }
      },
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
