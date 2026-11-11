"use client"

import { getProjects, projectsPath } from "@lib/api/projects"
import useSWR from "swr"

export function useProjects() {
  return useSWR(projectsPath, getProjects, { revalidateOnFocus: false })
}
