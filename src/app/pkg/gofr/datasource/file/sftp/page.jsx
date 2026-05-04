import { PkgRedirect } from '@/components/PkgRedirect'


export const metadata = {
  title: 'gofr/datasource/file/sftp — GoFr Go Package',
  description: 'Go module path for gofr/datasource/file/sftp. This redirect-only page sends visitors to the GoFr documentation for setup, configuration, and usage examples.',
}

export default function Page() {
  return <PkgRedirect name="gofr/datasource/file/sftp" docsPath="/docs/datasources/getting-started" />
}
