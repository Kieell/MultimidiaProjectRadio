import Head from 'next/head'
import Image from 'next/image'
import {useContext} from 'react'
import { HomeContext } from '../context/HomeContext'
import { musicas } from '../dados/musicas'
import styles from '../styles/Home.module.css'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleFilledOutlined'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutlineOutlined'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import ReplayIcon from '@material-ui/icons/Replay'
import FavoriteIcon from '@material-ui/icons/Favorite'
import GraphicEqIcon from '@material-ui/icons/GraphicEq'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import CopyrightIcon from '@material-ui/icons/Copyright'

import { timeToString } from '../utils/time'


export default function Home() {
  const {
    isPlaying,
    playPause, 
    musicas,
    musicIndex,
    configMusic,
    duration,
    currentTime,
    volume,
    configVolume, 
    configTime, 
  } = useContext(HomeContext);
  
  return (
    <div className={styles.container}>
      <h1>MyMusic <GraphicEqIcon></GraphicEqIcon></h1>
      <div className = {styles.header}>
        <div className = {styles.headerImage}>
          <img src = {`capas/${musicas[musicIndex].capa}`} />
          <div className = {styles.iconContainer}>
          {isPlaying ?
          
            (<button onClick = {playPause}><PauseCircleOutlineIcon className = {styles.play}/></button>):
            (<button onClick = {playPause}><PlayCircleOutlineIcon className = {styles.play}/></button>)
          }
          </div>
          <div className = {styles.control}>
            <input
              className = {styles.timeControl}
              type = "range"
              min = "0"
              max = {duration}
              value ={currentTime}
              onChange = {(e) => configTime(Number(e.target.value))} 
              />
              <div className = {styles.time}>
                <span>{timeToString(currentTime)}</span>
                <span>{timeToString(duration)}</span >
              </div> 
              <div className = {styles.volumIcon}>
              <VolumeUpIcon/>
                <input 
                type ="range"
                min = "0"
                max = "1"
                step = "0.01"
                value = {volume}
                onChange = {(e) => configVolume(Number(e.target.value))}
                />
            
              </div>
          </div>
        </div>

        
        <div className = {styles.user}>
          
          <div className = {styles.userDetails}>
          <div><h1>Listening Now</h1></div>
            <div className = {styles.userPhoto}>
              <div className = {styles.iconContainer}>
              <ReplayIcon className = {styles.userIcon} />
              </div>
              <img src = {`user/${musicas[musicIndex].artista}`} />
              <div className = {styles.iconContainer}>
              <FavoriteIcon className = {styles.userIcon} />
              </div>
            </div>
            <h1>{`${musicas[musicIndex].artistaNome}`}</h1>

          </div>
          
        </div>
      </div>

    <div className = {styles.content}>
      
      <h1 className ={styles.destaques}>My Playlist <PlaylistPlayIcon></PlaylistPlayIcon></h1>
      <div className = {styles.musicList}>
      {
       musicas.map((music, index) => {
        return (
          <div onClick = {() => configMusic(index)} key = {music.audio} className = {styles.musicItem}>
            <img src ={`capas/${music.capa}`}/>
            <div className = {styles.musicDetails}>
            <h1>{music.nome}</h1>
            </div>
          </div >
        )   
       })
      }
      </div>
      <div><h1><CopyrightIcon></CopyrightIcon>MyMusicCorporation</h1></div>
      </div>
    </div>
    
  )
}
