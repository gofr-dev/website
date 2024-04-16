import RedditIcon from '@mui/icons-material/Reddit'
import GitHubIcon from '@mui/icons-material/GitHub'

const navigation = [
  {
    name: 'Facebook',
    href: 'https://github.com/gofr-dev/gofr',
    icon: (props) => <RedditIcon {...props} />,
  },
  {
    name: 'GitHub',
    href: 'https://www.reddit.com/r/gofr/',
    icon: (props) => <GitHubIcon {...props} />,
  },
]
function FooterUi() {
  return (
    <footer className="dark:bg-slate-900">
      <div className="md:center mx-auto max-w-7xl justify-center px-6 py-12 md:flex md:items-center lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        {/* <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2024 GoFr. All rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  )
}

export default FooterUi
