export const metadata = {
  other: {
    'go-import': 'gofr.dev git https://github.com/gofr-dev/gofr',
    'go-source':
      'gofr.dev https://github.com/gofr-dev/gofr https://github.com/gofr-dev/gofr/tree/main{/dir} https://github.com/gofr-dev/gofr/blob/main{/dir}/{file}#L{line}',
  },
}

export default function RootLayout({ children }) {
  return children
}
