import React from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
import { SheetsRegistry } from 'react-jss'
import { JssProvider } from 'react-jss'

import RouterMain from './router'

const setupJss = () => {
  jss.setup(preset())
  const sheetsRegistry = new SheetsRegistry();

  const globalStyleSheet = jss.createStyleSheet(
    {
      '@global': {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        body: { 
          backgroundColor: '#F7F7F9',
          fontFamily: 'Roboto, sans- serif'
        }
      } 
    }
  ).attach()

  sheetsRegistry.add(globalStyleSheet)

  return sheetsRegistry
}

const sheets = setupJss()

const App = () => {
  return  (
    <JssProvider registry={sheets}>
      <RouterMain />
    </JssProvider>
  )
}

export default App;
