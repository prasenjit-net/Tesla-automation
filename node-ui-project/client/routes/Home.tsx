export default function Home() {
    return (
        <div>
            <h1>Full-Stack TypeScript Application</h1>
            <p>
                This is a TypeScript full-stack web application with:
            </p>
            <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                <li><strong>Backend:</strong> Node.js + Express + TypeScript</li>
                <li><strong>Frontend:</strong> React + Vite + TypeScript</li>
                <li><strong>Routing:</strong> TanStack Router</li>
                <li><strong>Data Fetching:</strong> TanStack Query</li>
            </ul>
            <p style={{ marginTop: '2rem' }}>
                Navigate to <strong>Items</strong> to see the API integration in action.
            </p>
        </div>
    )
}
