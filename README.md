# 🧠 AI Practical Lab Project (5th Semester)
A full-stack AI-powered system ensuring tourist safety through **real-time monitoring, predictive risk alerts, and secure identity verification** using **Blockchain, Geo-fencing, and Machine Learning**.

---

## 🚀 Project Overview  
This project aims to enhance **tourist safety and incident response** in real-world environments.  
It leverages **AI + Blockchain + Cloud + Geolocation** to monitor crowd movement, detect anomalies, and automatically alert authorities in case of emergencies.

The system provides:
- Real-time **crowd density analysis** using Computer Vision (YOLOv8 + OpenCV)  
- **Behavior anomaly detection** using ML algorithms  
- **Predictive alerting** for crowd surges and risks  
- **Blockchain-based Digital IDs** for secure verification  
- **Geo-fencing alerts** for restricted or unsafe areas  
- **AI Chatbot (NLP)** for multilingual support  
- **Central Dashboard** for authorities to monitor and act instantly  

---

## 🧩 Tech Stack  

### **Frontend**
- ReactJS / Next.js  
- Tailwind CSS / Material UI  
- Chart.js / Recharts (for analytics)  

### **Backend**
- Node.js + Express.js  
- REST APIs + WebSocket for live updates  

### **Database**
- MongoDB (Mongoose ORM)  

### **AI / ML Services**
- Python (Flask / FastAPI)  
- YOLOv8, OpenCV (Crowd Detection)  
- Isolation Forest (Anomaly Detection)  
- LSTM (Predictive Modeling)  
- BERT / DistilBERT (NLP Chatbot)  

### **Blockchain (Simulation)**
- Hyperledger Fabric / Ethereum Stub  
- Digital ID Verification System  

---

## ⚙️ Folder Structure  
project_root/
├── frontend/ # React dashboard and tourist app
├── backend/ # Node + Express APIs
├── ai_service/ # Python AI microservices (CV, NLP, Prediction)
├── blockchain_stub/ # Simulated Blockchain ID verification
└── README.md


---

## 🧠 AI Modules  
| Module | Function | Models Used |
|---------|-----------|-------------|
| Crowd Detection | Detects crowd density from images | YOLOv8, OpenCV |
| Behavior Analysis | Flags inactivity/suspicious patterns | Isolation Forest |
| Risk Prediction | Forecasts possible safety risks | LSTM |
| NLP Chatbot | Multilingual interaction & SOS intent | BERT / DistilBERT |

---

## 💡 Getting Started  

### **1️⃣ Prerequisites**
Install these before running:
- [Node.js](https://nodejs.org/)
- [Python 3.9+](https://www.python.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/) *(for API testing)*

### **2️⃣ Clone the Repo**
```bash
git clone https://github.com/Mkjha101/AI-Project.git
cd <your-repo-name>
```
### **3️⃣ Install Dependencies**
#### `Frontend`
cd frontend
npm install
npm start

#### `Backend`
cd ../backend
npm install
npm run dev

#### AI Service
cd ../ai_service
pip install -r requirements.txt
python app.py


## 🧪 Demo Flow

1. Upload an image or live feed in dashboard → AI model detects crowd density.
2. If anomaly/risk is found → Backend triggers an SOS Alert.
3. Authorities see live updates on the dashboard map.
4. Digital ID is verified through Blockchain Stub.
5. Tourists can use the AI Chatbot for multilingual help.

## 👥 Team Members
Name	            Role
Malay Kumar Jha	  Project Lead & AI/ML Research Engineer
Mohit Kumar    	  Blockchain & Backend + AI Integration Developer
Pipito T Chishi	  Frontend + NLP AI Developer

## 🎯 Future Enhancements
1. Integration with IoT devices for wearable tracking.
2. Offline Geo-fencing with GPS data.
3. Deepfake-resistant ID verification via advanced Blockchain.
4. Real-time rescue team routing using AI-powered maps.

## 📜 License
`This project is developed for AI Practical Lab Project and is intended for educational and research purposes.`


---

Would you like me to make a **cleanly formatted version with badges (like Python, Node.js, React, MongoDB)** and visuals (emoji headers, shields.io badges, etc.) to make your README look stunning for jury and GitHub visitors?
