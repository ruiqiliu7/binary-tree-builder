import React from 'react';
import { Button, Paper, Typography } from '@mui/material';

const Toolbar = ({ onConnectNodes, isConnecting, onDisconnectNodes, isDisconnecting, onReset }) => {
    return (
        <Paper className="toolbar" elevation={3}>
            <div className="toolbar-buttons">
                <Button variant="contained" color="primary" size="small" onClick={onConnectNodes} className="toolbar-button">
                    {isConnecting ? 'Cancel' : 'Connect'}
                </Button>
                <Button variant="contained" color="secondary" size="small" onClick={onDisconnectNodes} className="toolbar-button">
                    {isDisconnecting ? 'Cancel' : 'Disconnect'}
                </Button>
            </div>
            <div className="toolbar-hints">
                <Typography variant="caption">
                    {isConnecting ? 'Click two nodes to connect' : 
                    isDisconnecting ? 'Click two nodes to disconnect' : 
                    'Select an action'}
                </Typography>
            </div>
            <Button variant="contained" style={{ backgroundColor: 'red', color: '#fff', marginLeft: '20px' }} size="small" onClick={onReset} className="toolbar-button">
                Reset
            </Button>
        </Paper>
    );
};

export default Toolbar;
