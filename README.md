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
<img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/f82456f3-c73a-4895-85f5-1a8547984fb2" />
<img width="1919" height="969" alt="image" src="https://github.com/user-attachments/assets/70c2c9c5-4039-4ae6-a85c-bea3ab648f59" />

Users can activate Women Safety Mode and interact with the map to find secure walking routes.


2. 🟢 Smart Safe Route Suggestions and Route Analysis Panel
<img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/5ab26995-c5be-4302-869d-e268bdc1b6c3" />
<img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/e7a287d2-bc87-45f2-b7bd-f0f9ad456601" />
<img width="1919" height="970" alt="image" src="https://github.com/user-attachments/assets/7fa9cf13-5f3f-4dc5-a39b-a532e756e139" />

Based on real-time safety data, the app calculates 3 alternate routes and color-codes them by safety level.
Shows a detailed breakdown of safety score, lighting, nearby help zones, and crime risk.


3. 🔍 Zone Analysis Panel
<img width="1919" height="973" alt="image" src="https://github.com/user-attachments/assets/b294b246-05bc-4ded-9c03-fe13b473eee0" />
<img width="1919" height="971" alt="image" src="https://github.com/user-attachments/assets/94ac5752-601e-4b05-9baf-928f27b3c722" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ceefd609-37a1-4d39-b231-6f6435e98030" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/38875336-4e90-4060-a135-bb372ca7cd09" />
Toggle visibility of important safety zones like:

🟦 Police Stations

🟩 Hospitals

🟧 Commercial Safe Areas

🔴 Crime Hotspots

Each location is clickable for detailed safety information.


4. 🚨 Emergency Alert Modal
<img width="1919" height="968" alt="image" src="https://github.com/user-attachments/assets/2add1086-4580-4b63-9071-ba73563fc284" />

Instantly sends your location and starts audio recording for emergencies. Displays local helpline numbers.


5. ⭐ Submit Safety Review
<img width="1919" height="971" alt="image" src="https://github.com/user-attachments/assets/4bd0c78c-2c05-4ae5-a296-9fc82d7db41a" />

Lets users rate safety, lighting, crowd level, and add comments to crowdsource route safety feedback.


6. ⚠️ Incident Reporting Panel
<img width="1919" height="973" alt="image" src="https://github.com/user-attachments/assets/86450a7c-1353-408b-9cf5-2d0a2828867a" />
<img width="1919" height="969" alt="image" src="https://github.com/user-attachments/assets/a6cd0296-9005-40b7-919d-b60cfa480c88" />

Allows users to report incidents (e.g., stalking, poor lighting) to make the system smarter over time.




## ⚙️ Setup Instructions

```bash
git clone https://github.com/ayushfande2003/women-safety-map.git
cd women-safety-map
# Place your Google Maps API key in index.html where required
open index.html in any browser
