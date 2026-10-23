import { Outlet } from "react-router";
import type { Route } from "./+types/about";

import stylesUrl from "~/styles/demos/about.css?url";

export function meta({}: Route.MetaArgs) {
  return [{ title: "About Remix" }];
}

export function links() {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

export default function About() {
  return (
    <div className="about">
      <div className="about__intro">
        <h2>about us</h2>
        <p>
          Ok, so this page isn't really <em>about us</em> (yet), but we did want
          to tell you how this project started.
        </p>
        <p>
          We will have more coming soon, but <em>for now</em>{" "}
          <a href="https://twitter.com/FarzaTV/status/1466967658348400643?s=20">
            here's a bit about what sparked the idea
          </a>
          .
        </p>
        <hr />
        <Outlet />
      </div>
    </div>
  );
}
