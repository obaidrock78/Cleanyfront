import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import chatAvatar from '../../../assets/chat-avatar.png';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

function Chat() {
  const [chatMessage, setChatMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (chatMessage === '') {
    }
  };

  return (
    <Box
      sx={{
        boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
        border: ' 1px solid rgba(98,105,118,.16)',
        background: '#f2f5f8',
        borderRadius: '4px',
      }}
    >
      <Box
        sx={{
          padding: '10px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& img': {
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '2px solid green',
            },
            '& h3': {
              margin: 'unset',
            },
            '& p': {
              margin: 'unset',
            },
          }}
        >
          <img src={chatAvatar} alt="avatar" />
          <Box sx={{ paddingLeft: '0.5rem' }}>
            <h3>Booking Chat</h3>
            <p>Active</p>
          </Box>
        </Box>
        <StarIcon sx={{ fill: '#d8dadf' }} />
      </Box>
      <Box sx={{ height: '60vh', background: 'gray', overflowY: 'auto' }}></Box>
      <Box sx={{ padding: '10px' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ background: 'white' }}
            error={loading && chatMessage === ''}
            multiline
            rows={3}
            id="outlined-error"
            fullWidth
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <Box
            sx={{
              paddingTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
            }}
          >
            <LoadingButton
              size="small"
              type="submit"
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              SEND
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Chat;
