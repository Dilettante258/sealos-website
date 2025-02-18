import { domain } from '@/config/site';
import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, domain).toString();

  return [
    {
      url: url('/'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: url('/docs'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
        url: url('/blog'),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ...(await Promise.all(
      source.getPages().map(async (page) => {
        return {
          url: url(page.url),
          changeFrequency: 'weekly',
          priority: 0.5,
        } as MetadataRoute.Sitemap[number];
      }),
    )),
  ];
}