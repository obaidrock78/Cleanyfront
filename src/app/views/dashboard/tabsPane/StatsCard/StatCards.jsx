import React, { useState } from 'react';
import { Box, Card, Grid, Icon, MenuItem, styled, TextField } from '@mui/material';
import { Small } from 'app/components/Typography';
import { GET_CARD_DATA } from '../../../../api';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from '../../../../../axios';

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
    'alarm',
    'accessibility_icon',
  ];

  const [cardList, setCardList] = React.useState([]);
  const [showHide, setShowHide] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([
    '7_days',
    '7_days',
    '7_days',
    '7_days',
    '7_days',
    '7_days',
  ]);
  const options = {
    chart: {
      id: 'basic-bar',
      height: 380,
      grid: {
        show: false,
      },
    },
    xaxis: {
      show: false,
      // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    },
    yaxis: {
      show: false,
      // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    },
  };
  const series = [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  React.useEffect(() => {
    getCardData();
  }, [selectedFilter]);

  const getCardData = async () => {
    await axios
      .get(
        `${GET_CARD_DATA}?customer_filter=${selectedFilter[0]}&page_view_filter=${selectedFilter[1]}&booking_filter=${selectedFilter[2]}&amount_filter=${selectedFilter[3]}&hours_filter=${selectedFilter[4]}`
      )
      .then((res) => {
        const dataToMap = res?.data?.data;
        dataToMap.forEach((object, index) => {
          object.icon = iconList[index];
        });
        setCardList(dataToMap);
      })
      .catch((err) => console.log(err));
  };
  const handleSelectChange = (value, index) => {
    let dupArr = [...selectedFilter];
    dupArr[index] = value;
    setSelectedFilter(dupArr);
  };
  return (
    <Grid container spacing={2} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={4} md={4} lg={4} xl={3} key={index}>
          <StyledCard elevation={6} sx={{ position: 'relative', paddingTop: '3rem !important' }}>
            {index === 5 ? null : (
              <Box
                sx={{
                  position: 'absolute',
                  right: '10px',
                  top: '0px',
                  '& .MuiSelect-outlined': {
                    fontSize: '11px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                  },
                }}
              >
                <TextField
                  select
                  variant="outlined"
                  size="small"
                  value={selectedFilter[index]}
                  onChange={(e) => handleSelectChange(e.target.value, index)}
                  margin="dense"
                >
                  <MenuItem value="7_days">Last 7 days</MenuItem>
                  <MenuItem value="30_days">Last 30 days</MenuItem>
                  <MenuItem value="90_days">Last 3 months</MenuItem>
                </TextField>
              </Box>
            )}

            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }} gap={1}>
                  {index === 3 ? (
                    <>
                      {showHide && (
                        <Heading>
                          {item?.value?.toString()?.includes('.')
                            ? item.value.toFixed(4)
                            : item.value}
                        </Heading>
                      )}
                    </>
                  ) : (
                    <Heading>
                      {item?.value?.toString()?.includes('.')
                        ? item.value.toFixed(4)
                        : item.value === null
                        ? 0
                        : item.value}
                    </Heading>
                  )}
                  {index === 3 && (
                    <>
                      {showHide ? (
                        <VisibilityOffIcon
                          sx={{ fontSize: '1.2rem', cursor: 'pointer' }}
                          onClick={() => setShowHide(false)}
                        />
                      ) : (
                        <RemoveRedEyeIcon
                          sx={{ fontSize: '1.2rem', cursor: 'pointer' }}
                          onClick={() => setShowHide(true)}
                        />
                      )}
                    </>
                  )}
                </Box>
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
