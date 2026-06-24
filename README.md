# workflow-builder

A drag-and-drop workflow builder for creating directed graphs of steps.

Built with React + Vite + TypeScript and [React Flow](https://reactflow.dev) (`@xyflow/react`).

## Architecture

The workflow is a directed graph held entirely in React state: `nodes` and `edges`, managed by React Flow. There is no backend. The same `{ nodes, edges }` structure is reused everywhere: the JSON export serializes it to a file, and persistence writes it to localStorage and restores it on load. Keeping a single source of truth means a future backend would just swap localStorage for an API call against the same shape.

## Tech stack

- React + TypeScript
- Vite (build and dev server)
- React Flow (`@xyflow/react`) for the canvas, nodes, and edges
- localStorage for persistence (no backend)

## Features

- **Add step** — click the *+ Add step* button to drop a new node on the canvas.
- **Reposition** — drag nodes anywhere.
- **Connect** — drag from a node's handle to another to define order.
- **JSON export** — export the current workflow (nodes and edges) as a JSON file
- **Persistence** — the workflow is saved to localStorage and restored on reload, with a Reset button to clear it

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build

## What's next

With more time, in rough priority order:

- **Undo/redo** — maintain a history stack of graph states, with keyboard shortcuts (Cmd/Ctrl+Z).
- **Validation** — detect cycles in the directed graph and flag invalid connections, since a workflow should not loop back on itself. Also surface orphan nodes.
- **Backend persistence** — replace localStorage with an API endpoint that saves the workflow as JSON, enabling sharing and multi-device access. The export already produces the right data structure for this.
- **Typed nodes and configurable fields** — different step types (start, action, decision) with editable properties.
- **Branching** — conditional edges so a step can route to different next steps based on a condition.
- **Editable labels** — double-click a node to rename it.
