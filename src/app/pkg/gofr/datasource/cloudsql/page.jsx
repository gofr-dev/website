import { PkgRedirect } from '@/components/PkgRedirect'


export const metadata = {
  title: 'gofr/datasource/cloudsql — GoFr Go Package',
  description: 'Go module path for gofr/datasource/cloudsql. This redirect-only page sends visitors to the GoFr documentation for setup, configuration, and usage examples.',
}

export default function Page() {
  return <PkgRedirect name="gofr/datasource/cloudsql" docsPath="/docs/datasources/cloudsql" />
}
