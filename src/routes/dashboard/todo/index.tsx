import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/todo/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/todo/"!</div>
}
