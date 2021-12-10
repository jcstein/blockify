import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  let data: IndexData = {
    resources: [
      // {
      //   name: "contact our GitHub org",
      //   url: "https://github.com/blockify-shop",
      // },
      // {
      //   name: "Discord ➡️ join the server",
      //   url: "https://discord.gg/us98czQm",
      // },
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

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "blockify",
    description: "welcome to blockify!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <div className="remix__page">
      <main>
        <h2>welcome to blockify!</h2>
        <p>building web3 eCommerce solutions on the blockchain</p>
      </main>
      <aside>
        <h2>Join Our Community</h2>
        <ul>
          {data.resources.map((resource) => (
            <li key={resource.url} className="remix__page__resource">
              <a href={resource.url}>{resource.name}</a>
            </li>
          ))}
        </ul>
        <h2>more</h2>
        <ul>
          {data.demos.map((demo) => (
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
