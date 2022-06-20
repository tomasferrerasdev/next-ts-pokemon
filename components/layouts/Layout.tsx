import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface props {
  title?: string;
  children?: React.ReactNode;
}

export const Layout: FC<props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon | App"}</title>
        <meta name="Author" content="Tomas Ferreras" />
        <meta name="description" content={`${title} pokemon info.`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
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
