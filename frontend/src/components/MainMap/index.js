import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Style as styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';


function Map({ classes, dataBrokers }) {
	return (
		<div className={classes.root} id="mainMap">			
			<MapContainer center={[25, 10]} zoom={2} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
				/>
				<MarkerClusterGroup >
					{dataBrokers.map((org, idx) => (
						<>
							{org && org.latlng && org.latlng.length >0 &&(
								<Marker 
									key={`marker-${idx}`} 
									position={org.latlng}
								>
									<Popup>
										<RenderPopup dataBoker={org}/>
									</Popup>
								</Marker>
							)}
						</>
					))}
				</MarkerClusterGroup>
			</MapContainer>
		</div>
	);
}

const RenderPopup = ({ dataBoker }) => {
	return (
		<div>
			<img width={16} src={`https://api.faviconkit.com/${dataBoker['Domain']}/16`}/> 
			<a target="_blank" rel="nofollow" href={`https://${dataBoker["Domain"]}`}>{dataBoker["Company Name"]}</a>
			<br/>
			<strong>Industry Group:</strong> {dataBoker["Company Category Industry Group"]}
			<br/>
			<strong>Industry:</strong> {dataBoker["Company Category Industry"]}
			<br/>
			<strong>Description:</strong> {dataBoker["Company Description"]}
		</div>
	);
};

export default withStyles(styles)(Map)
