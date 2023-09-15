import { getOneCoworkingInfos } from '@/services/getOneCoworkingInfos';
import CoworkingSelectedCard from '@/components/explore/cards/CoworkingSelectedCard';
import { Coworking } from '@/types/coworking';

const page = async ({
    searchParams,
}: {
    searchParams: { coworkingId: string };
}) => {
    const coworkingId = searchParams.coworkingId;
    const coworking = await getOneCoworkingInfos(coworkingId);
    console.log(coworking);

    return coworking ? (
        <CoworkingSelectedCard coworking={coworking as Coworking} />
    ) : null;
};

export default page;
