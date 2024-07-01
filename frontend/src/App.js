import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LeftPanel from './components/LeftPanel';
import MidPanel from './components/MidPanel';
import RightPanel from './components/RightPanel';
import CustomDragLayer from './components/CustomDragLayer';
import Toolbar from './components/Toolbar';
import './App.css';

const App = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [connections, setConnections] = useState([]);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const [startNode, setStartNode] = useState(null);

    const handleNodeClick = (node) => {
        if (isConnecting) {
            if (!startNode) {
                setStartNode(node);
            } else {
                // Prevent connecting a node to itself
                if (startNode.id === node.id) {
                    alert("Cannot connect a node to itself.");
                    setIsConnecting(false);
                    setStartNode(null);
                    return;
                }

                // Prevent connecting a node that already has a parent
                if (connections.some(connection => connection.endNode === node.id)) {
                    alert("This node already has a parent. You can only connect from a parent node to a child node.");
                    setIsConnecting(false);
                    setStartNode(null);
                    return;
                }

                // Prevent connecting more than one left or right child
                if ((startNode.left && node.type === 'left') || (startNode.right && node.type === 'right')) {
                    alert("A node can only have one left and/or right child. This node already has a left or right child.");
                    setIsConnecting(false);
                    setStartNode(null);
                    return;
                }

                // Prevent connecting from a child node to a parent node
                if (startNode.type === 'left' || startNode.type === 'right') {
                    if (node.type === 'root' || connections.some(connection => connection.endNode === node.id)) {
                        alert("You must start from the parent node and connect to the child node.");
                        setIsConnecting(false);
                        setStartNode(null);
                        return;
                    }
                }

                // Add the connection
                if (node.type === 'left' && !startNode.left) {
                    setConnections(prevConnections => [...prevConnections, { startNode: startNode.id, endNode: node.id }]);
                    setNodes(prevNodes => prevNodes.map(n => {
                        if (n.id === startNode.id) {
                            n.left = node.id;
                        }
                        return n;
                    }));
                } else if (node.type === 'right' && !startNode.right) {
                    setConnections(prevConnections => [...prevConnections, { startNode: startNode.id, endNode: node.id }]);
                    setNodes(prevNodes => prevNodes.map(n => {
                        if (n.id === startNode.id) {
                            n.right = node.id;
                        }
                        return n;
                    }));
                }

                setStartNode(null);
                setIsConnecting(false);
            }
        } else if (isDisconnecting) {
            if (!startNode) {
                setStartNode(node);
            } else {
                setConnections(prevConnections => {
                    const newConnections = prevConnections.filter(
                        connection => !(connection.startNode === startNode.id && connection.endNode === node.id) &&
                                      !(connection.startNode === node.id && connection.endNode === startNode.id)
                    );
                    // Reset the node properties
                    setNodes(prevNodes => prevNodes.map(n => {
                        if (n.id === startNode.id) {
                            if (n.left === node.id) {
                                n.left = null;
                            } else if (n.right === node.id) {
                                n.right = null;
                            }
                        }
                        return n;
                    }));
                    return newConnections;
                });
                setStartNode(null);
                setIsDisconnecting(false);
            }
        } else {
            setSelectedNode(node);
        }
    };

    const handleValueChange = (value) => {
        setNodes(prevNodes =>
            prevNodes.map(node =>
                node.id === selectedNode.id ? { ...node, value } : node
            )
        );
        setSelectedNode(prevNode => ({ ...prevNode, value }));
    };

    const handleNodeMove = (id, x, y) => {
        setNodes(prevNodes =>
            prevNodes.map(node =>
                node.id === id ? { ...node, x, y } : node
            )
        );
    };

    const handleDeleteNode = (id) => {
        setConnections(prevConnections => {
            const newConnections = prevConnections.filter(
                connection => connection.startNode !== id && connection.endNode !== id
            );
            setNodes(prevNodes => prevNodes.map(n => {
                if (n.left === id) n.left = null;
                if (n.right === id) n.right = null;
                return n;
            }));
            return newConnections;
        });
        setNodes(prevNodes => prevNodes.filter(node => node.id !== id));
    };

    const handleConnectNodes = () => {
        setIsConnecting(!isConnecting);
        setStartNode(null);
        setIsDisconnecting(false);
    };

    const handleDisconnectNodes = () => {
        setIsDisconnecting(!isDisconnecting);
        setStartNode(null);
        setIsConnecting(false);
    };

    const handleReset = () => {
        setNodes([]);
        setConnections([]);
        setSelectedNode(null);
        setStartNode(null);
        setIsConnecting(false);
        setIsDisconnecting(false);
    };

    const handleExport = () => {
        const treeData = JSON.stringify({ nodes, connections }, null, 2);
        const blob = new Blob([treeData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'binary_tree.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app">
                <div className="title">
                    <h1>Binary Tree Builder</h1>
                </div>
                <div className="content">
                    <LeftPanel nodes={nodes} />
                    <div className="main-panel">
                        <MidPanel 
                            onNodeClick={handleNodeClick} 
                            nodes={nodes} 
                            setNodes={setNodes}
                            onNodeMove={handleNodeMove} 
                            onDeleteNode={handleDeleteNode} 
                            connections={connections}
                        />
                        <Toolbar 
                            onConnectNodes={handleConnectNodes} 
                            isConnecting={isConnecting} 
                            onDisconnectNodes={handleDisconnectNodes}
                            isDisconnecting={isDisconnecting} 
                            onReset={handleReset}
                        />
                    </div>
                    <RightPanel selectedNode={selectedNode} onValueChange={handleValueChange} onExport={handleExport} />
                </div>
                <CustomDragLayer nodes={nodes} connections={connections} />
            </div>
        </DndProvider>
    );
};

export default App;
