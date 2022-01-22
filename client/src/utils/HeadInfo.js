import { Helmet } from 'react-helmet'

const HeadInfo = ({title}) => {
  return (
    <Helmet>
      <title>Learnify - {title}</title>
    </Helmet>
  )
}

export default HeadInfo