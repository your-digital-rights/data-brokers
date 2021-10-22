import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Style as styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';

function Map({ classes, dataBrokers }) {
	return (
		<div className={classes.root} id="mainMap">			
			<MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
				/>
				<MarkerClusterGroup>
					{dataBrokers.map((org, idx) => (
						<>
							{org && org.latlng && org.latlng.length >0 &&(
								<Marker key={`marker-${idx}`} position={org.latlng}>
									<Popup>
										<a href={org["Domain"]}>{org["Company Name"]}</a>
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

export default withStyles(styles)(Map)
