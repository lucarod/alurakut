import { useState } from 'react'
// import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationship'

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${githubUser}.png`} alt="Avatar" style={{ borderRadius: '8px' }}/>
      <hr/>
      
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>

      <hr/>

      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

export default function Home() {
  const userName = 'lucarod'

  const [communities, setCommunities] = useState([{
    id: '2489127421759125',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])

  const favoritePeople = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image'),
    }
    const updatedCommunities = [...communities, community]
    setCommunities(updatedCommunities)
  }

  return (
    <>
      <AlurakutMenu githubUser={userName}/>
      <MainGrid>
        <div className="profile-area" style={{ gridArea: 'profile-area' }}>
          <ProfileSidebar githubUser={userName}/>
        </div>
        <div className="welcome-area" style={{ gridArea: 'welcome-area' }}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet/>
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <input 
                  type="text" 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade"
                  />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Coloque uma URL para usar de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usar de capa"
                  />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
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
                  <li key={person}>
                    <a href={`/users/${person}`} key={person}>
                      <img src={`https://github.com/${person}.png`} alt="Avatar" />
                      <span>{person}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length}):
            </h2>

            <ul>
              {communities.map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/users/${community.title}`}>
                      <img src={community.image} alt="Avatar" />
                      <span>{community.title}</span>
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