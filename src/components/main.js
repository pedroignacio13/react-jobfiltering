import { useState, useRef, useEffect } from 'react'

import Job from './job'
import FilterBar from './filter-bar'
import TopicFiltered from './topicFiltered'

import '../styles/main.css'

function Main(){

  const [jobs, setJobs] = useState([])
  const [jobsBkp, setJobsBkp] = useState([])

  const filterbarRef = useRef(null)

  useEffect(() => {
    fetch('data.json', {
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      setJobs(data)
      setJobsBkp(data)
    })
  }, [])
  
  function filterLanguagesAndTools(lang){
    setJobs(jobs.filter(({ languages, tools }) => {
      return languages.includes(lang) || tools.includes(lang)
    }))
    filterbarRef.current.append(<TopicFiltered info={lang} />)
  }
  function filterRoles(role){
    setJobs(jobs.filter((data) => {
      return data.role === role
    }))
    filterbarRef.current.append(<TopicFiltered info={role} />)
  }
  function filterLevel(level){
    setJobs(jobs.filter((data) => {
      return data.level === level
    }))
    filterbarRef.current.append(<TopicFiltered info={level} />)
  }
  function clearFilter(){
    setJobs(jobsBkp)
    filterbarRef.current.innerText = ""
  }

  return(
    <main>
      <FilterBar filterbarRef={filterbarRef} clearFilter={clearFilter} />
      {
        jobs.map((data, index) => {
          return <Job 
           key={data.id}
           job={data}
           filterRoles={filterRoles} 
           filterLanguagesAndTools={filterLanguagesAndTools} 
           filterLevel={filterLevel} 
          />
        })
      }
    </main>
  )
}

export default Main