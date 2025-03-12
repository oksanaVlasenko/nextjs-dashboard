// import { unstable_cache } from "next/cache";
// import { getWordOfTheDay } from "./actions";
// import { fetchLanguagesList } from "../languages/actions";

// export const getWordOfDay = unstable_cache(async () => {
//   const data = await fetchLanguagesList()

//   console.log(data, 'unstable_cache')

//   return data
// }, 
// ['wordOfDay'],
// {
//   tags: ['word-of-day'],
//   revalidate: 3600,  
// })