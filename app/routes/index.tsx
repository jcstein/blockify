import { Link } from "react-router";
import type { Route } from "./+types/index";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and run on the server.
// https://reactrouter.com/start/framework/data-loading
export function loader(): IndexData {
  return {
    resources: [
      {
        name: "💧 minting demo",
        url: "https://mint.blockify.shop",
      },
      {
        name: "💬 telegram us, we're building",
        url: "https://t.me/+civMfboiacs1NTcx",
      },
    ],
    demos: [
      {
        to: "/about",
        name: "about blockify",
      },
    ],
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "blockify" },
    { name: "description", content: "welcome to blockify!" },
  ];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return (
    <div className="remix__page">
      <main>
        <h2>welcome to blockify!</h2>
        <p>building web3 eCommerce solutions on the blockchain</p>
      </main>
      <aside>
        <h2>Join Our Community</h2>
        <ul>
          {loaderData.resources.map((resource) => (
            <li key={resource.url} className="remix__page__resource">
              <a href={resource.url}>{resource.name}</a>
            </li>
          ))}
        </ul>
        <h2>more</h2>
        <ul>
          {loaderData.demos.map((demo) => (
            <li key={demo.to} className="remix__page__resource">
              <Link to={demo.to} prefetch="intent">
                {demo.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
