import ContentLoader from 'react-content-loader';

function ChargingChats () {
<ContentLoader 
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {/* Los elementos que quieres animar durante la carga */}
    <rect x="0" y="0" rx="3" ry="3" width="400" height="10" />
    <rect x="0" y="20" rx="3" ry="3" width="400" height="10" />
    <rect x="0" y="40" rx="3" ry="3" width="400" height="10" />
  </ContentLoader>
}

export default ChargingChats;
