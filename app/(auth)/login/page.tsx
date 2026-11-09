import { Paper, Typography } from "@mui/material"
import type { Metadata } from "next"
import Link from "next/link"
import LoginForm from "./LoginForm"
import styles from "./login.module.css"

export const metadata: Metadata = {
  title: "AGENTIC AI TRANSFORMATION",
}

export default function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <section className={styles.brandPanel}>
        <Link
          href="/"
          className={styles.brand}
        >
          <span className={styles.brandMark} aria-hidden="true">
            <i />
          </span>
          <span>
            <strong>UMC</strong>
            <small>AGENTIC AI TRANSFORMATION</small>
          </span>
        </Link>
        <div className={styles.brandMessage}>
          <div className={styles.orbit} aria-hidden="true">
            <span />
            <i />
            <b />
          </div>
          <Typography variant="h3" component="h1">
            你的工作台，
            <br />
            從這裡開始。
          </Typography>
          <Typography component="p">
            登入後即可管理專案、檢視資料，並連接你的服務。
          </Typography>
        </div>
        <div className={styles.brandFooter}>
        </div>
      </section>
      <section className={styles.formPanel}>
        <div className={styles.formWrap}>
          <div className={styles.mobileBrand}>
            <span className={styles.brandMark} aria-hidden="true">
              <i />
            </span>
            <strong>AGENTIC AI TRANSFORMATION</strong>
          </div>
          <div className={styles.formHeading}>
            <Typography variant="h4" component="h2">
              歡迎回來
            </Typography>
            <Typography color="text.secondary" component="p">
              請輸入公司帳號以登入使用。
            </Typography>
          </div>
          <Paper variant="outlined" className={styles.formCard}>
            <LoginForm />
          </Paper>
          <Typography
            color="text.secondary"
            variant="body2"
            className={styles.helpText}
            component="p"
          >
            尚未設定登入服務？請聯絡你的系統管理員。
          </Typography>
        </div>
      </section>
    </main>
  )
}
