import type {  Router } from "vue-router";
import {useGptStore} from "@/stores/gpt"
import {storeToRefs} from "pinia"

export function addInterceptors(router: Router) {
  router.beforeEach((to, from, next) => {
    const {settings} = storeToRefs(useGptStore())
    console.log('state router', {
      apiKey: settings.value.apiKey,
      to,
      from,
      next
    })
    if (to.meta.requiresAuth && !settings.value.apiKey) {
      return next('/auth')
    }
    return next();
  });
}