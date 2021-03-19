import React from 'react'
import '../styles/job.css'

function Job({ job, filterRoles, filterLevel, filterLanguagesAndTools }){

  const {
    company,
    contract,
    /* id, */
    languages,
    level,
    location,
    logo,
    position,
    postedAt,
    role,
    tools
  } = job

  const linha3 = [postedAt, contract, location]

  const ferramentas = languages.concat(tools)

  return(
    <>
      <div className="job">

        <div className="info">
          {/* img, company, ..., ..., position, postedAt, contract, location */}
          <Image src={logo} />

          <div className="info-second-column">
            <div className="linha1">

              <p className="company">{company}</p>

              {/* NEW */}
              {(postedAt[0] === '1' && postedAt[1] === 'd') && <p className="new">NEW!</p> }
              {(postedAt[0] === '2' && postedAt[1] === 'd') && <p className="new">NEW!</p> }

              {/* FEATURED */}
              {(postedAt[0] === '1' && postedAt[1] === 'd') && <p className="featured">FEATURED</p> }

            </div>
            <div className="linha2">
              {position}
            </div>
            <div className="linha3">
              {                
                linha3.join(' • ')
              }
            </div>
          </div>
        </div>

        <div className="tools">
          {/* role, level, languages */}
          {/* role */}
          <div className="info-topic" onClick={() => filterRoles(role)}  >{role}</div>
          {/* level */}
          <div className="info-topic" onClick={() => filterLevel(level)} >{level}</div>
          {/* languages */}
          {
            ferramentas.map((data, index) => {
              return <div className="info-topic" key={index} onClick={() => filterLanguagesAndTools(data)} >{data}</div>
            })
          }
        </div>

      </div>
    </>
  )
}

function Image({ src }){
  return <img src={src} alt="a" className="company-picture"/>
}

export default Job