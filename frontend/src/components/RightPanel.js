import React from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';

const RightPanel = ({ selectedNode, onValueChange, onExport }) => {
    const handleChange = (event) => {
        console.log('Value Change Detected:', event.target.value);
        onValueChange(event.target.value);
    };

    return (
        <Paper className="right-panel" elevation={3}>
            <Typography variant="h6">Node Properties</Typography>
            {selectedNode ? (
                <TextField
                    label="Value"
                    value={selectedNode.value || ''}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
            ) : (
                <Typography>Select a node to edit its properties</Typography>
            )}
            <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                <Button variant="contained" color="primary" onClick={onExport} style={{ marginTop: 'auto' }}>
                    Export Tree
                </Button>
            </div>
        </Paper>
    );
};

export default RightPanel;
