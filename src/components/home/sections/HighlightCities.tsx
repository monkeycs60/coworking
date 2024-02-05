import { getTopCitiesData } from "@/services/getTopCitiesData";
import { convertFacilityNameSimple } from "@/lib/functions/convertFacilityName";

const HighlightCities = async () => {

    const cities = await getTopCitiesData();
    const cityGrid = ["col-span-3", "col-start-4", "row-span-2 col-start-5", "row-start-2", "col-span-3 row-start-2"];

    type CityDataType = {
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
    })) as CityDataType[];

    const cityImageUrl = (city: string) => `/images/${city}.jpg` || '/images/city-placeholder.jpg';

    return (
        <section className='lg:mb-24 lg:mt-16'>
            <h2 className="pt-16 text-center text-2xl font-bold text-black">Découvre la communauté <span className="font-bold italic">Coworker Malin</span> de ta ville !</h2>
            <div className="mt-16 flex flex-col gap-1 lg:grid lg:grid-cols-5 lg:grid-rows-2 lg:gap-4">
                {cityData.map((cityData) => (
                    <div
                        key={cityData.city}
                        className={`group relative flex h-[15vh] cursor-pointer items-center justify-center ${cityData.placement} ${cityData.placement.includes('row-span-2') ? 'lg:h-[calc(60vh_+_16px)]' : 'lg:h-[30vh]'}`}
                        style={{
                            backgroundImage: `url(${cityImageUrl(cityData.city)
                                })`, backgroundRepeat: 'no-repeat', backgroundSize: "cover", backgroundPosition: "center"
                        }}
                    >
                        <div className="text-center text-white ">
                            <h3 className="text-2xl font-bold shadow-lg group-hover:opacity-0">{cityData.city}</h3>
                        </div>
                        <div className="rounded-pill absolute bottom-2 right-0 line-clamp-1 flex w-[100%] items-center justify-start gap-4 bg-primary/70 px-2 text-sm  text-white transition-opacity duration-300 ease-in-out group-hover:opacity-100 lg:left-0 lg:top-0 lg:h-full lg:flex-col lg:justify-center lg:gap-2 lg:rounded-none 
                        lg:px-0 lg:text-base lg:opacity-0
                        ">
                            <p>
                                {cityData.usersInCity &&
                                    cityData.usersInCity > 0 ?
                                    cityData.usersInCity :
                                    "Pas encore de"} {' '}
                                {cityData.usersInCity &&
                                    cityData.usersInCity > 0 ?
                                    'coworkers' :
                                    'coworkers'

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
                            <h3 className="hidden text-2xl font-bold lg:block">{cityData.city}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default HighlightCities