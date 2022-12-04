import React, { isValidElement } from 'react'
import { useImageStore } from '../../state/state';
import { ALLOWED_EXTENSIONS } from '../../utils/conts';

const isValid = (file: File): boolean => {
    if (!file) return false
    const extension = file.name.split('.').pop() ?? '';
    return ALLOWED_EXTENSIONS.includes(extension);
}

export default function Uploader() {

    const { setImages, images, image, setImage: setImageState } = useImageStore(state => state);

    const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files?.length ? true : false;
        if (files) {
            for (let index = 0; index < e.target?.files?.length!; index++) {
                const file = e.target.files && e.target.files[index] ? e.target.files[index] : null;
                if (file && isValid(file)) {
                    setImages(file);
                    if (!images.length) {
                        setImageState(file);
                    }
                }
            }
        }
    }
    return (

        <div className='transition-all relative border-2 cursor-pointer hover:border-blue-200 hover:text-gray-500 border-dashed py-4 px-6 rounded-md aspect-square'>
            <label htmlFor="file" className='text-2xl font-mono'>+</label>
            <input multiple type="file" name="file" className='opacity-0  cursor-pointer border block absolute w-full h-full inset-0' onChange={setImage} />

        </div>
    )
}
