import data from '@/../product/sections/image-generator/data.json'
import { ImageGenerator } from './components/ImageGenerator'

export default function ImageGeneratorView() {
  return (
    <ImageGenerator
      imageTypes={data.imageTypes}
      formats={data.formats}
      sampleImages={data.sampleImages}
      brandColors={data.brandColors}
    />
  )
}
