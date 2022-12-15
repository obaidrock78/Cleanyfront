import React from 'react'
import { Grid, Box, TextField, IconButton } from '@mui/material';
import { SendOutlined } from '@mui/icons-material';
import { ADMIN_CHAT, GET_ADMIN_CHAT } from 'app/api';
import axios from "../../../../../axios"
import toast, { Toaster } from 'react-hot-toast';
import { purple } from '@mui/material/colors';



const Chat = () => {
  const [users, setUsers] = React.useState([])
  const [selectedChat, setSelectedChat] = React.useState([])
  const [noChatSelected, setNoChatSelected] = React.useState(true)
  const [chatData, setChatData] = React.useState()
  const [message, setMessage] = React.useState('')
  console.log(chatData)
  React.useEffect(() => { getAdminChats() }, [])
  const getAdminChats = async () => {
    await axios
      .get(`${GET_ADMIN_CHAT}`)
      .then((res) => {
        const dataToMap = res?.data?.data
        setUsers(dataToMap)
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const values = {
      "message": message,
      "is_read": true,
      "collection": chatData.chats[0].collection,
      "parent_id": chatData.chat[0].parent_id,
    }
    toast.promise(
      axios.post(`${ADMIN_CHAT}`, values, {
        headers: { 'Content-Type': 'application/json' },
      }),
      {
        loading: () => {
          return `Sending your Message To Admin  `;
        },
        success: (res) => {
          return 'Service Created';
        },
        error: (err) => {
          return err?.message;
        },
      }
    );
  }
  return (
    <Grid container >
      <Grid item md={4} sx={{ borderRight: '1px   lightgray', height: '500px' }}>
        All Chats
        <Grid container sx={{}}>
          {
            users.map((chat) => {
              return (
                <Grid item md={12} sx={{ p: 1, border: '1px solid lightgray', m: 2, height: '50px', }}
                  onClick={() => {
                    setSelectedChat(chat.chats);
                    setNoChatSelected(false);
                    setChatData(chat)
                  }}
                >  {chat.user.email}</Grid>
              )
            })
          }
        </Grid>
      </Grid>
      <Grid item md={8} sx={{ p: 2 }}> Single Chat
        <Grid container>
          <Grid item md={12} sx={{ height: '600px', overflowY: 'scroll', height: '500px', display: 'flex', flexDirection: ' column',  }}>
            {noChatSelected ? <> Select a chat to start Conversation </> : <>
              {
                selectedChat.map((chat) => {
                  return (
                    <>
                      {chat.parent_id !== null ?
                        <Box  >
                          <Box
                            component='h4'
                            variant='h4'
                            sx={{ padding: 2, margin: 2, textAlign: 'right', display: 'flex', justifyContent: 'left', alignItems: 'center' }}
                            key={chat.id}>
                            <Box
                              component={'img'}
                              sx={{ width: '50px', height: '50px', borderRadius: '50%', }}
                              src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png" />

                            {chat.message}
                          </Box>
                        </Box>
                        :
                        <Box  >
                          <Box
                            component='h4'
                            variant='h4'
                            sx={{ padding: 2, margin: 2, textAlign: 'left', display: 'flex', justifyContent: 'right', alignItems: 'center' }}
                            key={chat.id} >

                            {chat.message}
                            <Box
                              component={'img'}
                              sx={{ width: '50px', height: '50px', borderRadius: '50%', }}
                              src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png" />
                          </Box>
                        </Box>
                      }
                    </>
                  )
                })
              }
            </>}


          </Grid>
          {!noChatSelected && <Grid md={12} item>
            <Box component='form' onSubmit={handleSubmit} width='100% '>
              <Grid container>
                <Grid item md={11} sx={{ bottom: 0 }}>
                  <Box>
                    <TextField fullWidth label="Type Here" id="fullWidth" onChange={(e) => { setMessage(e.target.value) }} />
                  </Box>
                </Grid>
                <Grid item md={1} sx={{ bottom: 0 }}>
                  <Box>
                    <IconButton type='submit'>
                      <SendOutlined />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>}

        </Grid>
      </Grid>
    </Grid >
  )
}

export default Chat