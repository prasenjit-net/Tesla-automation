import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

interface Item {
    id: number
    name: string
    description: string
}

// API functions
const fetchItems = async (): Promise<Item[]> => {
    const response = await fetch('/api/items')
    if (!response.ok) throw new Error('Failed to fetch items')
    return response.json()
}

const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
    const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    })
    if (!response.ok) throw new Error('Failed to create item')
    return response.json()
}

const deleteItem = async (id: number): Promise<void> => {
    const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete item')
}

export default function Items() {
    const queryClient = useQueryClient()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    // Fetch items
    const { data: items, isLoading, error } = useQuery({
        queryKey: ['items'],
        queryFn: fetchItems,
    })

    // Create item mutation
    const createMutation = useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] })
            setName('')
            setDescription('')
        },
    })

    // Delete item mutation
    const deleteMutation = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] })
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name && description) {
            createMutation.mutate({ name, description })
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {(error as Error).message}</div>

    return (
        <div>
            <h1>Items Management</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginRight: '0.5rem', padding: '0.5rem' }}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ marginRight: '0.5rem', padding: '0.5rem' }}
                    />
                    <button type="submit" disabled={createMutation.isPending}>
                        {createMutation.isPending ? 'Adding...' : 'Add Item'}
                    </button>
                </div>
            </form>

            <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                {items?.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            border: '1px solid #ccc',
                            padding: '1rem',
                            marginBottom: '0.5rem',
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h3>
                            <p style={{ margin: 0 }}>{item.description}</p>
                        </div>
                        <button
                            onClick={() => deleteMutation.mutate(item.id)}
                            disabled={deleteMutation.isPending}
                            style={{ backgroundColor: '#dc3545' }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
