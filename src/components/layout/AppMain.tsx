import React from 'react'
import ImageCanvas from '../image/ImageCanvas'
import ImagesList from '../image/ImagesList'
import Uploader from '../image/Uploader'

export default function AppMain() {
    return (
        <div className='min-h-[calc(100vh-80px)] py-8'>
            <div className="flex gap-x-5 px-10">
            <ImagesList/>
            <Uploader />
            </div>
            <ImageCanvas/>
        </div>
    )
}
