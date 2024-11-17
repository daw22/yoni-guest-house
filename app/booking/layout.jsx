'use client'

import { usePathname } from "next/navigation";

function layout({ children, modal }) {
  const pathname = usePathname();
  const isImage = pathname.includes('/image');

  return (
    <div>
      { children }
      { !isImage && modal }
    </div>
  )
}

export default layout;