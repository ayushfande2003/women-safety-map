# women-safety-map
A next-generation safety-first navigation web app that leverages the **Google Maps Platform** to help women in Pune choose the **safest walking routes** based on real-time infrastructure, crowdsourced safety data, and location intelligence.

---

## 🧠 Hackathon Challenge

🎯 **Submitted for:** [Google Maps Platform Award - 2025 Hackathon]

🛠 **Theme:** Women’s Safety / Navigation / Civic Tech

💡 **Goal:** Not just the shortest path — but the **safest route** from your location to your destination, powered by:

- Crime hotspot awareness
- Safe zones (police stations, hospitals, commercial zones)
- Smart safety scoring
- User reviews & real-time alerts

---

## 🌐 Features

- ✅ **Activate Safety Mode**: One-click toggle to enable women's safety features on the map.
- 📍 **Tap-to-Navigate**: Tap anywhere in Pune or use the search bar to select a destination.
- 🔍 **Smart Safety Routes**: System calculates 3 optimal routes ranked by safety — not distance.
- 🧠 **Route Analysis Panel**:
  - Safety Score
  - Lighting Quality
  - Help Points Nearby
  - Crime Risk Index
- 🚨 **Emergency Mode**:
  - Location sharing
  - Audio recording for evidence
  - Emergency helpline overlay
- ⚠️ **Report Incidents**: Submit real-time alerts to flag unsafe areas.
- ⭐ **Review Routes**: Crowdsource safety reviews and feedback.
- 📊 **Legend & Heatmap Overlay**:
  - Green = Ultra Safe
  - Orange = Moderate
  - Red = Risky/Dark Areas

---

## 🗺️ Technologies Used

- 🗺️ **Google Maps JavaScript API** (Satellite + Hybrid View)
- 🌐 HTML5, CSS3, JavaScript
- 🎨 UI Design: Poppins Font, Gradient Themes, Blur Effects
- 📦 Emergency Features: Geolocation, MediaRecorder API
- ☁️ Future: Firebase or MongoDB for real-time data sync

---

## 🧭 Data Points Used

- Pune Police Stations 🟦
- Major Hospitals 🟩
- Commercial Zones 🟧
- Known Crime Hotspots 🔴
- Real-time User Reports ⭐

All locations are **visually mapped with markers** and are **factored into route scoring**.

---

## 👨‍💻 Team Members

- **Ayush** 
- **Komal**
- **Arpita**
- **Vaishnavi**

---

## 🏆 Why This Matters

Women often **sacrifice safety for speed** while commuting. This project ensures that:

- Safety is the **top priority**, not just distance.
- Women can **choose their own safety** based on real analysis.
- It helps **empower safe urban navigation** using technology.

---

## 📸 Screenshots

1. 🗺️ Home Interface with Map and Safety Mode
<img width="1919" height="972" alt="Screenshot 2025-07-30 212358" src="https://github.com/user-attachments/assets/64262ac7-538c-44b7-a168-bd48e647ebd9" />

<img width="1919" height="969" alt="Screenshot 2025-07-30 212420" src="https://github.com/user-attachments/assets/e9c5749e-3df3-47b0-bf21-ee98dae53e1a" />


Users can activate Women Safety Mode and interact with the map to find secure walking routes.


2. 🟢 Smart Safe Route Suggestions and Route Analysis Panel
<img width="1919" height="972" alt="Screenshot 2025-07-30 212625" src="https://github.com/user-attachments/assets/6917137e-3aa7-4d8b-8b81-afd5a11a669e" />

<img width="1919" height="972" alt="Screenshot 2025-07-30 212641" src="https://github.com/user-attachments/assets/75b1b243-210d-4972-bca9-8ac8e2d605d0" />

<img width="1919" height="970" alt="Screenshot 2025-07-30 212657" src="https://github.com/user-attachments/assets/c141c6ed-8eaf-45df-8241-0b9d81c0a152" />


Based on real-time safety data, the app calculates 3 alternate routes and color-codes them by safety level.
Shows a detailed breakdown of safety score, lighting, nearby help zones, and crime risk.


3. 🔍 Zone Analysis Panel
<img width="1920" height="1080" alt="Screenshot 2025-07-30 212939" src="https://github.com/user-attachments/assets/9bbb86de-6574-44df-b009-494751a82705" />

<img width="1919" height="971" alt="Screenshot 2025-07-30 212841" src="https://github.com/user-attachments/assets/240941c8-dbd3-45b9-af95-998230c0287d" />

<img width="1919" height="973" alt="Screenshot 2025-07-30 212731" src="https://github.com/user-attachments/assets/ca247a10-ab2f-4ba4-8d97-f2968b3289d7" />

<img width="1729" height="869" alt="image" src="https://github.com/user-attachments/assets/641ba35f-1d59-45db-a8cf-2ce1d03aa042" />

Toggle visibility of important safety zones like:

🟦 Police Stations

🟩 Hospitals

🟧 Commercial Safe Areas

🔴 Crime Hotspots

Each location is clickable for detailed safety information.


4. 🚨 Emergency Alert Modal
<img width="1919" height="968" alt="Screenshot 2025-07-30 213204" src="https://github.com/user-attachments/assets/a773f083-5342-4dbc-8482-5148e92198e4" />


Instantly sends your location and starts audio recording for emergencies. Displays local helpline numbers.


5. ⭐ Submit Safety Review
<img width="1919" height="970" alt="Screenshot 2025-07-30 213241" src="https://github.com/user-attachments/assets/e739f831-875e-43a7-bb89-a4ffc53eb87b" />


Lets users rate safety, lighting, crowd level, and add comments to crowdsource route safety feedback.


6. ⚠️ Incident Reporting Panel
<img width="1919" height="973" alt="Screenshot 2025-07-30 213358" src="https://github.com/user-attachments/assets/f3851a8c-45ad-4148-8ade-e37959f5d88c" />

<img width="1919" height="969" alt="Screenshot 2025-07-30 213417" src="https://github.com/user-attachments/assets/41bb175d-85b5-4d48-9e3f-260bbbbf4c83" />


Allows users to report incidents (e.g., stalking, poor lighting) to make the system smarter over time.




## ⚙️ Setup Instructions

```bash
git clone https://github.com/ayushfande2003/women-safety-map.git
cd women-safety-map
# Place your Google Maps API key in index.html where required
open index.html in any browser
