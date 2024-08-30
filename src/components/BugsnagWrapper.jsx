'use client'

import React from 'react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

const BUGSNAG_API_KEY = 'b6dc4b3bd26c10a6d7b062b15be8a26f'

Bugsnag.start({
  apiKey: BUGSNAG_API_KEY,
  plugins: [new BugsnagPluginReact()],
})

export const ErrorBoundary =
  Bugsnag.getPlugin('react').createErrorBoundary(React)
