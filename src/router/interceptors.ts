import type {  Router } from "vue-router";
import {useGptStore} from "@/stores/gpt"
import {storeToRefs} from "pinia"

export function addInterceptors(router: Router) {
  router.beforeEach((to, from, next) => {
    const {apiKey} = storeToRefs(useGptStore())
    console.log('state router', {
      apiKey: apiKey.value,
      to,
      from,
      next
    })
    if (to.meta.requiresAuth && !apiKey.value) {
      return next('/auth')
    }
    return next();
  });
}