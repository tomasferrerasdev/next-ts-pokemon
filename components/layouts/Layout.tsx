import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface props {
  title?: string;
  children?: React.ReactNode;
}

const origin = typeof window === "undefined" ? " " : window.location.origin;

export const Layout: FC<props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon | App"}</title>
        <meta name="Author" content="Tomas Ferreras" />
        <meta name="description" content={`${title} pokemon info.`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta property="og:title" content={`Information about ${title}`} />
        <meta
          property="og:description"
          content={`This is the details page about ${title}, you can find more info about this website on https://github.com/tomasferrerasdev/next-ts-pokemon`}
        />
        <meta property="og:image" content={`${origin}/img/home.png`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
