// type SortData = {
//   date: string;
// };

// export default function sortByDateDescending(data: SortData[]) {
//   const monthShortNames: Record<string, string> = {
//     Jan: '01',
//     Feb: '02',
//     Mar: '03',
//     Apr: '04',
//     May: '05',
//     Jun: '06',
//     Jul: '07',
//     Aug: '08',
//     Sep: '09',
//     Oct: '10',
//     Nov: '11',
//     Dec: '12',
//   };

//   return data.sort((a, b) => {
//     const dateA = new Date(
//       a.date.replace(
//         /(\w{3}) (\d{2}), (\d{4})/,
//         (_, p1, p2, p3) =>
//           `${p3}-${monthShortNames[p1 as keyof typeof monthShortNames]}-${p2}`
//       )
//     );
//     const dateB = new Date(
//       b.date.replace(
//         /(\w{3}) (\d{2}), (\d{4})/,
//         (_, p1, p2, p3) =>
//           `${p3}-${monthShortNames[p1 as keyof typeof monthShortNames]}-${p2}`
//       )
//     );
//     return dateB.getTime() - dateA.getTime();
//   });
// }
export type SortData = {
  id: string;
  title: string;
  source: string;
  mode: string;
  category: string[];
  publishedDate: string;
  publishedYear: string;
  newsLink: string;
  contributedBy: string;
  imgSrc?: string;
};

export default function sortNewsArray(data: SortData[]): SortData[] {
  return data.sort((a, b) => {
    const dateA = new Date(a.publishedDate || "1970-01-01").getTime();
    const dateB = new Date(b.publishedDate || "1970-01-01").getTime();
    return dateB - dateA;
  });
}
