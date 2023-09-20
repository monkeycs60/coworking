import Success from '@/components/ui/Success';
import React from 'react';

const page = async ({ searchParams }: { searchParams: { type: string } }) => {
    const type = searchParams.type;

    let successMessage;

    switch (type) {
        case 'review':
            successMessage = <span>Nouvel avis</span>;
            break;
        case 'coworking':
            successMessage = <span>Nouvel espace de coworking</span>;
            break;
        case 'comment':
            successMessage = <span>Nouveau commentaire</span>;
            break;

        default:
            successMessage = <span>Nouvel item</span>;
    }
    return (
        <Success>
            {successMessage}
        </Success>
    );
};

export default page;
