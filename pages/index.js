// import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationship'

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} alt="Avatar" style={{ borderRadius: '8px' }}/>
    </Box>
  )
}

export default function Home() {
  const userName = 'lucarod'
  const favoritePeople = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu/>
      <MainGrid>
        <div className="profile-area" style={{ gridArea: 'profile-area' }}>
          <ProfileSidebar githubUser={userName}/>
        </div>
        <div className="welcome-area" style={{ gridArea: 'welcome-area' }}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet/>
          </Box>
        </div>
        <div className="relationship-area" style={{ gridArea: 'relationship-area' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({favoritePeople.length}):
            </h2>

            <ul>
              {favoritePeople.map((person) => {
                return (
                  <li>
                    <a href={`/users/${person}`} key={person}>
                      <img src={`https://github.com/${person}.png`} alt="Avatar" />
                      <span>{person}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}