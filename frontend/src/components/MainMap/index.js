import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Style as styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

function arrayEquals(a, b) {
	return Array.isArray(a) &&
			Array.isArray(b) &&
			a.length === b.length &&
			a.every((val, index) => val === b[index]);
}

function SetCenter({ coords }) {
	if (arrayEquals(coords, [25, 10])) {
		return null;
	}
	const map = useMap();
	if (coords) {
		//map.fitBounds([coords,coords]);
		map.setView(coords, 13, { 
			animate: true,
			pan: {
				duration: 20
			}
		});	
	};
  return null;
}

const Map = ({ classes, dataBrokers, coords }) => {
	return (
		<div className={classes.root} id="mainMap">			
			<MapContainer center={[25, 10]} zoom={2} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
				/>
				<MarkerClusterGroup >
					<OrgMarkers dataBrokers={dataBrokers} classes={classes} />
				</MarkerClusterGroup>
				<SetCenter coords={coords} />
			</MapContainer>
		</div>
	);
};

const OrgMarkers = (props) => {
  const { dataBrokers, classes } = props;
	if (dataBrokers) {
		const markers = dataBrokers.map((dataBroker, index) => (
			<>
				{dataBroker && dataBroker.latlng && dataBroker.latlng.length >0 && (
					<Marker 
						key={dataBroker.domain} 
						position={dataBroker.latlng} 
					>
					<Popup>
						<RenderPopup dataBroker={dataBroker} classes={classes}/>
					</Popup>
					</Marker>
				)}
			</>
		));
		return <>{markers}</>;
	};
	return null;
};


const RenderPopup = ({ dataBroker, classes }) => {
	return (
		<div>
			<img className={classes.markerLogo} width={16} src={`https://api.faviconkit.com/${dataBroker['Domain']}/16`}/> 
			<a target="_blank" rel="nofollow" href={`https://${dataBroker["Domain"]}`}>{dataBroker["Company Name"]}</a>
			<br/>
			<strong>Industry Group:</strong> {dataBroker["Company Category Industry Group"]}
			<br/>
			<strong>Industry:</strong> {dataBroker["Company Category Industry"]}
			<br/>
			<strong>Description:</strong> {dataBroker["Company Description"]}
		</div>
	);
};

export default withStyles(styles)(Map);
