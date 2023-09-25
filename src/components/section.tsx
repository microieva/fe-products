import React, { FC } from 'react'
import Table from './table';

interface SectionProps {
  page: string
}

const Section: FC<SectionProps> = ({page}: SectionProps) => {
  return (
    <section>
      <div>
        component with button for see all {page} && search bar
      </div>
      <div className='tables-wrapper'>
        <Table query='title' page={page}/>
        <Table query='categoryId' page={page}/>
      </div>  
    </section>
  )
}

export default Section;