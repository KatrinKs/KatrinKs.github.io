import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import SkillsPage from '../views/SkillsPage.vue'
import WorkPage from '../views/WorkPage.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import ContactPage from '../views/ContactPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { title: 'Главная' }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: { title: 'Обо мне' }
    },
    {
      path: '/skills',
      name: 'skills',
      component: SkillsPage,
      meta: { title: 'Навыки' }
    },
    {
      path: '/work',
      name: 'work',
      component: WorkPage,
      meta: { title: 'Опыт' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsPage,
      meta: { title: 'Проекты' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
      meta: { title: 'Контакты' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Портфолио`
  next()
})

export default router