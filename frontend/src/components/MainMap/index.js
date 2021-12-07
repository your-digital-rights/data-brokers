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
			<img className={classes.markerLogo} width={16} src={`//logo.uplead.com/${dataBroker['Domain']}`}/> 
			<a target="_blank" rel="nofollow" href={`https://${dataBroker["Domain"]}`}>{dataBroker["Company Name"]}</a>
			<br/>
			<strong>Industry:</strong> {dataBroker["Company Category Industry"]}
			<br/>
			<strong>Sub Industry:</strong> {dataBroker["Company Category Sub Industry"]}
			<br/>
			{ dataBroker["Company Type"].length > 0 && (
				<>
					<strong>Type:</strong> {dataBroker["Company Type"]}
					<br/>
				</>
			)}	
			{ dataBroker["Company Metrics Employees"].length > 0 && (
				<>
					<strong>Employees:</strong> {dataBroker["Company Metrics Employees"]}			
					<br/>
				</>
			)}
			{ dataBroker["Company Metrics Estimated Annual Revenue"].length > 0 && (
				<>			
					<strong>Estimated Annual Revenue:</strong> {dataBroker["Company Metrics Estimated Annual Revenue"]}						
					<br/>
					</>
			)}
			{ dataBroker["Company Founded Year"].length > 0 && (
				<>						
					<strong>Founded:</strong> {dataBroker["Company Founded Year"]}						
					<br/>
					</>
			)}
			<strong>Description:</strong> {dataBroker["Company Description"]}
			<br/>
			{ dataBroker["Company Tags"].length > 0 && (
				<>									
					<strong>Tags:</strong> {dataBroker["Company Tags"]}
					</>
			)}
		</div>
	);
};

export default withStyles(styles)(Map);
