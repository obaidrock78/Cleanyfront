import React from "react";
import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import { GET_CARD_DATA } from '../../../api';
import axios from '../../../../axios'
import Chart from "react-apexcharts";

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: ' 24px  !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const iconList = [
    'group',
    'attach_money',
    'store',
    'shopping_cart',
    'alarm'
  ];

  const [cardList, setCardList] = React.useState([]);
  const options = {
    chart: {
      id: "basic-bar",
      height: 380,
      grid: {
        show: false,

      }
    },
    xaxis: {
      show: false,
      // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    },
    yaxis: {
      show: false,
      // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    },

  }
  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]

  React.useEffect(() => {
    getCardData()
  }, [])

  const getCardData = async () => {
    await axios
      .get(`${GET_CARD_DATA}`)
      .then((res) => {
        const dataToMap = res?.data?.data
        dataToMap.forEach((object, index) => {
          object.icon = iconList[index];
        });
        setCardList(dataToMap);
      })
      .catch((err) => console.log(err));
  }
  return (
    <Grid container spacing={2} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.value}</Heading>
              </Box>
            </ContentBox>

            {/* <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip> */}

          </StyledCard>

        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
