import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { AppBar, Toolbar, Container } from "@mui/material";
import { Add, Brightness6Rounded } from "@mui/icons-material";
import styles from "./Layout.module.css";
import { ThemeContext } from "../../context/ThemeContext";

export default function Layout({ children, title = "Schedule" }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [navClr, setNavClr] = useState("#ffffff");

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", JSON.stringify(newTheme));
    setNavClr(newTheme === "light" ? "#ffffff" : "#272727");
    setTheme(newTheme);
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setNavClr(
        JSON.parse(localStorage.getItem("theme")) === "light"
          ? "#ffffff"
          : "#272727"
      );
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar
        position="fixed"
        sx={{ background: navClr, top: 0, zIndex: 1 }}
        className={styles.header}
      >
        <Container sx={{ width: "90%", marginLeft: "0px" }}>
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Link href="/" passHref={true}>
              <a>
                <Image src="/logo.svg" alt="logo" height="50px" width="50px" />
              </a>
            </Link>
            <div className={styles.headerLinks}>
              <button className={styles.themeSwitcher}>
                <Link href="/add" passHref={true}>
                  <a>
                    <Add fontSize="large" color="secondary" />
                  </a>
                </Link>
              </button>
              <button className={styles.themeSwitcher} onClick={switchTheme}>
                <Brightness6Rounded />
              </button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
