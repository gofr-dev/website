import { PkgRedirect } from '@/components/PkgRedirect'


export const metadata = {
  title: 'gofr/datasource/dbresolver — GoFr Go Package',
  description: 'Go module path for gofr/datasource/dbresolver. This redirect-only page sends visitors to the GoFr documentation for setup, configuration, and usage examples.',
}

export default function Page() {
  return <PkgRedirect name="gofr/datasource/dbresolver" docsPath="/docs/datasources/getting-started" />
}
