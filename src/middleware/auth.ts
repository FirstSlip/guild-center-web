export default defineNuxtRouteMiddleware((to, from) => {
  /* console.log(to, from); */
  console.log(useProfile().user.value);
  if (useProfile().user.value) {
    return abortNavigation();
  }
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  if (to.path === '/') {
    return navigateTo('/');
  }
});
