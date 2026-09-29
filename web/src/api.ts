const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '')

export type TranscriptInput = {
  company_name: string
  agent_name: string
  content: string
}

export type Transcript = TranscriptInput & {
  id: number
  created_at: string
}

async function readResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.detail || `Request failed (${response.status})`)
  }
  return response.json() as Promise<T>
}

export async function saveTranscript(input: TranscriptInput): Promise<Transcript> {
  return readResponse(
    await fetch(`${apiUrl}/transcripts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    }),
  )
}
