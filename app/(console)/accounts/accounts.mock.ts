import type { User } from "@lib/api/auth"

export type AccountRole = "admin" | "editor" | "viewer"

export type Account = {
  user: User
  role: AccountRole
  houseSectionIds: string[]
  projectIds: string[]
}

export const roleLabels: Record<AccountRole, string> = {
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
}

export const accounts: Account[] = [
  {
    user: {
      user_id: "00059539",
      name: "Mason Chang",
      email: "mason_chang@umc.com",
      title: "",
      department: "SDD",
    },
    role: "admin",
    houseSectionIds: [],
    projectIds: [],
  },
]
