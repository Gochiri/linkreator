'use client'

import data from '@/components/image-generator/data.json'
import { ImageGenerator } from '@/components/image-generator/components/ImageGenerator'

export default function ImageGeneratorView() {
    return (
        <div className="h-[calc(100vh-6rem)] max-w-7xl mx-auto rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <ImageGenerator
                imageTypes={data.imageTypes}
                formats={data.formats}
                sampleImages={data.sampleImages}
                brandColors={data.brandColors}
            />
        </div>
    )
}
