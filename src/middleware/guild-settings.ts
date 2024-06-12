export default defineNuxtRouteMiddleware((to, from) => {
  const currentGuild = useGuild().currentGuild;
  if (!currentGuild.value) {
    if (from.path.includes('settings')) {
      return navigateTo(from.path.split('/settings')[0]);
    }
    return abortNavigation;
  }
  if (to.path === '/') {
    return navigateTo('/');
  }
});
