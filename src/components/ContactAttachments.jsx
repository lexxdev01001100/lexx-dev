import { useState } from 'react'
import { FiPaperclip, FiX } from 'react-icons/fi'

export default function ContactAttachments({ files, onChange, disabled }) {
  const [error, setError] = useState('')
  function selectFiles(event) {
    const selected = [...event.target.files]
    event.target.value = ''
    const next = [...files, ...selected].filter((file, index, all) => all.findIndex(other => other.name === file.name && other.size === file.size && other.lastModified === file.lastModified) === index)
    if (next.some(file => !/\.(pdf|xlsx?|csv|docx?|pptx?|png|jpe?g)$/i.test(file.name))) { setError('Usá PDF, Excel, CSV, Word, PowerPoint, PNG o JPG.'); return }
    if (next.length > 5 || next.reduce((size, file) => size + file.size, 0) > 10 * 1024 * 1024) { setError('Podés adjuntar hasta 5 archivos y 10 MB en total.'); return }
    setError('')
    onChange(next)
  }
  return <div className="contact-attachments contact__field--full">
    <label className="contact-attachments__picker"><FiPaperclip aria-hidden="true" />Adjuntar archivos<input type="file" multiple accept=".pdf,.xls,.xlsx,.csv,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg" onChange={selectFiles} disabled={disabled} aria-describedby="attachment-help" /></label>
    <p id="attachment-help">PDF, Excel, documentos o imágenes · hasta 5 archivos / 10 MB.</p>
    <ul>{files.map((file, index) => <li key={`${file.name}-${file.lastModified}`}><span>{file.name} <small>({Math.ceil(file.size / 1024)} KB)</small></span><button type="button" disabled={disabled} aria-label={`Quitar ${file.name}`} onClick={() => { onChange(files.filter((_, i) => i !== index)); setError('') }}><FiX aria-hidden="true" /></button></li>)}</ul>
    {error && <p role="alert">{error}</p>}
  </div>
}
