export function optimizeImageUrl(url: string, width = 600): string {
  try {
    const imageUrl = new URL(url);

    if (imageUrl.hostname !== 'ik.imagekit.io') {
      return url;
    }

    const pathSegments = imageUrl.pathname.split('/');
    pathSegments.splice(2, 0, `tr:w-${width},q-75,f-auto`);
    imageUrl.pathname = pathSegments.join('/');

    return imageUrl.toString();
  } catch {
    return url;
  }
}
