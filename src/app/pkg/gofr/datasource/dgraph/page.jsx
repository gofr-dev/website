import { PkgRedirect } from '@/components/PkgRedirect'


export const metadata = {
  title: 'gofr/datasource/dgraph — GoFr Go Package',
  description: 'Go module path for gofr/datasource/dgraph. This redirect-only page sends visitors to the GoFr documentation for setup, configuration, and usage examples.',
}

export default function Page() {
  return <PkgRedirect name="gofr/datasource/dgraph" docsPath="/docs/datasources/dgraph" />
}
