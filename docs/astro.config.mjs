import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";

// https://astro.build/config
export default defineConfig({
  site: "https://codewhiskers.pejedev.xyz",
  integrations: [
    starlight({
      plugins: [
        starlightBlog({
          authors: {
            pejedev: {
              name: "PejeDev",
              title: "King of Mice",
              picture:
                "https://pbs.twimg.com/profile_images/1707612485291827200/wk3_fhMU_400x400.jpg",
              url: "https://pejedev.xyz",
            },
          },
        }),
      ],
      title: "Code🐭Whiskers",
      social: {
        github: "https://github.com/PejeDev/CodeWhiskers",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
