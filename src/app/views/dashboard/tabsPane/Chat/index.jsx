import React from 'react'
import { Grid, Box, TextField, IconButton, Typography, styled } from '@mui/material';
import { SendOutlined } from '@mui/icons-material';
import { ADMIN_CHAT, GET_ADMIN_CHAT } from 'app/api';
import axios from "../../../../../axios"
import toast, { Toaster } from 'react-hot-toast';


const ChatHeading = styled('h3')(({ theme }) => ({
  typography: 'body1',
  color: theme.palette.text.secondary,
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.text.secondary
}))

const Chat = () => {
  const [users, setUsers] = React.useState([])
  const [selectedChat, setSelectedChat] = React.useState([])
  const [noChatSelected, setNoChatSelected] = React.useState(true)
  const [chatData, setChatData] = React.useState()
  const [message, setMessage] = React.useState('')

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
    <>
      <ChatHeading  >
        Chatting Room
      </ChatHeading>
      <Grid container >
        <Grid item md={3} sx={{ borderRight: '1px   lightgray', height: '500px', backgroundImage: 'linear-gradient(to bottom, rgba(34,42,69, 0.96), rgba(34,42,69, 0.96)),url(/assets/images/sidebar/sidebar-bg-dark.jpg) ', color: '#fff' }}>
          <Grid container sx={{}}>

            {
              users.map((chat) => {
                return (
                  <Grid item md={12} sx={{ p: 1, border: '1px   lightgray', display: 'flex', alignItems: 'center', m: 2, height: '50px', "&:hover": { background: 'darkblue', cursor: 'pointer' } }}
                    onClick={() => {
                      setSelectedChat(chat.chats);
                      setNoChatSelected(false);
                      setChatData(chat)
                    }}
                  >   <Box
                      component={'img'}
                      sx={{ width: '30px', height: '30px', borderRadius: '50%', mr: 1 }}
                      src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png" />{chat.user.email}</Grid>
                )
              })
            }
          </Grid>
        </Grid>
        <Grid item md={9} sx={{ p: 0, }}>
          <Grid container>
            <Grid item md={12} sx={{ height: '600px', overflowY: 'scroll', height: '500px', display: 'flex', flexDirection: ' column', bgcolor: 'lightgray' }}>
              {noChatSelected ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>

                <Typography component='h3' variant='h4' sx={{ color: 'lightgray ' }}>   Select a chat to start Conversation </Typography>
              </Box> : <>
                {
                  selectedChat.map((chat) => {
                    return (
                      <Box>

                        {chat?.user?.user_profile?.role === 'Admin' ?
                          <Box  >
                            <Box
                              component='h4'
                              variant='h4'
                              sx={{ padding: 2, margin: 2, textAlign: 'right', display: 'flex', justifyContent: 'left', alignItems: 'center' }}
                              key={chat.id}>
                              <Box
                                component={'img'}
                                sx={{ width: '40px', height: '40px', borderRadius: '50%', mr: 1 }}
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
                                sx={{ width: '40px', height: '40px', borderRadius: '50%', ml: 1 }}
                                src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png" />
                            </Box>
                          </Box>
                        }
                      </Box>
                    )
                  })
                }
              </>}


            </Grid>
            {!noChatSelected && <Grid md={12} item>
              <Box component='form' onSubmit={handleSubmit} width='100% '>
                <Grid container sx={{ mt: 1 }}>
                  <Grid item md={11.5} sx={{ bottom: 0 }}>
                    <Box>
                      <TextField fullWidth label="Type Here" id="fullWidth" onChange={(e) => { setMessage(e.target.value) }} />
                    </Box>
                  </Grid>
                  <Grid item md={.5} sx={{ bottom: 0 }}>
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
      <Toaster />
    </>
  )

}

export default Chat