# Contact endpoint integration

The attachment picker accepts up to 5 files, 10 MiB total. It never silently drops files into a mailto link.

Set VITE_CONTACT_ENDPOINT in .env.local to the contact backend URL, then restart Vite (or rebuild for production).
The backend must accept multipart/form-data with name, email, subject, message, and repeated attachments fields.
Return HTTP 2xx and JSON {"success":true} only after accepting the email for delivery. Other responses retain the form and files.
Configure the recipient and mail-provider credentials on the server, never in a VITE_ variable. The backend must independently validate files, total size and fields and enforce abuse protection. No delivery provider or backend is configured in this repository yet.

Without an endpoint, messages without files retain the existing mailto flow. Messages with files display an explicit configuration-pending message; they are not sent.
