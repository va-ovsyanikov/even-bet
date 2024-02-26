export async function layoutMiddleware(route: any) {
  try {
    const layoutElement = route.meta.layout
    const component = await import(`@/layouts/${layoutElement}Layout.vue`)
    route.meta.layoutComponent = component.default
  } catch (error) {
    console.log(error)
  }
}
