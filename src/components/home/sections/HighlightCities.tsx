import { getTopCitiesData } from "@/services/getTopCitiesData";
import { convertFacilityNameSimple } from "@/lib/functions/convertFacilityName";

const HighlightCities = async () => {

    const cities = await getTopCitiesData();
    console.log(cities);

    const cityGrid = ["col-span-3", "col-start-4", "row-span-2 col-start-5", "row-start-2", "col-span-3 row-start-2"];

    type CityData = {
        city: string,
        coworkingCount: number,
        usersInCity: number,
        establishments: {
            type: string,
            count: number
        }[],
        placement: string
    }

    // Création du tableau cityData avec la propriété placement
    const cityData = cities.map((city, index) => ({
        ...city,
        placement: cityGrid[index]
    })) as CityData[];

    console.log(cityData);


    return (
        <div className='mt-16'>
            <h2>Les villes les plus populaires</h2>
            <div className="mt-16 grid grid-cols-5 grid-rows-2 gap-4">
                {cityData.map((cityData) => (
                    <div
                        key={cityData.city}
                        className={`group relative flex cursor-pointer items-center justify-center ${cityData.placement} ${cityData.placement.includes('row-span-2') ? 'calc(h-60vh + 16px)' : 'h-[30vh]'}`}
                        style={{ backgroundImage: `url(/images/${cityData.city}.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}
                    >
                        <div className="text-center text-white">
                            <h3 className="text-2xl font-bold group-hover:opacity-0">{cityData.city}</h3>
                        </div>
                        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-primary/70 text-white opacity-0 transition-opacity 
                        duration-300 ease-in-out group-hover:opacity-100
                        ">
                            <p>
                                {cityData.usersInCity &&
                                    cityData.usersInCity > 0 ?
                                    cityData.usersInCity :
                                    "Pas encore d'"}
                                {cityData.usersInCity &&
                                    cityData.usersInCity > 0 ?
                                    'utilisateurs' :
                                    'utilisateur'

                                }
                            </p>
                            {cityData.establishments.map((establishment) => (
                                <p key={establishment.type}>
                                    {establishment.count} {' '}
                                    {
                                        convertFacilityNameSimple(establishment.type)
                                    }{
                                        establishment.count > 1 ? establishment.type === 'THIRD_PLACE' ? 'x' : 's' : ''
                                    }
                                </p>
                            ))}
                            <h3 className="text-2xl font-bold">{cityData.city}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HighlightCities