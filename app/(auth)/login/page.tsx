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
          <span
            className={styles.brandMark}
            aria-hidden="true"
          >
            <i />
          </span>
          <span>
            <strong>UMC</strong>
            <small>AGENTIC AI TRANSFORMATION</small>
          </span>
        </Link>
        <div className={styles.brandMessage}>
          <div
            className={styles.orbit}
            aria-hidden="true"
          >
            <span />
            <i />
            <b />
          </div>
          <Typography
            variant="h3"
            className={styles.brandTitle}
          >
            <span>讓 Agentic AI 轉型</span>
            <span>落地成效看得見</span>
          </Typography>
          <Typography>集中掌握各單位的轉型成熟度、專案里程碑與效益指標， 及早辨識風險，推動下一步行動。</Typography>
        </div>
        <div className={styles.brandFooter}></div>
      </section>
      <section className={styles.formPanel}>
        <div className={styles.formWrap}>
          <div className={styles.mobileBrand}>
            <span
              className={styles.brandMark}
              aria-hidden="true"
            >
              <i />
            </span>
            <strong>AGENTIC AI TRANSFORMATION</strong>
          </div>
          <div className={styles.formHeading}>
            <Typography variant="h4">歡迎回來</Typography>
            <Typography color="text.secondary">請輸入公司帳號以登入使用。</Typography>
          </div>
          <Paper
            variant="outlined"
            className={styles.formCard}
          >
            <LoginForm />
          </Paper>
        </div>
      </section>
    </main>
  )
}
