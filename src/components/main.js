import { useState, useRef, useEffect, useReducer } from 'react'
import { reducer, defaultValues } from '../reducer'
import Job from './job'
import FilterBar from './filter-bar'

import '../styles/main.css'
import '../styles/topicFiltered.css'

function Main(){

  const [jobsBkp, setJobsBkp] = useState([]) /* JUST TO RESTART THE JOBS ARRAY */
  const [jobs, setJobs] = useState([]) /* ARRAY USED TO FILTER */
  const [state, dispatch] = useReducer(reducer, defaultValues)
  const filterbarRef = useRef(null) /* REFERENCE TO THE FILTERBAR COMPONENT */

  /* FETCHING DATA */
  useEffect(() => {
    fetch('data.json', {
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      setJobsBkp(data)
      setJobs(data)
    })
  }, [])

  useEffect(() => {
    if(jobs.length === 0){
      setJobs(jobsBkp)
    }
  }, [jobs.length])

  useEffect(() => {
    setJobs(jobsBkp.filter(({ languages, tools }) => languages.includes(state.langtools[state.langtools.length - 1]) || tools.includes(state.langtools[state.langtools.length - 1])))
  }, [state.langtools.length])
  useEffect(() => {
    setJobs(jobsBkp.filter(({ role }) => role === state.role[state.role.length - 1]))
  }, [state.role.length])
  useEffect(() => {
    setJobs(jobsBkp.filter(({ level }) => level === state.level[state.level.length - 1]))
  }, [state.level.length])

  /* ADDING TOPICS FILTERED INTO THE HEADER BAR */
  function addButton(info, text){
    const div = document.createElement("div")
    div.className += "topic-filtered"
    const p = document.createElement("p")
    p.innerText = text
    p.className += "filter-bar-topic"
    const button = document.createElement("button")
    button.className += "close"
    button.innerText = "X"
    button.name = info + "-" + text
    button.addEventListener("click", removeTopic)
    div.appendChild(p)
    div.appendChild(button)
    filterbarRef.current.appendChild(div)
  }

  /* REMOVE SPECIFIC FILTER FROM THE HEADER BAR */
  /* AO REFERENCIAR O ARRAY DE FILTROS EM CADA OPÇÃO, O ARRAY SEMPRE VEM COM A MUDANÇA ATRASADA */
  function removeTopic(){
    const name = this.name /* get the element name, which is a combinantion of topic and value */
    const arr = name.split("-")
    const info = arr[0] /* level, role or langtools */
    let value = arr[1] /* topic's value */

    const parentDiv = this.parentElement
    const parent = parentDiv.parentNode

    switch(info){
      case 'level':
        dispatch({ type: 'removeLevel', value: value })
        parent.removeChild(parentDiv)
        break;
      case 'role':
        dispatch({ type: 'removeRole', value: value })
        parent.removeChild(parentDiv)
        break;
      case 'langtools':
        dispatch({ type: 'removeLangtools', value: value })
        parent.removeChild(parentDiv)
        break;
    }
  }
  
  /* FILTER FUNCIONS */
  function filterLanguagesAndTools(lang){
    if(!state.langtools.includes(lang)){
      dispatch({ type: 'addLangtools', value: lang })
      addButton("langtools", lang)
    }
  }
  function filterRoles(roleToFilter){
    if(!state.role.includes(roleToFilter)){
      dispatch({ type: 'addRole', value: roleToFilter })
      addButton("role", roleToFilter)
    }
  }
  function filterLevel(level){
    if(!state.level.includes(level)){
      dispatch({ type: 'addLevel', value: level })
      addButton("level", level)
    }     
  }
  function clearFilter(){
    dispatch({ type: 'restore' })
    setJobs(jobsBkp)    
    filterbarRef.current.innerText = ""
  }

  return(
    <main>
      <FilterBar 
       filterbarRef={filterbarRef}
       clearFilter={clearFilter}       
       />
      {
        jobs.map((data) => {
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