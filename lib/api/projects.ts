import { api } from "@lib/api/client"

export const projectsPath = "/api/projects"

export type Project = {
  BACKGROUND: string | null
  ID: string | number
  TITLE: string
  CATEGORY: string
  ITEM: string
  ARCHIVED: string | number | boolean | null
  CURRENT_DIGITAL_LEVEL: string | number | null
  CURRENT_STATUS: string | null
  CURRENT_STATUS_CONTENT: string | null
  DEVELOP: string | null
  DEVELOP_OWNER: string | null
  DIGITAL_RANK: string | null
  DIGITAL_TYPE: string | null
  DTO_PM: string | null
  EXECUTION: string | null
  EXECUTION_OWNER: string | null
  LAST_EDITED_AT: string | null
  LAST_EDITED_BY: string | null
  SCOPE_D1: string | null
  TARGET: string | null
  TARGET_DATE: string | null
}

export async function getProjects(): Promise<Project[]> {
  try {
    return await api.get<Project[]>(projectsPath)
  } catch (error) {
    throw error
  }
}
