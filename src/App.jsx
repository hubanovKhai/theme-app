import { useState } from 'react'
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'

export default function App() {
  const [engine, setEngine] = useState('context')

  return (
    <div className="app-layout">
      <Header
        engine={engine}
        onToggleEngine={() =>
          setEngine((previous) =>
            previous === 'context' ? 'zustand' : 'context',
          )
        }
      />
      <Content engine={engine} />
      <Footer />
    </div>
  )
}
