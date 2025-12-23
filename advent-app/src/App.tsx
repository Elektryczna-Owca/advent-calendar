import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [kod, setKod] = useState<string>('')
  const [matchCount, setMatchCount] = useState<number>(0)
  const [secret, setSecret] = useState<string>('')
  const [solved, setSolved] = useState<number>(0)

  // Ala b1sagksz8gkdmpr4lst6a9pb
  const secretAla = 'b1sag'+'ksz8g'+'kdmpr'+'4lst6'+'a9pb'

  // Miko l2sagasz2gokfsm4bym6k6tc
  const secretMiko = 'l2sag'+'asz2g'+'okfsm'+'4bym6'+'k6tc'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const kodParam = params.get('kod')?.toLowerCase() || ''
    setKod(kodParam)

    let matchesAla = 0
    let matchesMiko = 0
    let matches
    let secret

    let maxLength = Math.min(kodParam.length, secretAla.length)
    for (let i = 0; i < maxLength; i++) {
      if (kodParam[i] === secretAla[i]) {
        matchesAla++
      } else {
        break;
      }
    }

    maxLength = Math.min(kodParam.length, secretMiko.length)
    for (let i = 0; i < maxLength; i++) {
      if (kodParam[i] === secretMiko[i] ) {
        matchesMiko++
      } else {
        break;
      }
    }

    if(matchesAla > matchesMiko) {
      matches = matchesAla
      secret = secretAla
      if(matches == secret.length) {
        setSolved(1)
      }
    } else {
      secret = secretMiko
      matches = matchesMiko
      if(matches == secret.length) {
        setSolved(2)
      }
    }
    setMatchCount(matches)
    setSecret(secret)
  }, [])

  return (
    <div className="app-container">
      <h1>Secret Code Matcher</h1>
      {solved === 1 && (
        <div className="winner-banner">
          Brawo Ala! Skarb jest pod szafką, pod biurkiem taty.
        </div>
      )}
      {solved === 2 && (
        <div className="winner-banner">
          Brawo Mikołaju! Skarb jest w drukarce.
        </div>
      )}
      <div className="info-box">
        <p><strong>Your code:</strong> {kod || '(no code provided)'}</p>
        <p><strong>Secret length:</strong> {secret.length} characters</p>
        <p className="match-result">
          <strong>Matching letters:</strong> {matchCount} / {secret.length}
        </p>
      </div>
      <div className="hint">
        <small>Try adding ?kod=yourcode to the URL</small>
      </div>
    </div>
  )
}

export default App
