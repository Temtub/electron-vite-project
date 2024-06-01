import ContentLoader from 'react-content-loader';

function ChargingChats () {

    return(

        <ContentLoader 
            speed={2}
            width={400}
            height={460}
            viewBox="0 0 400 460"
            backgroundColor="#7b4242"
            foregroundColor="#242424"
        >
            {/* Los elementos que quieres animar durante la carga */}
            <circle cx="31" cy="31" r="15" /> 
            <rect x="58" y="18" rx="2" ry="2" width="140" height="10" /> 
            <rect x="58" y="34" rx="2" ry="2" width="140" height="10" /> 

            <circle cx="31" cy="31" r="15" /> 
            <rect x="58" y="18" rx="2" ry="2" width="140" height="10" /> 
            <rect x="58" y="34" rx="2" ry="2" width="140" height="10" /> 

            <circle cx="31" cy="31" r="15" /> 
            <rect x="58" y="18" rx="2" ry="2" width="140" height="10" /> 
            <rect x="58" y="34" rx="2" ry="2" width="140" height="10" /> 

            <circle cx="31" cy="31" r="15" /> 
            <rect x="58" y="18" rx="2" ry="2" width="140" height="10" /> 
            <rect x="58" y="34" rx="2" ry="2" width="140" height="10" /> 
        </ContentLoader>
    )
}

export default ChargingChats;
