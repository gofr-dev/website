import { HomePage } from '@/components/HomePage'

export const metadata = {
  title: 'GoFr - An opinionated Go Framework',
  description:
    'GoFr is an opinionated Go framework within the CNCF Landscape, designed for accelerated microservice development. It features built-in observability tools that export traces, metrics, and logs, enhancing monitoring capabilities. By minimizing boilerplate code, GoFr boosts developer productivity and supports multiple data sources. Some Key features include simplified pub/sub, filesystem operations, cron jobs, WebSocket integration, data migrations, and remote log-level change.',
  metadataBase: new URL('https://gofr.dev'),
  keywords: [
    'gofr',
    'go framework',
    'golang framework',
    'golang web framework',
    'http services',
    'gin gonic',
    'go fiber',
    'fiber',
    'fiber app',
    'fiber logs',
    'go recover',
    'fiber set',
    'fiber router',
  ],
  other: {
    'go-import': 'gofr.dev git https://github.com/gofr-dev/gofr',
  },
}

const Home = () => {
  return <HomePage />
}

export default Home
