import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Style as styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import tracking from '../../utils/tracking';

const Map = (props) => {
	const { classes, dataBrokers } = props;
	return (
		<div className={classes.root} id="mainMap">		
			{dataBrokers.length === 0 && (
				<div className={classes.progressContainer}>
						<CircularProgress className={classes.progress} size={100}/>
				</div>
			)}
			<MapContainer center={[25, 10]} zoom={2} scrollWheelZoom={false} style={{ height: 400, width: "100%" }}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
				/>
				<DataBrokersGroup {...props} />
			</MapContainer>
		</div>
	);
};

const DataBrokersGroup = ({dataBrokers, classes, selectedDataBroker}) => {
	const map = useMap();
	const groupRef = React.useRef(null);
	const dataBrokersWithLocation = dataBrokers.filter((dataBroker) => dataBroker.latlng && dataBroker.latlng.length > 0);

	const [markers, setMarkers] = React.useState({})

	const markersRef = React.useCallback((dataBroker, marker) => {
		if (!markers.hasOwnProperty(dataBroker.Domain)) {
			markers[dataBroker.Domain] = marker;
		}
	}, [selectedDataBroker]);

	React.useEffect(() => {
		if (selectedDataBroker) {
			const marker = markers[selectedDataBroker.Domain];
			if (groupRef.current !== null && marker) {
				groupRef.current.zoomToShowLayer(marker, function () {
					marker.openPopup();
				});
			}
		}
	}, [selectedDataBroker]);
	
	return (
		<div>
			<MarkerClusterGroup ref={groupRef}>
				{dataBrokersWithLocation.map((dataBroker) => (
					<Marker 
						key={dataBroker.Domain} 
						ref={el => markersRef(dataBroker, el)}
						position={dataBroker.latlng} 
					>
						<Popup>
							<RenderPopup dataBroker={dataBroker} classes={classes}/>
						</Popup>
					</Marker>
				))}
			</MarkerClusterGroup>
		</div>
	)
};

const RenderPopup = ({ dataBroker, classes }) => {
	const trackOptOut = e => {
		tracking.trackOptOut(dataBroker.Domain, "popup")
	}

	return (
		<div>
			<Typography component="span" variant="h5" className={classes.renderGroupTitle}>
				<a target="_blank" rel="nofollow" href={`https://${dataBroker["Domain"]}`}><img className={classes.markerLogo} width={24} src={`//logo.uplead.com/${dataBroker['Domain']}`}/>{dataBroker["Company Name"]}</a>
			</Typography>	
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
					<hr/>
					<strong>Tags:</strong> {dataBroker["Company Tags"]}
				</>
			)}
			{ dataBroker.hasOwnProperty("YDR URL") && dataBroker["YDR URL"].length > 0 && (
				<>	
					<br/>								
					<Button
            href={dataBroker["YDR URL"]}
						target="_blank"
            variant="outlined"
            color="promary"
            type="submit"
            className={classes.optoutBtn}
						onClick={trackOptOut}
          >
            Opt Out
          </Button>
				</>
			)}			
		</div>
	);
};

export default withStyles(styles)(Map);
