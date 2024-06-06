export default defineNuxtRouteMiddleware((to, from) => {
  const user = useProfile().user;
  if (user.value) {
    return navigateTo(`/profile_${user.value.tag}`);
  }
  if (to.path === '/') {
    return navigateTo('/');
  }
});
