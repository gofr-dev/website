import { PkgRedirect } from '@/components/PkgRedirect'


export const metadata = {
  title: 'gofr/datasource/mongo — GoFr Go Package',
  description: 'Go module path for gofr/datasource/mongo. This redirect-only page sends visitors to the GoFr documentation for setup, configuration, and usage examples.',
}

export default function Page() {
  return <PkgRedirect name="gofr/datasource/mongo" docsPath="/docs/datasources/mongodb" />
}
