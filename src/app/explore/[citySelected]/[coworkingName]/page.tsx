import { getOneCoworkingInfos } from '@/services/getOneCoworkingInfos';
import CoworkingSelectedCard from '@/components/explore/cards/CoworkingSelectedCard';

const page = async ({
    searchParams,
}: {
    searchParams: { coworkingId: string };
}) => {
    const coworkingId = searchParams.coworkingId;
    const coworking = await getOneCoworkingInfos(coworkingId);
    console.log(coworking);

    return coworking ? <CoworkingSelectedCard coworking={coworking} /> : null;
};

export default page;
