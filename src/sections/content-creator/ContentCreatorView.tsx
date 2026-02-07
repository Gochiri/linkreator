import data from '@/../product/sections/content-creator/data.json'
import { ContentCreator } from './components/ContentCreator'

export default function ContentCreatorView() {
  return (
    <ContentCreator
      contentTypes={data.contentTypes}
      samplePosts={data.samplePosts}
      suggestedHashtags={data.suggestedHashtags}
      brandTone={data.brandTone}
      creator={data.creator}
    />
  )
}
