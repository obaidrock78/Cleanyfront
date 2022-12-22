import React from 'react'
import { Grid, Box, TextField, IconButton, Typography, styled } from '@mui/material';
import { SendOutlined } from '@mui/icons-material';
import { ADMIN_CHAT, GET_ADMIN_CHAT } from 'app/api';
import axios from "../../../../../axios"


const ChatHeading = styled('h3')(({ theme }) => ({
	typography: 'body1',
	color: "black",
	borderBottom: '1px solid',
	borderBottomColor: theme.palette.text.secondary,
	textAlign: 'center',
	fontWeight: '900 !important',
	fontSize: '24px !important'
}))

const Chat = () => {
	const [gettingChats, setGettingChats] = React.useState([])
	const [selectedChat, setSelectedChatMessages] = React.useState([])
	const [noChatSelected, setNoChatSelected] = React.useState(true)
	const [message, setMessage] = React.useState('')

	React.useEffect(() => { getAdminChats() }, [])
	const getAdminChats = async () => {
		await axios
			.get(`${GET_ADMIN_CHAT}`)
			.then((res) => {
				const dataToMap = res?.data?.data
				setGettingChats(dataToMap)
			})
			.catch((err) => console.log(err));
	};
	const customerID = selectedChat.filter((customer) => {
		return customer?.user?.user_profile?.role === "Customer" && customer?.user
	});
	const PostAdminChat = async () => {

		const values = {
			"message": message,
			"is_read": true,
			"user": customerID[0].id,
			"collection": selectedChat[0].collection,
			"parent_id": null,
		}
		await axios.post(`${ADMIN_CHAT}`, values, {
			headers: { 'Content-Type': 'application/json' },
		}).then(() => {
			getAdminChats();
		}).catch((error) => {
			console.log(error)
		})
		setMessage('')

	}
	const handleSubmit = (e) => {
		e.preventDefault()
		PostAdminChat()
	}
	return (
		<>
			<ChatHeading  >
				Chatting Room
			</ChatHeading>
			<Grid container >
				<Grid item md={3} sx={{ borderRight: '1px   lightgray', height: '500px', backgroundImage: 'linear-gradient(to bottom, rgba(34,42,69, 0.96), rgba(34,42,69, 0.96)),url(/assets/images/sidebar/sidebar-bg-dark.jpg) ', color: '#fff' }}>
					<Grid container >
						<TextField id="search" label="search user" variant="filled" fullWidth sx={{ bgcolor: '#fbfbfb', mt: 3, mx: 2 }} />
						{
							gettingChats.map((chat) => {
								return (
									<Grid item md={12} sx={{ p: 1, border: '1px   lightgray', display: 'flex', alignItems: 'center', m: 2, height: '50px', "&:hover": { background: 'darkblue', cursor: 'pointer' } }}
										onClick={() => {
											setSelectedChatMessages(chat.chats);
											setNoChatSelected(false);
										}}
									>

										<Box
											component={'img'}
											sx={{ width: '40px', height: '40px', borderRadius: '50%', mr: 1 }}
											src="https://pickaface.net/gallery/avatar/20151205_194059_2696_Chat.png" />{chat?.user?.user_profile?.first_name} {chat?.user?.user_profile?.last_name} </Grid>
								)
							})
						}
					</Grid>
				</Grid>
				<Grid item md={9} sx={{ p: 0, }}>
					<Grid container>

						<Grid item md={12} sx={{ height: '600px', overflowY: 'scroll', height: '500px', display: 'flex', flexDirection: ' column', bgcolor: '#fbfbfb' }}>
							{noChatSelected ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>

								<Typography component='h3' variant='h4' sx={{ color: 'black' }}>   Select a chat to start Conversation </Typography>
							</Box> : <>
								{
									selectedChat.map((chat) => {
										return (
											<Box>

												{chat?.user?.user_profile?.role === 'Admin' ?
													<Box >
														<Box
															component='h4'
															variant='h4'
															sx={{ padding: 2, margin: 2, textAlign: 'left', display: 'flex', justifyContent: 'right', alignItems: 'center', }}
															key={chat.id} >
															<Box sx={{ bgcolor: 'darkblue', color: 'white', p: 2, borderRadius: '10px' }}>
																{chat.message}

															</Box>
														</Box>
													</Box>
													:
													<Box >
														<Box
															component='h4'
															variant='h4'
															sx={{ padding: 2, margin: 2, textAlign: 'right', display: 'flex', justifyContent: 'left', alignItems: 'center' }}
															key={chat.id}>
															<Box sx={{ bgcolor: 'blue', color: 'white', p: 2, borderRadius: '10px' }}>
																{chat.message}
															</Box>
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
											<TextField fullWidth label="Type Here" id="fullWidth" required onChange={(e) => { setMessage(e.target.value) }} />
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
		</>
	)

}

export default Chat