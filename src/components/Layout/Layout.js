import { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { AppBar, Toolbar, Container } from "@mui/material";
import { Brightness6Rounded } from "@mui/icons-material";
import styles from "./Layout.module.css";
import { ThemeContext } from "../../context/ThemeContext";

export default function Layout({ children, title = "Schedule" }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const switchTheme = () => {
    localStorage.setItem(
      "theme",
      JSON.stringify(theme === "light" ? "dark" : "light")
    );
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static" className={styles.header}>
        <Container maxWidth="100%">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Link href="/" passHref={true}>
              <Image src="/logo.svg" alt="logo" height="50px" width="50px" />
            </Link>
            <button className={styles.themeSwitcher} onClick={switchTheme}>
              <Brightness6Rounded />
            </button>
          </Toolbar>
        </Container>
      </AppBar>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
