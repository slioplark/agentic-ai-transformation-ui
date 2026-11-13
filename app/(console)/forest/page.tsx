import PageHeader from "@(control)/components/PageHeader"
import Stack from "@mui/material/Stack"
import ForestProjectMap from "./ForestProjectMap"

export default function ForestPage() {
  return (
    <Stack gap={2}>
      <PageHeader>Forest View</PageHeader>
      <ForestProjectMap />
    </Stack>
  )
}
