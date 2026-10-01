import { PkgRedirect } from '@/components/PkgRedirect'


export const metadata = {
  title: 'gofr/traces/exporters/gcp — GoFr Go Package',
  description: 'Go module path for gofr/traces/exporters/gcp. This redirect-only page sends visitors to the GoFr documentation for setup, configuration, and usage examples.',
}

export default function Page() {
  return <PkgRedirect name="gofr/traces/exporters/gcp" docsPath="/docs/guides/production-tracing" />
}
