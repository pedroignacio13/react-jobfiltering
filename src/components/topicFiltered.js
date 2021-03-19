import { IoMdClose } from 'react-icons/io'

import '../styles/topicFiltered.css'

function TopicFiltered({ info }){

  return(
    <div className="topic-filtered">
      <p className="filter-bar-topic">{info}</p>
      <button className="close">
        <IoMdClose />
      </button>
    </div>
  )
}

export default TopicFiltered