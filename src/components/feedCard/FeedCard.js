import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import './feedCard.css'

import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import locro from './imagenes/locro.png'
import cucharon from './imagenes/cucharon.png'
import cuaderno from './imagenes/cuaderno.png'
import window from './imagenes/window.png'

const element = <FontAwesomeIcon icon={faCoffee} />

const ExpandMore = styled(props => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

export default function FeedCard ({ post }) {
  const {
    userid,
    username,
    description,
    avatar,
    image,
    created_at,
    category,
    likes
  } = post

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card
      sx={{
        marginTop: 10,
        marginLeft: 2,
        maxWidth: 755,
        maxHeight: 800,
        backgroundColor: '#fbf9f7'
      }}
    >
      <CardHeader
        className='userIntro'
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {avatar ? <img src={avatar} alt={description} /> : 'Av'}
          </Avatar>
        }
        titleTypographyProps={{ variant: 'h5', marginBottom: -1 }}
        title={username}
        subheaderTypographyProps={{ variant: 'subtitle2' }}
        subheader='Amante de los platos regionales'
      />
      <CardMedia
        component='img'
        image={image}
        alt='Locro'
        className='mainImg'
        sx={{ maxWidth: 720, maxHeight: 480, marginLeft: 2, borderRadius: 1 }}
      />

      <CardActions
        disableSpacing
        className='social'
        sx={{
          backgroundColor: '#EC5853',
          justifyContent: 'space-around',
          marginTop: 3,
          marginLeft: 2,
          maxWidth: 720,
          paddingTop: 1.5,
          paddingBottom: 1.5,
          paddingRight: 0,
          paddingLeft: 0
        }}
      >
        {/*{Array(rating) ACA VA A EL RATING QUE DEBERIA VENIR DEL BACKEND
            .fill()
            .map((_, i) => (
                <p>&#11088;</p>
            ))}
            */}
        <div className='socialButton'>
          <button className='socialIcon'>
            <svg
              width='25'
              height='25'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 640 512'
            >
              <path d='M512 32H120c-13.25 0-24 10.75-24 24L96.01 288c0 53 43 96 96 96h192C437 384 480 341 480 288h32c70.63 0 128-57.38 128-128S582.6 32 512 32zM512 224h-32V96h32c35.25 0 64 28.75 64 64S547.3 224 512 224zM560 416h-544C7.164 416 0 423.2 0 432C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48C576 423.2 568.8 416 560 416z' />
            </svg>
            COMPARTIR
          </button>
          <button className='socialIcon'>
            <svg
              width='25'
              height='25'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
            >
              <path d='M384 0H96C60.65 0 32 28.65 32 64v384c0 35.35 28.65 64 64 64h288c35.35 0 64-28.65 64-64V64C448 28.65 419.3 0 384 0zM240 128c35.35 0 64 28.65 64 64s-28.65 64-64 64c-35.34 0-64-28.65-64-64S204.7 128 240 128zM336 384h-192C135.2 384 128 376.8 128 368C128 323.8 163.8 288 208 288h64c44.18 0 80 35.82 80 80C352 376.8 344.8 384 336 384zM496 64H480v96h16C504.8 160 512 152.8 512 144v-64C512 71.16 504.8 64 496 64zM496 192H480v96h16C504.8 288 512 280.8 512 272v-64C512 199.2 504.8 192 496 192zM496 320H480v96h16c8.836 0 16-7.164 16-16v-64C512 327.2 504.8 320 496 320z' />
            </svg>
            GUARDAR
          </button>
          <button className='socialIcon'>
            <svg
              width='25'
              height='25'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 576 512'
            >
              <path d='M560 448H512V113.5c0-27.25-21.5-49.5-48-49.5L352 64.01V128h96V512h112c8.875 0 16-7.125 16-15.1v-31.1C576 455.1 568.9 448 560 448zM280.3 1.007l-192 49.75C73.1 54.51 64 67.76 64 82.88V448H16c-8.875 0-16 7.125-16 15.1v31.1C0 504.9 7.125 512 16 512H320V33.13C320 11.63 300.5-4.243 280.3 1.007zM232 288c-13.25 0-24-14.37-24-31.1c0-17.62 10.75-31.1 24-31.1S256 238.4 256 256C256 273.6 245.3 288 232 288z' />
            </svg>
            VER EL POST
          </button>
        </div>
      </CardActions>

      <CardContent
        className='descriptionFeed'
        sx={{
          marginTop: 3,
          marginBottom: 3,
          marginLeft: 2,
          maxWidth: 710,
          paddingTop: 1,
          paddingBottom: 1,
          paddingRight: 0.5,
          paddingLeft: 0.5,
          backgroundColor: '#fff'
        }}
      >
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}
