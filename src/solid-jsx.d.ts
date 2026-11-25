import "solid-js"

declare module "solid-js" {
  namespace JSX {
    interface DialogHtmlAttributes<T> {
      closedby?: "any" | "closerequest" | "none"
    }
  }
}
