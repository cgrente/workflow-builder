import { useCallback, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type Connection,
  type NodeChange,
  type EdgeChange,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const initialNodes: Node[] = [
  { id: '1', position: { x: 250, y: 100 }, data: { label: 'Step 1' } },
]

const initialEdges: Edge[] = []

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  )

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [],
  )

  const exportWorkflow = useCallback(() => {
    const json = JSON.stringify({ nodes, edges }, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'workflow.json'
    link.click()
    URL.revokeObjectURL(url)
  }, [nodes, edges])

  const addStep = useCallback(() => {
    setNodes((nds) => {
      const nextNumber = nds.length + 1
      const newNode: Node = {
        id: `${Date.now()}`,
        position: { x: 100 + Math.random() * 300, y: 100 + Math.random() * 300 },
        data: { label: `Step ${nextNumber}` },
      }
      return [...nds, newNode]
    })
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className="toolbar">
        <button onClick={addStep}>+ Add step</button>
        <button onClick={exportWorkflow}>Export</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
