import dynamic from 'next/dynamic'
import config from '../../sanity.config'

const Studio = dynamic(() => import('sanity').then(mod => mod.Studio), {
  ssr: false,
})

export default function StudioPage() {
  return (
    <>
      <style>{`
        .sanity-studio, .sanity-studio * { cursor: auto !important; }
        .sanity-studio button, .sanity-studio a { cursor: pointer !important; }
      `}</style>
      <div style={{ height: '100vh' }}>
        <Studio config={config} />
      </div>
    </>
  )
}