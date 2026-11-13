"use client"

import PageHeader from "@(control)/components/PageHeader"
import EditIcon from "@mui/icons-material/Edit"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import InputLabel from "@mui/material/InputLabel"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Select from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TextField from "@mui/material/TextField"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { useState } from "react"
import AccountInsightDrawerButton from "./AccountInsightDrawerButton"
import { accounts as initialAccounts, roleLabels, type Account, type AccountRole } from "./accounts.mock"
import AccountsHouseDrawerButton from "./AccountsHouseDrawerButton"

function scopeLabel(account: Account, count: number) {
  if (account.role === "admin") return "全部"
  if (account.role === "viewer") return "無"
  return count ? `${count} 個` : "無"
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(initialAccounts)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<AccountRole | "all">("all")
  const [roleMenu, setRoleMenu] = useState<{ anchor: HTMLElement; account: Account } | null>(null)
  const [roleChange, setRoleChange] = useState<{ account: Account; role: AccountRole } | null>(null)

  const query = search.trim().toLowerCase()
  const filteredAccounts = accounts.filter(
    ({ user, role }) =>
      (roleFilter === "all" || role === roleFilter) &&
      [user.name, user.email, user.department, user.user_id].some((value) => value.toLowerCase().includes(query)),
  )

  const updateScope = (accountId: string, scope: "houseSectionIds" | "projectIds", ids: string[]) => {
    setAccounts((current) =>
      current.map((account) => (account.user.user_id === accountId ? { ...account, [scope]: ids } : account)),
    )
  }
  const confirmRole = () => {
    if (!roleChange) return
    setAccounts((current) =>
      current.map((account) =>
        account.user.user_id === roleChange.account.user.user_id ? { ...account, role: roleChange.role } : account,
      ),
    )
    setRoleChange(null)
  }

  return (
    <Stack gap={2}>
      <PageHeader>帳號與授權</PageHeader>
      <Stack
        gap={2}
        direction={{ xs: "column", sm: "row" }}
      >
        <TextField
          fullWidth
          size="small"
          label="搜尋"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <FormControl
          size="small"
          sx={{ minWidth: 180 }}
        >
          <InputLabel>角色</InputLabel>
          <Select
            label="角色"
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value as AccountRole | "all")}
          >
            <MenuItem value="all">全部角色</MenuItem>
            {Object.entries(roleLabels).map(([value, label]) => (
              <MenuItem
                key={value}
                value={value}
              >
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <TableContainer
        component={Paper}
        variant="outlined"
      >
        <Table
          size="small"
          sx={{ minWidth: 850 }}
        >
          <TableHead>
            <TableRow>
              <TableCell>姓名</TableCell>
              <TableCell>工號</TableCell>
              <TableCell>部門</TableCell>
              <TableCell>角色</TableCell>
              <TableCell>房子區塊</TableCell>
              <TableCell>Insight 專案</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow key={account.user.user_id}>
                <TableCell>
                  <Typography variant="subtitle2">{account.user.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{account.user.user_id}</Typography>
                </TableCell>
                <TableCell>{account.user.department || "—"}</TableCell>
                <TableCell>
                  <Stack
                    gap={0.5}
                    direction="row"
                    alignItems="center"
                  >
                    {roleLabels[account.role]}
                    <Tooltip title="編輯角色">
                      <IconButton
                        size="small"
                        color="warning"
                        onClick={(event) => setRoleMenu({ anchor: event.currentTarget, account })}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
                <TableCell>
                  {account.role === "editor" ? (
                    <Stack
                      gap={0.5}
                      direction="row"
                      alignItems="center"
                    >
                      {scopeLabel(account, account.houseSectionIds.length)}區塊
                      <AccountsHouseDrawerButton
                        name={account.user.name}
                        onSave={(ids) => updateScope(account.user.user_id, "houseSectionIds", ids)}
                        selectedIds={account.houseSectionIds}
                      />
                    </Stack>
                  ) : (
                    scopeLabel(account, account.houseSectionIds.length)
                  )}
                </TableCell>
                <TableCell>
                  {account.role === "editor" ? (
                    <Stack
                      gap={0.5}
                      direction="row"
                      alignItems="center"
                    >
                      {scopeLabel(account, account.projectIds.length)}專案
                      <AccountInsightDrawerButton
                        name={account.user.name}
                        onSave={(ids) => updateScope(account.user.user_id, "projectIds", ids)}
                        selectedIds={account.projectIds}
                      />
                    </Stack>
                  ) : (
                    scopeLabel(account, account.projectIds.length)
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredAccounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>找不到符合條件的帳號。</TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        open={roleMenu !== null}
        anchorEl={roleMenu?.anchor}
        onClose={() => setRoleMenu(null)}
      >
        {(Object.entries(roleLabels) as [AccountRole, string][]).map(([role, label]) => (
          <MenuItem
            key={role}
            selected={roleMenu?.account.role === role}
            onClick={() => {
              if (roleMenu && role !== roleMenu.account.role) setRoleChange({ account: roleMenu.account, role })
              setRoleMenu(null)
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
      <Dialog
        open={roleChange !== null}
        onClose={() => setRoleChange(null)}
      >
        <DialogTitle>確認變更角色</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {roleChange ? `將 ${roleChange.account.user.name} 的角色變更為「${roleLabels[roleChange.role]}」？` : ""}
            {roleChange?.role === "admin" ? "變更後可編輯全部區塊與專案。" : null}
            {roleChange?.role === "editor" ? "變更後可編輯已指派的區塊與專案。" : null}
            {roleChange?.role === "viewer" ? "變更後將無法編輯任何區塊與專案。" : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoleChange(null)}>取消</Button>
          <Button onClick={confirmRole}>確認</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
