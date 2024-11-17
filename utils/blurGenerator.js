'use server';
import { getPlaiceholder } from 'plaiceholder';

export async function getBlurData(src) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
   
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
}