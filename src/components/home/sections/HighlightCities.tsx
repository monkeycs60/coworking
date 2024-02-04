import { getTopCitiesData } from "@/services/getTopCitiesData";
const HighlightCities = async () => {

    const cities = await getTopCitiesData();
    console.log(cities);

    return (
        <div className='mt-16'>
            <h2>Les villes les plus populaires</h2>
            <div className="mt-16 grid grid-cols-2 gap-4">
                {cities.map((cityData, index) => (
                    <div
                        key={cityData.city}
                        className={`relative h-64 ${index === 0 ? 'col-span-2' : 'col-span-1'}`}
                        style={{ backgroundImage: `url(/path/to/images/${cityData.city.toLowerCase()}.jpg)` }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="text-center text-white">
                                <h3 className="text-2xl font-bold">{cityData.city}</h3>
                                <p>Coworkings: {cityData.coworkingCount}</p>
                                <p>Utilisateurs: {cityData.usersInCity}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HighlightCities