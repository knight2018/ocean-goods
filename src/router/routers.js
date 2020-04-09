import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/bannerBox',
    name: '/bannerBox',
    component: Main,
    meta: {
      title: '轮播图'
    },
    children: [
      {
        path: '/banner',
        name: '/banner',
        meta: {
          title: '轮播图',
          icon: 'ios-refresh-circle'
        },
        component: () => import('@/view/banner/banner')
      },
      {
        path: '/bannerAdd',
        name: '/bannerAdd',
        meta: {
          title: '添加轮播图',
          icon: 'md-add-circle'
        },
        component: () => import('@/view/banner/bannerAdd')
      }
    ]
  },
  {
    path: '/sectionBox',
    name: '/sectionBox',
    component: Main,
    meta: {
      title: '栏目'
    },
    children: [
      {
        path: '/section',
        name: '/section',
        meta: {
          title: '栏目管理',
          icon: 'logo-buffer'
        },
        component: () => import('@/view/section/section')
      },
      {
        path: '/sectionAdd',
        name: '/sectionAdd',
        meta: {
          title: '添加栏目商品',
          icon: 'md-add-circle',
          hideInMenu: true
        },
        component: () => import('@/view/section/sectionAdd')
      }
    ]
  },
  {
    path: '/popupBox',
    name: '/popupBox',
    component: Main,
    meta: {
      title: '弹层'
    },
    children: [
      {
        path: '/popup',
        name: '/popup',
        meta: {
          title: '弹层管理',
          icon: 'ios-albums'
        },
        component: () => import('@/view/popupBox/popup')
      },
      {
        path: '/popupAdd',
        name: '/popupAdd',
        meta: {
          title: '添加弹层',
          icon: 'md-add-circle'
        },
        component: () => import('@/view/popupBox/popupAdd')
      }
    ]
  },
  {
    path: '/shopBox',
    name: '/shopBox',
    component: Main,
    meta: {
      title: '商品'
    },
    children: [
      {
        path: '/category',
        name: '/category',
        meta: {
          title: '商品分类',
          icon: 'ios-nuclear'
        },
        component: () => import('@/view/shop/category')
      },
      {
        path: '/categoryAdd',
        name: '/categoryAdd',
        meta: {
          title: '添加商品分类',
          icon: 'md-add-circle',
          hideInMenu: true
        },
        component: () => import('@/view/shop/categoryAdd')
      },
      {
        path: '/attr',
        name: '/attr',
        meta: {
          title: '商品类型',
          icon: 'ios-basket',
        },
        component: () => import('@/view/shop/attr/attr')
      },
      {
        path: '/attribute',
        name: '/attribute',
        meta: {
          title: '属性/参数列表',
          icon: 'ios-basket',
          hideInMenu: true
        },
        component: () => import('@/view/shop/attr/attribute')
      },
      {
        path: '/attributeAdd',
        name: '/attributeAdd',
        meta: {
          title: '添加属性/参数',
          icon: 'ios-basket',
          hideInMenu: true
        },
        component: () => import('@/view/shop/attr/attributeAdd')
      },
      {
        path: '/shopList',
        name: '/shopList',
        meta: {
          title: '商品列表',
          icon: 'ios-list-box'
        },
        component: () => import('@/view/shop/shopList/shopList')
      },
      {
        path: '/shopAdd',
        name: '/shopAdd',
        meta: {
          title: '添加商品',
          icon: 'md-add-circle'
        },
        component: () => import('@/view/shop/shopList/shopAdd')
      },
    ]
  },
  {
    path: '/order',
    name: '/order',
    component: Main,
    meta: {
      title: '订单'
    },
    children: [
      {
        path: '/orderList',
        name: '/orderList',
        meta: {
          title: '订单列表',
          icon: 'logo-tux'
        },
        component: () => import('@/view/order/orderList')
      },
      {
        path: '/orderDetalis',
        name: '/orderDetalis',
        meta: {
          title: '订单详情',
          icon: 'logo-tux',
          hideInMenu: true
        },
        component: () => import('@/view/order/orderDetalis/orderDetalis')
      },
      {
        path: '/setting',
        name: '/setting',
        meta: {
          title: '订单设置',
          icon: 'ios-settings-outline'
        },
        component: () => import('@/view/order/setting')
      },
      {
        path: '/refundList',
        name: '/refundList',
        meta: {
          title: '退货申请处理',
          icon: 'md-sad'
        },
        component: () => import('@/view/order/refundList')
      },
      {
        path: '/refundDetails',
        name: '/refundDetails',
        meta: {
          title: '退款详情',
          icon: 'md-sad',
          hideInMenu: true
        },
        component: () => import('@/view/order/refundDetails/refundDetails')
      },
      {
        path: '/reason',
        name: '/reason',
        meta: {
          title: '退货原因设置',
          icon: 'md-help'
        },
        component: () => import('@/view/order/reason')
      },
      // {
      //   path: '/hoc',
      //   name: 'hoc',
      //   meta: {
      //     title: '逗你玩',
      //     icon: 'md-help'
      //   },
      //   component: () => import('@/view/testHoc/testHoc')
      // },
    ]
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: Main,
    meta: {
      title: '弹层'
    },
    children: [
      {
        path: '/couponList',
        name: 'couponList',
        meta: {
          title: '优惠券',
          icon: 'ios-flash'
        },
        component: () => import('@/view/coupon/couponList')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
