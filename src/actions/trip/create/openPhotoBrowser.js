export const OPEN_PHOTO_BROWSER = 'TRIPS.NEW.OPEN_PHOTO_BROWSER';

/**
 *
 * @param forChapter
 * @param intent
 * @return {{type: string, forChapter: number}}
 */
export default function openPhotoBrowser(forChapter: number, intent: string) {
  return {
    type: OPEN_PHOTO_BROWSER,
    forChapter,
    intent
  }
}