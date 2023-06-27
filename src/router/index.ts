import { createRouter, createWebHistory } from "vue-router"
import { projects } from '@/data/projects'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/Home.vue') },
    { path: '/tags', component: () => import('@/views/Tags.vue') },
    ...projects.map((entry: any) => ({
      path: `/${entry.slug}`,
      name: entry.slug,
      component: () => import('@/views/Detail.vue'),
      meta: async () => {
        const { html } = await import(`@/data/${entry.slug}.md`)
        return html
      },
    })),
    { path: '/:path(.*)', component: () => import('@/views/NotFound.vue'), meta: { title: 'This Is Not The Page You\'re Looking For' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
});

export default router