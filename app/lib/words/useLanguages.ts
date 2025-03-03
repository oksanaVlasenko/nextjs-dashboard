import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(async (res) => {
  const countries = await res.json();

  const uniqueLanguages = new Map();
    
  const filteredCountries = countries
    .filter((country: any) => 
      country.name.common.toLowerCase() !== 'russia' &&
      country.name.common.toLowerCase() !== 'belarus' &&
      Object.keys(country.languages).length > 0
    )
    .map((country: any) => {
      const langEntries = Object.entries(country.languages);
      const mainLang = langEntries.find(([code]) => code !== 'eng') || langEntries[0];

      return {
        flag: country.flags.png,
        id: mainLang[0],
        label: mainLang[1],
        name: country.name.common
      };
    })
    .sort((a: any, b: any) => a.label.localeCompare(b.label));

    for (const country of filteredCountries) {
      if (country.id === 'eng') {
        if (country.name === 'United States') {
          uniqueLanguages.set(country.id, country);
        }
      } else {
        if (!uniqueLanguages.has(country.id)) {
          uniqueLanguages.set(country.id, country);
        }
      }
    }

  return Array.from(uniqueLanguages.values());
})

export function useLanguages() {
  const { data, error, isLoading } = useSWR('https://restcountries.com/v3.1/all?fields=name,languages,flags', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  return {
    langList: data,
    isLoading,
    isError: error
  }
}