import React from 'react'
import { Grid, Box, TextField, IconButton } from '@mui/material'
import { SendOutlined } from '@mui/icons-material'
const Chats = [
  {
    id: 1,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 2,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 3,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 4,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 5,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 6,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 7,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 8,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 9,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 10,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 11,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 12,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 13,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 14,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 15,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 16,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 17,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 18,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 19,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 20,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 21,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 23,
    name: 'Haseeb ALi Khan'
  },
  {
    id: 23,
    name: 'Haseeb ALi Khan'
  },

]

const Chat = () => {
  return (
    <Grid container >
      <Grid item md={4} sx={{ borderRight: '1px   lightgray', height: '500px' }}>
        All Chats
        <Grid container sx={{ overflowY: 'scroll', height: '500px' }}>
          {
            Chats.map((chat) => {
              return (
                <Grid key={chat.id} item md={12} sx={{ p: 2, border: '1px dashed lightgray', m: 2 }}> {chat.name}</Grid>
              )
            })
          }
        </Grid>
      </Grid>
      <Grid item md={8} sx={{ p: 2 }}> Single Chat
        <Grid container>
          <Grid item md={12} sx={{ height: '600px', overflowY: 'scroll', height: '500px', display: 'flex', flexDirection: ' column-reverse' }}>
            {
              Chats.map((chat) => {
                return (
                  <>
                    <Box >
                      <Box
                        component='h4'
                        variant='h4'
                        sx={{ padding: 2, margin: 2, textAlign: 'right', display: 'flex', justifyContent: 'left', alignItems: 'center' }}
                        key={chat.id}>
                        <Box
                          component={'img'}
                          sx={{ width: '50px', height: '50px', borderRadius: '50%', }}
                          src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png" />
                        {chat.name}
                      </Box>
                    </Box>
                    <Box >
                      <Box
                        component='h4'
                        variant='h4'
                        sx={{ padding: 2, margin: 2, textAlign: 'left', display: 'flex', justifyContent: 'right', alignItems: 'center' }}
                        key={chat.id} >
                        {chat.name}
                        <Box
                          component={'img'}
                          sx={{ width: '50px', height: '50px', borderRadius: '50%', }}
                          src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png" />
                      </Box>
                    </Box>
                  </>
                )
              })
            }
          </Grid>
          <Grid item md={11} sx={{ bottom: 0 }}>
            <Box>
              <TextField fullWidth label="Type Here" id="fullWidth" />
            </Box>
          </Grid>
          <Grid item md={1} sx={{ bottom: 0 }}>
            <Box>
              <IconButton>
                <SendOutlined />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Chat