// Global Variables
        let map;
        let directionsService;
        let directionsRenderers = [];
        let geocoder;
        let userLocation = null;
        let destination = null;
        let safetyMode = false;
        let safetyMarkers = [];
        let routeAnalyses = [];
        let currentRatings = { safety: 0, lighting: 0, crowd: 0 };

        // Enhanced Pune Safety Database
        const puneDatabase = {
            safeZones: [
                // Major Police Stations
                {lat: 18.5204, lng: 73.8567, type: 'police', name: 'Pimpri Police Station', safety: 95},
                {lat: 18.4899, lng: 73.8056, type: 'police', name: 'Pune Cantonment Police', safety: 93},
                {lat: 18.5640, lng: 73.7802, type: 'police', name: 'Vishrantwadi Police Station', safety: 92},
                {lat: 18.4574, lng: 73.8077, type: 'police', name: 'Koregaon Park Police Station', safety: 94},
                {lat: 18.5089, lng: 73.8553, type: 'police', name: 'Camp Police Station', safety: 91},
                
                // Major Hospitals
                {lat: 18.5104, lng: 73.8467, type: 'hospital', name: 'KEM Hospital', safety: 90},
                {lat: 18.5304, lng: 73.8367, type: 'hospital', name: 'Ruby Hall Clinic', safety: 88},
                {lat: 18.4532, lng: 73.8677, type: 'hospital', name: 'Sassoon Hospital', safety: 87},
                {lat: 18.5608, lng: 73.7728, type: 'hospital', name: 'Aditya Birla Memorial Hospital', safety: 89},
                {lat: 18.4988, lng: 73.8213, type: 'hospital', name: 'Deenanath Mangeshkar Hospital', safety: 86},
                
                // Safe Commercial Areas
                {lat: 18.5404, lng: 73.8767, type: 'commercial', name: 'Phoenix MarketCity', safety: 85},
                {lat: 18.5604, lng: 73.7767, type: 'commercial', name: 'Amanora Mall', safety: 82},
                {lat: 18.5200, lng: 73.8500, type: 'commercial', name: 'Camp Area Shopping', safety: 80},
                {lat: 18.4700, lng: 73.8300, type: 'commercial', name: 'MG Road Commercial', safety: 83},
                {lat: 18.5300, lng: 73.8400, type: 'commercial', name: 'JM Road Commercial', safety: 81},
                {lat: 18.5500, lng: 73.9100, type: 'commercial', name: 'Viman Nagar IT Hub', safety: 84}
            ],
            
            crimeHotspots: [
                {lat: 18.5004, lng: 73.8667, type: 'hotspot', name: 'Industrial Area - Poorly Lit', danger: 85, incidents: 12, issues: ['Poor lighting', 'Isolated area', 'Limited police patrol']},
                {lat: 18.4704, lng: 73.8567, type: 'hotspot', name: 'Under Construction Zone - Hadapsar', danger: 78, incidents: 8, issues: ['Construction barriers', 'Unlit roads', 'Fewer people']},
                {lat: 18.5804, lng: 73.8467, type: 'hotspot', name: 'Remote Area - Kharadi', danger: 82, incidents: 15, issues: ['Remote location', 'Limited CCTV', 'Dark alleys']},
                {lat: 18.4404, lng: 73.8200, type: 'hotspot', name: 'Highway Stretch - Kondhwa', danger: 88, incidents: 20, issues: ['Isolated highway', 'Limited help', 'Poor street lighting']},
                {lat: 18.5500, lng: 73.7900, type: 'hotspot', name: 'Underpass - Aundh', danger: 92, incidents: 25, issues: ['Dark underpass', 'Echo chamber', 'Limited visibility']},
                {lat: 18.4800, lng: 73.8800, type: 'hotspot', name: 'Old Pune Area - Narrow lanes', danger: 95, incidents: 30, issues: ['Narrow lanes', 'Old buildings', 'Poor lighting']}
            ]
        };

        // Initialize Map with Satellite View
        function initMap() {
            const puneCenter = { lat: 18.5204, lng: 73.8567 };
            
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 13,
                center: puneCenter,
                mapTypeId: google.maps.MapTypeId.HYBRID,
 // Satellite view for better visual appeal
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                zoomControl: true,
                /*styles: [
                    {
                        featureType: "all",
                        elementType: "labels",
                        stylers: [
                            { visibility: "on" },
                            { color: "#ffffff" },
                            { weight: 2 }
                        ]
                    },
                    {
                        featureType: "road",
                        elementType: "labels",
                        stylers: [
                            { visibility: "on" },
                            { color: "#ffffff" },
                            { weight: 3 }
                        ]
                    }
                ]*/
            });

            directionsService = new google.maps.DirectionsService();
            geocoder = new google.maps.Geocoder();

            setupEventListeners();
            detectUserLocation();
            initializeSafetyZones();
        }

        async function emergencyAlert() {
  try {
    // 📍 Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(`User Location: ${lat}, ${lng}`);
      alert(`🚨 Emergency Alert Sent!\nLocation:\nLat: ${lat}, Lng: ${lng}`);
    });

    // 🎤 Record 10 sec audio (or video if allowed)
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'emergency_audio.webm';
      a.click(); // or save to Firebase
    };

    recorder.start();
    setTimeout(() => {
      recorder.stop();
      stream.getTracks().forEach(track => track.stop());
    }, 10000); // record 10 seconds
  } catch (err) {
    alert('Error: ' + err.message);
  }
}
async function emergencyAlert() {
      try {
        // 📍 Get user's current location
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`User Location: ${lat}, ${lng}`);
          alert(`🚨 Emergency Alert Sent!\nLocation:\nLat: ${lat}, Lng: ${lng}`);
        });

        // 🎤 Record 10 sec audio
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'emergency_audio.webm';
          a.click();
        };

        recorder.start();
        setTimeout(() => {
          recorder.stop();
          stream.getTracks().forEach(track => track.stop());
        }, 10000); // 10 seconds
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }

        function detectUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    // Enhanced user location marker
                    new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: "Your Current Location",
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 15,
                            fillColor: '#4CAF50',
                            fillOpacity: 1,
                            strokeColor: '#ffffff',
                            strokeWeight: 4
                        },
                        zIndex: 1000,
                        animation: google.maps.Animation.BOUNCE
                    });

                    // Stop animation after 3 seconds
                    setTimeout(() => {
                        const markers = map.markers || [];
                        markers.forEach(marker => marker.setAnimation(null));
                    }, 3000);

                    map.setCenter(userLocation);
                    map.setZoom(14);
                }, (error) => {
                    userLocation = { lat: 18.5204, lng: 73.8567 };
                    showAlert('Location Access', 'Enable location access for personalized route recommendations. Using Pune city center as default.');
                });
            } else {
                userLocation = { lat: 18.5204, lng: 73.8567 };
            }
        }

        function initializeSafetyZones() {
            puneDatabase.safeZones.forEach(zone => {
                const marker = new google.maps.Marker({
                    position: { lat: zone.lat, lng: zone.lng },
                    map: null,
                    title: zone.name,
                    icon: getSafeZoneIcon(zone.type),
                    zIndex: 100
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: createSafeZoneInfo(zone)
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });

                safetyMarkers.push({ marker, infoWindow, zone, type: 'safe' });
            });

            puneDatabase.crimeHotspots.forEach(hotspot => {
                const marker = new google.maps.Marker({
                    position: { lat: hotspot.lat, lng: hotspot.lng },
                    map: null,
                    title: `⚠️ ${hotspot.name}`,
                    icon: getHotspotIcon(hotspot.danger),
                    zIndex: 200
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: createHotspotInfo(hotspot)
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });

                safetyMarkers.push({ marker, infoWindow, hotspot, type: 'danger' });
            });
        }

        function getSafeZoneIcon(type) {
            const icons = {
                'police': {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 18,
                    fillColor: '#2196F3',
                    fillOpacity: 0.9,
                    strokeColor: '#ffffff',
                    strokeWeight: 4
                },
                'hospital': {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 16,
                    fillColor: '#4CAF50',
                    fillOpacity: 0.9,
                    strokeColor: '#ffffff',
                    strokeWeight: 4
                },
                'commercial': {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 14,
                    fillColor: '#FF9800',
                    fillOpacity: 0.8,
                    strokeColor: '#ffffff',
                    strokeWeight: 3
                }
            };
            return icons[type] || icons['commercial'];
        }

        function getHotspotIcon(dangerLevel) {
            const color = dangerLevel >= 90 ? '#F44336' : 
                         dangerLevel >= 80 ? '#FF5722' : '#FF9800';
            
            return {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 15,
                fillColor: color,
                fillOpacity: 0.9,
                strokeColor: '#ffffff',
                strokeWeight: 3
            };
        }

        function createSafeZoneInfo(zone) {
            const typeText = {
                'police': '👮‍♀️ Police Station',
                'hospital': '🏥 Hospital/Medical Center',
                'commercial': '🏢 Safe Commercial Area'
            };
            
            return `
                <div style="padding: 15px; max-width: 280px; font-family: 'Poppins', sans-serif;">
                    <h4 style="margin: 0 0 12px 0; color: #2d3436; font-size: 18px; font-weight: 700;">
                        ${typeText[zone.type]} 
                    </h4>
                    <p style="margin: 0 0 10px 0; font-weight: 600; color: #2d3436; font-size: 16px;">${zone.name}</p>
                    <div style="display: flex; align-items: center; gap: 10px; margin: 10px 0; padding: 8px; background: linear-gradient(135deg, #4CAF50, #45a049); border-radius: 10px;">
                        <div style="width: 15px; height: 15px; border-radius: 50%; background: #ffffff;"></div>
                        <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Safety Score: ${zone.safety}/100</span>
                    </div>
                    <p style="margin: 10px 0 0 0; color: #636e72; font-size: 13px; line-height: 1.4;">
                        🛡️ High security zone with 24/7 monitoring, CCTV surveillance, and rapid emergency response capabilities.
                    </p>
                </div>
            `;
        }

        function createHotspotInfo(hotspot) {
            return `
                <div style="padding: 15px; max-width: 300px; font-family: 'Poppins', sans-serif;">
                    <h4 style="margin: 0 0 12px 0; color: #F44336; font-size: 18px; font-weight: 700;">
                        ⚠️ High Risk Zone
                    </h4>
                    <p style="margin: 0 0 10px 0; font-weight: 600; color: #2d3436; font-size: 16px;">${hotspot.name}</p>
                    <div style="display: flex; align-items: center; gap: 10px; margin: 10px 0; padding: 8px; background: linear-gradient(135deg, #F44336, #d32f2f); border-radius: 10px;">
                        <div style="width: 15px; height: 15px; border-radius: 50%; background: #ffffff;"></div>
                        <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Danger Level: ${hotspot.danger}/100</span>
                    </div>
                    <div style="margin: 10px 0; padding: 5px 0;">
                        <span style="font-size: 13px; color: #F44336; font-weight: 600;">Recent Incidents: ${hotspot.incidents}</span>
                    </div>
                    <div style="margin: 10px 0;">
                        <strong style="font-size: 13px; color: #F44336;">⚠️ Risk Factors:</strong>
                        <ul style="margin: 6px 0 0 0; padding-left: 18px; font-size: 12px; color: #636e72; line-height: 1.4;">
                            ${hotspot.issues.map(issue => `<li>${issue}</li>`).join('')}
                        </ul>
                    </div>
                    <p style="margin: 12px 0 0 0; color: #F44336; font-size: 13px; font-weight: 700; background: rgba(244, 67, 54, 0.1); padding: 8px; border-radius: 8px;">
                        🚨 AVOID this area, especially during evening and night hours
                    </p>
                </div>
            `;
        }

        function setupEventListeners() {
            document.getElementById('safetyModeBtn').addEventListener('click', toggleSafetyMode);
            document.getElementById('findSafeRoutesBtn').addEventListener('click', findRoutesFromSearch);
            
            const destInput = document.getElementById('destinationInput');
            destInput.addEventListener('input', debounce(handleDestinationInput, 300));
            
            map.addListener('click', handleMapClick);
            
            // Setup star ratings
            setupStarRatings();
        }

        function handleDestinationInput(e) {
            const query = e.target.value;
            if (query.length > 2) {
                console.log('Searching for:', query);
            }
        }

        function handleMapClick(event) {
            if (!safetyMode) return;
            
            destination = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            };
            
            if (window.destinationMarker) {
                window.destinationMarker.setMap(null);
            }
            
            window.destinationMarker = new google.maps.Marker({
                position: destination,
                map: map,
                title: "Selected Destination",
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 12,
                    fillColor: '#FF6B6B',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 4
                },
                zIndex: 1000,
                animation: google.maps.Animation.DROP
            });

            hideTapInstruction();
            findSafeRoutes();
        }

        function findRoutesFromSearch() {
            const destInput = document.getElementById('destinationInput').value;
            if (!destInput.trim()) {
                showAlert('Destination Required', 'Please enter a destination in Pune to find safe routes.');
                return;
            }

            geocoder.geocode({ 
                address: destInput + ', Pune, Maharashtra, India' 
            }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    destination = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    };
                    
                    if (window.destinationMarker) {
                        window.destinationMarker.setMap(null);
                    }
                    
                    window.destinationMarker = new google.maps.Marker({
                        position: destination,
                        map: map,
                        title: "Destination: " + destInput,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 12,
                            fillColor: '#FF6B6B',
                            fillOpacity: 1,
                            strokeColor: '#ffffff',
                            strokeWeight: 4
                        },
                        zIndex: 1000,
                        animation: google.maps.Animation.DROP
                    });

                    findSafeRoutes();
                } else {
                    showAlert('Location Error', 'Could not find the specified location in Pune. Please try a different address or landmark.');
                }
            });
        }

        function toggleSafetyMode() {
            const btn = document.getElementById('safetyModeBtn');
            const searchPanel = document.getElementById('searchPanel');
            const legend = document.getElementById('hotspotLegend');
            const tapInstruction = document.getElementById('tapInstruction');
            const featurePanel = document.getElementById('featurePanel');
            
            safetyMode = !safetyMode;
            
            if (safetyMode) {
                btn.textContent = '✅ Women Safety Mode ACTIVE';
                btn.classList.add('active');
                searchPanel.classList.add('show');
                legend.classList.add('show');
                tapInstruction.classList.add('show');
                featurePanel.classList.add('show');
                
                showSafetyMarkers(true);
                map.setOptions({ draggableCursor: 'crosshair' });
            } else {
                btn.textContent = '🚺 Activate Women Safety Mode';
                btn.classList.remove('active');
                searchPanel.classList.remove('show');
                legend.classList.remove('show');
                tapInstruction.classList.remove('show');
                featurePanel.classList.remove('show');
                
                showSafetyMarkers(false);
                clearRoutes();
                hideRouteAnalysis();
                map.setOptions({ draggableCursor: null });
                
                if (window.destinationMarker) {
                    window.destinationMarker.setMap(null);
                    window.destinationMarker = null;
                }
            }
        }

        function showSafetyMarkers(show) {
            safetyMarkers.forEach(item => {
                item.marker.setMap(show ? map : null);
            });
        }

        function findSafeRoutes() {
            if (!userLocation || !destination) {
                showAlert('Location Required', 'Both current location and destination are required to calculate safe routes.');
                return;
            }

            const loading = document.getElementById('loadingOverlay');
            loading.classList.add('show');
            
            clearRoutes();

            const request = {
                origin: userLocation,
                destination: destination,
                travelMode: google.maps.TravelMode.WALKING,
                provideRouteAlternatives: true,
                avoidHighways: false,
                avoidTolls: true
            };

            directionsService.route(request, (result, status) => {
                loading.classList.remove('show');
                
                if (status === 'OK') {
                    processAndDisplayRoutes(result);
                } else {
                    showAlert('Route Error', 'Could not calculate routes between these locations. Please try different addresses.');
                }
            });
        }

        function processAndDisplayRoutes(result) {
            const routes = result.routes;
            routeAnalyses = [];

            routes.forEach((route, index) => {
                const analysis = analyzeRouteSafety(route, index);
                routeAnalyses.push({
                    route: route,
                    analysis: analysis,
                    index: index
                });
            });

            routeAnalyses.sort((a, b) => b.analysis.overallSafety - a.analysis.overallSafety);

            while (routeAnalyses.length < 3 && routeAnalyses.length > 0) {
                const baseRoute = JSON.parse(JSON.stringify(routeAnalyses[routeAnalyses.length - 1]));
                baseRoute.analysis.overallSafety -= 15;
                baseRoute.analysis.routeType = routeAnalyses.length === 1 ? 'moderate' : 'risky';
                routeAnalyses.push(baseRoute);
            }

            const colors = ['#00b894', '#fdcb6e', '#e17055'];
            const labels = ['Ultra Safe Route', 'Moderate Safety Route', 'Higher Risk Route'];
            
            routeAnalyses.slice(0, 3).forEach((routeData, displayIndex) => {
                displayRoute(result, routeData, colors[displayIndex], displayIndex, labels[displayIndex]);
            });

            const bounds = new google.maps.LatLngBounds();
            bounds.extend(userLocation);
            bounds.extend(destination);
            map.fitBounds(bounds);
        }

        function analyzeRouteSafety(route, routeIndex) {
            let totalSafety = 0;
            let lightingScore = 0;
            let crimeRisk = 0;
            let helpPointsNearby = 0;
            let checkpoints = 0;
            let safetyFeatures = [];
            
            const path = route.overview_path;
            const samplePoints = Math.min(path.length, 20);
            
            let baseSafety = 75 - (routeIndex * 12);
            let baseLighting = 65 - (routeIndex * 8);
            let baseCrime = 20 + (routeIndex * 12);
            
            for (let i = 0; i < samplePoints; i++) {
                const pointIndex = Math.floor((i / samplePoints) * path.length);
                const point = path[pointIndex];
                checkpoints++;
                
                let pointSafety = baseSafety;
                let pointLighting = baseLighting;
                let pointCrime = baseCrime;
                
                puneDatabase.safeZones.forEach(zone => {
                    const distance = calculateDistance(
                        {lat: point.lat(), lng: point.lng()},
                        {lat: zone.lat, lng: zone.lng}
                    );
                    
                    if (distance < 1000) {
                        const influence = Math.max(0, 1 - (distance / 1000));
                        pointSafety += zone.safety * influence * 0.25;
                        
                        if (distance < 500) {
                            helpPointsNearby++;
                            if (zone.type === 'police' && !safetyFeatures.includes('👮‍♀️ Police stations within reach')) {
                                safetyFeatures.push('👮‍♀️ Police stations within reach');
                            }
                            if (zone.type === 'hospital' && !safetyFeatures.includes('🏥 Medical facilities nearby')) {
                                safetyFeatures.push('🏥 Medical facilities nearby');
                            }
                            if (zone.type === 'commercial' && !safetyFeatures.includes('🏢 Populated commercial areas')) {
                                safetyFeatures.push('🏢 Populated commercial areas');
                            }
                        }
                    }
                });
                
                puneDatabase.crimeHotspots.forEach(hotspot => {
                    const distance = calculateDistance(
                        {lat: point.lat(), lng: point.lng()},
                        {lat: hotspot.lat, lng: hotspot.lng}
                    );
                    
                    if (distance < 700) {
                        const influence = Math.max(0, 1 - (distance / 700));
                        pointSafety -= hotspot.danger * influence * 0.35;
                        pointCrime += hotspot.danger * influence * 0.45;
                        
                        if (distance < 300 && !safetyFeatures.includes('⚠️ Passes near crime hotspot')) {
                            safetyFeatures.push('⚠️ Passes near crime hotspot');
                        }
                    }
                });
                
                totalSafety += Math.max(0, Math.min(100, pointSafety));
                lightingScore += Math.max(0, Math.min(100, pointLighting));
                crimeRisk += Math.max(0, Math.min(100, pointCrime));
            }
            
            const hour = new Date().getHours();
            const timeMultiplier = (hour >= 6 && hour <= 20) ? 1.15 : 0.75;
            
            if (helpPointsNearby >= 4) {
                safetyFeatures.push('✅ Multiple help points available');
            }
            if (totalSafety / checkpoints > 80) {
                safetyFeatures.push('✅ Well-monitored security route');
            }
            if (lightingScore / checkpoints > 75) {
                safetyFeatures.push('💡 Excellent street lighting');
            } else if (lightingScore / checkpoints < 45) {
                safetyFeatures.push('🌙 Poor lighting conditions');
            }

            let routeType = 'safe';
            const avgSafety = (totalSafety / checkpoints) * timeMultiplier;
            if (avgSafety < 55) routeType = 'risky';
            else if (avgSafety < 75) routeType = 'moderate';

            return {
                overallSafety: Math.max(0, Math.min(100, Math.round(avgSafety))),
                lightingScore: Math.max(0, Math.min(100, Math.round(lightingScore / checkpoints))),
                crimeRisk: Math.max(0, Math.min(100, Math.round(crimeRisk / checkpoints))),
                helpPoints: helpPointsNearby,
                distance: route.legs[0].distance.value,
                duration: route.legs[0].duration.value,
                timeOfDay: hour >= 6 && hour <= 20 ? 'Day' : 'Night',
                safetyFeatures: safetyFeatures,
                routeType: routeType
            };
        }

        function displayRoute(result, routeData, color, displayIndex, label) {
            const renderer = new google.maps.DirectionsRenderer({
                map: map,
                directions: result,
                routeIndex: routeData.index,
                polylineOptions: {
                    strokeColor: color,
                    strokeWeight: displayIndex === 0 ? 10 : 8,
                    strokeOpacity: displayIndex === 0 ? 1.0 : 0.85,
                    zIndex: 100 - displayIndex
                },
                suppressMarkers: false,
                suppressInfoWindows: true,
                markerOptions: {
                    visible: displayIndex === 0
                }
            });

            const polyline = renderer.getDirections().routes[routeData.index].overview_polyline;
            
            const clickablePoly = new google.maps.Polyline({
                path: google.maps.geometry.encoding.decodePath(polyline),
                strokeColor: 'transparent',
                strokeWeight: 18,
                strokeOpacity: 0,
                map: map,
                zIndex: 200 + displayIndex
            });

            clickablePoly.addListener('click', () => {
                showRouteAnalysis(routeData, color, label);
            });

            directionsRenderers.push({
                renderer: renderer,
                clickablePoly: clickablePoly,
                routeData: routeData,
                color: color,
                label: label
            });

            if (displayIndex === 0) {
                setTimeout(() => {
                    showRouteAnalysis(routeData, color, label);
                }, 1500);
            }
        }

        function showRouteAnalysis(routeData, color, label) {
            const panel = document.getElementById('routeAnalysisPanel');
            const analysis = routeData.analysis;
            
            document.getElementById('routeColorIndicator').style.background = color;
            document.getElementById('routeTitle').textContent = label;
            document.getElementById('safetyScore').textContent = `${analysis.overallSafety}/100`;
            document.getElementById('lightingScore').textContent = analysis.lightingScore < 40 ? 'Poor' : 
                                                                    analysis.lightingScore < 70 ? 'Fair' : 'Excellent';
            document.getElementById('helpPoints').textContent = analysis.helpPoints;
            document.getElementById('crimeRisk').textContent = analysis.crimeRisk < 30 ? 'Low' : 
                                                               analysis.crimeRisk < 60 ? 'Medium' : 'High';
            
            document.getElementById('routeDistance').textContent = routeData.route.legs[0].distance.text;
            document.getElementById('routeTime').textContent = routeData.route.legs[0].duration.text;
            
            const featuresList = document.getElementById('featureList');
            featuresList.innerHTML = '';
            analysis.safetyFeatures.forEach(feature => {
                const li = document.createElement('li');
                li.className = 'feature-item';
                
                const icon = feature.startsWith('✅') ? '✅' : 
                           feature.startsWith('⚠️') ? '⚠️' : 
                           feature.startsWith('👮‍♀️') ? '👮‍♀️' :
                           feature.startsWith('🏥') ? '🏥' :
                           feature.startsWith('🏢') ? '🏢' :
                           feature.startsWith('💡') ? '💡' :
                           feature.startsWith('🌙') ? '🌙' : '📍';
                
                const text = feature.replace(/^[✅⚠️👮‍♀️🏥🏢💡🌙]\s*/, '');
                
                li.innerHTML = `
                    <span class="feature-icon">${icon}</span>
                    <span>${text}</span>
                `;
                featuresList.appendChild(li);
            });
            
            panel.classList.add('show');
        }

        function hideRouteAnalysis() {
            document.getElementById('routeAnalysisPanel').classList.remove('show');
        }

        function hideTapInstruction() {
            document.getElementById('tapInstruction').classList.remove('show');
        }

        function clearRoutes() {
            directionsRenderers.forEach(item => {
                item.renderer.setMap(null);
                item.clickablePoly.setMap(null);
            });
            directionsRenderers = [];
            routeAnalyses = [];
            hideRouteAnalysis();
        }

        function calculateDistance(point1, point2) {
            const R = 6371000;
            const dLat = (point2.lat - point1.lat) * Math.PI / 180;
            const dLng = (point2.lng - point1.lng) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                     Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
                     Math.sin(dLng/2) * Math.sin(dLng/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        }

        // Emergency Features
        function emergencyAlert() {
            document.getElementById('emergencyModal').classList.add('show');
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const emergencyLocation = `${position.coords.latitude},${position.coords.longitude}`;
                    console.log('Emergency location shared:', emergencyLocation);
                    
                    if (navigator.share) {
                        navigator.share({
                            title: '🚨 EMERGENCY - Immediate Help Needed',
                            text: 'I need immediate help. My current location:',
                            url: `https://maps.google.com/?q=${emergencyLocation}`
                        });
                    }
                });
            }
        }

        function closeEmergencyModal() {
            document.getElementById('emergencyModal').classList.remove('show');
        }

        // Show the attractive Report Incident modal
function reportIncident() {
    const modal = document.getElementById('incidentModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        // Reset form fields
        document.getElementById('incidentForm').reset();
    }
}

// Hide the Report Incident modal
function closeIncidentModal() {
    const modal = document.getElementById('incidentModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
    }
}

// Handle incident form submission
function submitIncident(e) {
    e.preventDefault();
    const type = document.getElementById('incidentType').value;
    const location = document.getElementById('incidentLocation').value;
    const details = document.getElementById('incidentDetails').value;
    const incidentData = {
        type,
        location,
        details,
        timestamp: new Date().toISOString(),
        city: 'Pune'
    };
    closeIncidentModal();
    showAlert(
        'Incident Reported',
        `✅ Thank you for reporting: "<b>${type}</b>".<br>Location: <b>${location}</b><br>Your report helps make Pune safer!`
    );
    console.log('Incident reported:', incidentData);
}

// Make these functions available globally for inline HTML handlers
window.reportIncident = reportIncident;
window.closeIncidentModal = closeIncidentModal;
window.submitIncident = submitIncident;

        function shareLocation() {
            if (!userLocation) {
                showAlert('Location Error', 'Unable to access current location for sharing. Please enable location services.');
                return;
            }
            
            const shareData = {
                title: '📍 My Current Location - SafeRoute',
                text: 'Sharing my live location for safety tracking via SafeRoute Pune',
                url: `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`
            };
            
            if (navigator.share) {
                navigator.share(shareData).catch(err => {
                    console.log('Share error:', err);
                    copyToClipboard(shareData.url);
                });
            } else {
                copyToClipboard(shareData.url);
            }
        }

        function copyToClipboard(text) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showAlert('Location Shared', '📋 Location link copied to clipboard! Share it with your trusted contacts.');
                }).catch(() => {
                    showAlert('Share Location', `📍 Your location: ${text}`);
                });
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showAlert('Location Shared', '📋 Location link copied to clipboard!');
                } catch (err) {
                    showAlert('Share Location', `📍 Your location: ${text}`);
                }
                document.body.removeChild(textArea);
            }
        }

        // Review System
        function setupStarRatings() {
            ['safetyRating', 'lightingRating', 'crowdRating'].forEach(ratingId => {
                const stars = document.querySelectorAll(`#${ratingId} .star`);
                const ratingType = ratingId.replace('Rating', '');
                
                stars.forEach((star, index) => {
                    star.addEventListener('click', () => {
                        currentRatings[ratingType] = index + 1;
                        updateStarDisplay(ratingId, index + 1);
                    });
                    
                    star.addEventListener('mouseover', () => {
                        updateStarDisplay(ratingId, index + 1);
                    });
                });
                
                document.getElementById(ratingId).addEventListener('mouseleave', () => {
                    updateStarDisplay(ratingId, currentRatings[ratingType]);
                });
            });
        }

        function updateStarDisplay(ratingId, rating) {
            const stars = document.querySelectorAll(`#${ratingId} .star`);
            stars.forEach((star, index) => {
                star.style.color = index < rating ? '#ffd700' : '#ddd';
            });
        }

        function openReviewModal() {
            if (!routeAnalyses.length) {
                showAlert('No Route Selected', 'Please calculate a route first before submitting a safety review.');
                return;
            }
            document.getElementById('reviewModal').classList.add('show');
        }

        function closeReviewModal() {
            document.getElementById('reviewModal').classList.remove('show');
            currentRatings = { safety: 0, lighting: 0, crowd: 0 };
            ['safetyRating', 'lightingRating', 'crowdRating'].forEach(id => {
                updateStarDisplay(id, 0);
            });
            document.getElementById('reviewComment').value = '';
        }

        function submitReview() {
            const { safety, lighting, crowd } = currentRatings;
            const comment = document.getElementById('reviewComment').value;
            
            if (safety === 0 || lighting === 0 || crowd === 0) {
                showAlert('Incomplete Review', 'Please rate all categories before submitting your safety review.');
                return;
            }
            
            const reviewData = {
                route: `${userLocation.lat},${userLocation.lng}-${destination.lat},${destination.lng}`,
                ratings: { safety, lighting, crowd },
                comment: comment,
                timestamp: new Date().toISOString(),
                city: 'Pune',
                userId: 'anonymous'
            };
            
            console.log('Review submitted:', reviewData);
            showAlert('Review Submitted', '⭐ Thank you for your valuable feedback! Your review helps make Pune safer for all women.');
            closeReviewModal();
        }

        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        function showAlert(title, message) {
            const alertId = 'alert_' + Date.now();
            const alertHTML = `
                <div id="${alertId}" style="
                    position: fixed;
                    top: 30px;
                    right: 30px;
                    background: linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0.8));
                    backdrop-filter: blur(20px);
                    color: white;
                    padding: 25px;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
                    z-index: 4000;
                    max-width: 400px;
                    border: 2px solid rgba(255, 107, 107, 0.3);
                    transform: translateX(450px);
                    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    font-family: 'Poppins', sans-serif;
                ">
                    <button onclick="document.getElementById('${alertId}').remove()" style="
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: rgba(255,255,255,0.8);
                        transition: all 0.3s ease;
                    ">×</button>
                    <h4 style="margin: 0 0 15px 0; color: #ff6b6b; font-size: 18px; font-weight: 700;">${title}</h4>
                    <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 14px; line-height: 1.5;">${message}</p>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', alertHTML);
            
            setTimeout(() => {
                const alert = document.getElementById(alertId);
                if (alert) alert.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                const alert = document.getElementById(alertId);
                if (alert) {
                    alert.style.transform = 'translateX(450px)';
                    setTimeout(() => alert.remove(), 400);
                }
            }, 6000);
        }

        // Initialize when page loads
        window.onload = function() {
            setTimeout(() => {
                if (typeof google !== 'undefined' && google.maps) {
                    initMap();
                } else {
                    console.error('Google Maps API not loaded');
                    showAlert('Maps Error', 'Unable to load Google Maps. Please refresh the page and check your internet connection.');
                }
            }, 1000);
        };

        // Global functions for onclick handlers
        window.hideRouteAnalysis = hideRouteAnalysis;
        window.hideTapInstruction = hideTapInstruction;
        window.emergencyAlert = emergencyAlert;
        window.closeEmergencyModal = closeEmergencyModal;
        window.reportIncident = reportIncident;
        window.closeIncidentModal = closeIncidentModal;
        window.submitIncident = submitIncident;
        window.shareLocation = shareLocation;
        window.openReviewModal = openReviewModal;
        window.closeReviewModal = closeReviewModal;
        window.submitReview = submitReview;