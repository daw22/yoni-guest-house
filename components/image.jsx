'use client';
import Image from 'next/image';
import { getBlurData } from '@/utils/blurGenerator';
import { useEffect, useState } from 'react';

export default async function ImageWithBlur({src, alt}){
  const [base64, setBase64] = useState(null);
  useEffect(() => {
    getBlurData(src).then(setBase64);
  }, [src]);

  return (
    <Image 
    src={src} 
    alt={alt} 
    fill
    sizes='(max-width: 720px) 720px, (max-width: 920px) 920px, 1200px'
    placeholder='blur'
    blurDataURL={base64}
    />
  )
}
