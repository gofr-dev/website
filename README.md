## Getting started

To get started with this site, first install the npm dependencies:

```bash
yarn install
```

Next, run the development server:

```bash
yarn dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.
## WITH DOCKER SETTING UP IS EASY :
Just use this command to build :
-->  docker build . -t (img-name) 
to run this image :-
-->  docker run -p 3000:3000 (img-name)
And you will have project locally without installing dependencies and open [http://localhost:3000] to view website in browser.
## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## Global search

This template includes a global search that's powered by the [FlexSearch](https://github.com/nextapps-de/flexsearch) library. It's available by clicking the search input or by using the `⌘K` shortcut.

This feature requires no configuration, and works out of the box by automatically scanning your documentation pages to build its index. You can adjust the search parameters by editing the `/src/markdoc/search.mjs` file.

## Learn more

To learn more about the technologies used in this site, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [Markdoc](https://markdoc.io) - the official Markdoc documentation
- [Algolia Autocomplete](https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete/) - the official Algolia Autocomplete documentation
- [FlexSearch](https://github.com/nextapps-de/flexsearch) - the official FlexSearch documentation
