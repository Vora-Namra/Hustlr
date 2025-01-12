import { Divider } from '@mantine/core'
import React from 'react'
import SearchBar from '../FindTalent/SearchBar'
import Talents from '../FindTalent/Talents'

function FindTalentPage() {
  return (
    <div>
          <SearchBar/>
          <Divider size="xs" color='mineShaft.7'/>
          <Talents/>
    </div>
  )
}

export default FindTalentPage