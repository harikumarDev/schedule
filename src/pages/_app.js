import React, { useEffect, useState } from "react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import createEmotionCache from "../utils/createEmotionCache";
import lightTheme from "../styles/theme/lightTheme";
import darkTheme from "../styles/theme/darkTheme";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const [theme, setTheme] = useState("light");
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setTheme(
      localStorage.getItem("theme")
        ? JSON.parse(localStorage.getItem("theme"))
        : "light"
    );
  }, []);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  }

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
