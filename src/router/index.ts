import { createRouter, createWebHistory } from 'vue-router'
// Import views
import SigninView from '@/views/Authentication/SigninView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import ECommerceView from '@/views/Dashboard/ECommerceView.vue'
import NotFound from '@/components/NotFound/NotFound.vue'
import AdminDashboardView from '@/views/Dashboard/AdminDashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import CalendarView from '@/views/CalendarView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ButtonsView from '@/views/UiElements/ButtonsView.vue'
import AlertsView from '@/views/UiElements/AlertsView.vue'
import ApexChartView from '@/views/Charts/ApexChartView.vue'
import BasicChartView from '@/views/Charts/BasicChartView.vue'
import SettingsView from '@/views/Pages/SettingsView.vue'
import TablesView from '@/views/TablesView.vue'
import FormLayoutView from '@/views/Forms/FormLayoutView.vue'
import FormElementsView from '@/views/Forms/FormElementsView.vue'
import Import from '@/views/Import/Import.vue'
import Export from '@/views/Forms/Export/Export.vue'
// import other views as needed...

const routes = [
  {
    path: '/',
    name: 'eCommerce',
    component: ECommerceView,
    meta: {
      title: 'Iris Dashboard',
      requiresAuth: true // Require authentication for this route
    }
  },
  {
    path: '/auth/login',
    name: 'signin',
    component: SigninView,
    meta: {
      title: 'Signin'
    }
  },
  {
    path: '/auth/registeration',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:catchAll(.*)',
    redirect: '404'
  },
  {
    path: '/admin',
    name: 'adminDashboard',
    component: AdminDashboardView,
    meta: {
      title: 'Admin Dashboard',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    meta: {
      title: 'Calendar',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: 'Profile',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  },
  {
    path: '/forms/form-elements',
    name: 'formElements',
    component: FormElementsView,
    meta: {
      title: 'Form Elements',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  },
  {
    path: '/forms/form-layout',
    name: 'formLayout',
    component: FormLayoutView,
    meta: {
      title: 'Form Layout',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  },
  {
    path: '/tables',
    name: 'tables',
    component: TablesView,
    meta: {
      title: 'Tables',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  },
  {
    path: '/account/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: 'Settings',
      requiresAuth: true,
      // requiresAdmin: true // Only admin can access
    }
  },
  {
    path: '/charts/basic-chart',
    name: 'basicChart',
    component: BasicChartView,
    meta: {
      title: 'Basic Chart',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  },
  {
    path: '/charts/apex-chart',
    name: 'apexChart',
    component: ApexChartView,
    meta: {
      title: 'Apex Chart',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  },
  {
    path: '/ui-elements/alerts',
    name: 'alerts',
    component: AlertsView,
    meta: {
      title: 'Alerts',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  },
  {
    path: '/ui-elements/buttons',
    name: 'buttons',
    component: ButtonsView,
    meta: {
      title: 'Buttons',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  },
  {
    path: `/import`,
    name: 'import',
    component: Import,
    meta: {
      title: 'import',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  },
  {
    path: '/export',
    name: 'export',
    component: Export,
    meta: {
      title: 'export',
      requiresAuth: true,
      requiresAdmin: true // Only admin can access
    }
  }
  // Uncomment and add other routes as needed...
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem('user');
  const user = localStorage.getItem('user');
  const userRole = user ? JSON.parse(user)?.role : null;
  const userName = user ? JSON.parse(user)?.name : null;
  const userEmail = user ? JSON.parse(user)?.email : null;
  const userId = user ? JSON.parse(user)?.id : null;
  useAuthStore().userRole = userRole;
  useAuthStore().userName = userName;
  useAuthStore().userEmail = userEmail;
  useAuthStore().userId = userId;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next({ name: 'signin' }); // Redirect to sign-in if not logged in
    } else if (to.matched.some(record => record.meta.requiresAdmin) && userRole !== 'admin') {
      next({ name: 'eCommerce' }); // Redirect non-admins
    } else {
      next(); // Authenticated and authorized
    }
  } else if (loggedIn && (to.name === 'signin' || to.name === 'signup')) {
    next({ name: 'eCommerce' }); // Redirect logged-in users away from sign-in and sign-up
  } else {
    next(); // Proceed if no authentication required
  }

  document.title = `${to.meta.title} | Iris Communication Dashboard`; // Set document title
});




export default router
