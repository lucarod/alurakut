import { useState, useEffect } from "react";
// import styled from 'styled-components'
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelationship";

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        alt="Avatar"
        style={{ borderRadius: "8px" }}
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox({ title, items }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length}):
      </h2>

      {/* <ul>
        {followers.map((follower) => {
          return (
            <li key={follower}>
              <a href={`/users/${follower}`} key={follower}>
                <img src={`https://github.com/${follower}.png`} alt="Avatar" />
                <span>{follower}</span>
              </a>
            </li>
          )
        })}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const userName = "lucarod";

  const [followers, setFollowers] = useState([]);
  const [communities, setCommunities] = useState([]);

  const favoritePeople = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
  ];


  useEffect(async () => {
    const responseFollowers = await fetch(
      `https://api.github.com/users/${userName}/followers`
    );
    const fullFilledFollowers = await responseFollowers.json();
    setFollowers(fullFilledFollowers);

    const responseCommunities = await fetch(`https://graphql.datocms.com/`, {
      method: "POST",
      headers: {
        Authorization: "e2fdc8a3f7804bcb41b556f107fdfe",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }`,
      }),
    });

    const fullFilledCommunities = await responseCommunities.json()
    const newCommunities = fullFilledCommunities.data.allCommunities
    setCommunities(newCommunities)
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const community = {
      title: formData.get("title"),
      imageUrl: formData.get("image"),
      creatorSlug: userName,
    };

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(community)
    })
    .then(async (response) => {
      const data = await response.json()
      const newCommunity = data.createdRecord
      const updatedCommunities = [...communities, newCommunity];
      setCommunities(updatedCommunities);
    })
  }

  return (
    <>
      <AlurakutMenu githubUser={userName} />
      <MainGrid>
        <div className="profile-area" style={{ gridArea: "profile-area" }}>
          <ProfileSidebar githubUser={userName} />
        </div>
        <div className="welcome-area" style={{ gridArea: "welcome-area" }}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet />
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
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="relationship-area"
          style={{ gridArea: "relationship-area" }}
        >
          <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({favoritePeople.length}):
            </h2>

            <ul>
              {favoritePeople.map((person) => {
                return (
                  <li key={person}>
                    <a href={`/users/${person}`} key={person}>
                      <img
                        src={`https://github.com/${person}.png`}
                        alt="Avatar"
                      />
                      <span>{person}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({communities.length}):</h2>

            <ul>
              {communities.map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/communities/${community.id}`}>
                      <img src={community.imageUrl} alt="Avatar" />
                      <span>{community.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
