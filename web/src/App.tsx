import { useState, type FormEvent } from 'react'
import { saveTranscript, type Transcript } from './api'
import './App.css'

function App() {
  const [companyName, setCompanyName] = useState('Example Company')
  const [agentName, setAgentName] = useState('Alex')
  const [content, setContent] = useState(
    'Customer: I need help updating my order.\nAgent: I can help with that. May I have your order number?',
  )
  const [saved, setSaved] = useState<Transcript | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSaved(null)
    setSaving(true)

    try {
      const transcript = await saveTranscript({
        company_name: companyName.trim(),
        agent_name: agentName.trim(),
        content: content.trim(),
      })
      setSaved(transcript)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save transcript')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="page">
      <header>
        <h1>Save a sample call transcript</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <label htmlFor="company">Company</label>
        <input id="company" value={companyName} onChange={(event) => setCompanyName(event.target.value)} required />

        <label htmlFor="agent">Agent</label>
        <input id="agent" value={agentName} onChange={(event) => setAgentName(event.target.value)} required />

        <label htmlFor="content">Transcript</label>
        <textarea id="content" rows={8} value={content} onChange={(event) => setContent(event.target.value)} required />

        <button disabled={saving} type="submit">{saving ? 'Saving…' : 'Save transcript'}</button>
      </form>

      {error && <p className="error" role="alert">{error}</p>}
      {saved && (
        <section className="result" aria-live="polite">
          <h2>Saved to Database</h2>
          <p>Transcript ID: <strong>{saved.id}</strong></p>
          <p>Saved at: {new Date(saved.created_at).toLocaleString()}</p>
          <pre>{saved.content}</pre>
        </section>
      )}
    </main>
  )
}

export default App
