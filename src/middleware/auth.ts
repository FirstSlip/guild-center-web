export default defineNuxtRouteMiddleware((to, from) => {
  if (useProfile().user.value) {
    return abortNavigation();
  }

  if (to.path === '/') {
    return navigateTo('/');
  }
});
