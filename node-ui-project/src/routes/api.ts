import { Router, Request, Response } from 'express';

export const router = Router();

// Sample data
interface Item {
    id: number;
    name: string;
    description: string;
}

let items: Item[] = [
    { id: 1, name: 'Item 1', description: 'First item' },
    { id: 2, name: 'Item 2', description: 'Second item' },
    { id: 3, name: 'Item 3', description: 'Third item' },
];

// GET all items
router.get('/items', (req: Request, res: Response) => {
    res.json(items);
});

// GET single item
router.get('/items/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// POST new item
router.post('/items', (req: Request, res: Response) => {
    const newItem: Item = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description,
    };

    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT update item
router.put('/items/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);

    if (index !== -1) {
        items[index] = { ...items[index], ...req.body };
        res.json(items[index]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// DELETE item
router.delete('/items/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);

    if (index !== -1) {
        const deleted = items.splice(index, 1);
        res.json(deleted[0]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});
